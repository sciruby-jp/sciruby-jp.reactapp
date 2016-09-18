const graph = require('./library_graph.json');
const fs = require('fs');
const readline = require('readline');

function rotate(x, y, rad) {
  const x1 = Math.cos(rad) * x - Math.sin(rad) * y;
  const y1 = Math.cos(rad) * y + Math.sin(rad) * x;
  return { x: x1, y: y1 };
}

function fetchStarConut(github_url) {
  const request = require('sync-request');

  const username = process.argv[2];
  const password = process.argv[3];

  const repository_name = github_url.match(/https:\/\/github.com\/(.+)/)[1];
  const api_url = `https:\/\/${username}:${password}@api.github.com/repos/${repository_name}`;

  const response = request('GET', api_url, {
    headers: { 'User-Agent': 'sciruby-jp.github.io' }
  });

  return JSON.parse(response.getBody().toString()).stargazers_count;
}

// library group rendered at center of the circle
const centralGroup = 'computing';

// groups of libraries
let all_groups = ["python", "ruby"].map((lang) => {
    return graph[`${lang}_libraries`];
  })
  .reduce((firstLibs, secondLibs) => {
    return firstLibs.concat(secondLibs);
  })
  .map((lib) => {
    return lib.group;
  })
  .filter((group_name) => {
    return (group_name !== undefined);
  });
all_groups = Array.from(new Set(all_groups));

// library groups except centralGroup
const groups = all_groups.filter((group_name) => {
  return (group_name !== centralGroup);
});

// radius of each nodes, and radius of the whole circle
const base_size = 70;
const groupCircleRadiusRate = 1;
const biggerCircleRadiusRate   = 3;
const groupCircleRadius = groupCircleRadiusRate * base_size;
const biggerCircleRadius = biggerCircleRadiusRate * base_size;

['python', 'ruby'].map((lang) => {
  const libraries = graph[`${lang}_libraries`];
  const edges = graph[`${lang}_edges`];
  let hash = {
    elements: {
      nodes: [],
      edges: []
    }
  };

  const central_nodes = libraries
    .filter((lib) => {
      return (lib.group === centralGroup);
    })
    .map((lib, index, arr) => {
      const rad = (index / arr.length) * Math.PI * 2;
      const position = rotate(0, groupCircleRadius, rad);
      return { lib, position };
    }).map(({ lib, position }) => {
      return {
        data: {
          id: lib.name,
          name: lib.name,
          group: all_groups.indexOf(lib.group),
        },
        position
      };
    });

  hash.elements.nodes = hash.elements.nodes.concat(central_nodes);

  // merginal groups
  groups.map((group, groupIndex, groupArr) => {
    let groupLibs = libraries.filter((lib) => {
      return lib.group === group
    });

    groupLibs = groupLibs.map((lib, index, arr) => {
      // circle layout at center
      const rad = (index / arr.length) * Math.PI * 2;
      const position = rotate(0, groupCircleRadius, rad);
      return { lib, position };
    }).map(({
      lib,
      position: {
        x,
        y
      }
    }) => {
      // parallel shift
      const position = { x, y: y + biggerCircleRadius };
      return { lib, position };
    }).map(({
      lib,
      position: { x, y }
    }) => {
      // rotate
      const rad = (groupIndex / groupArr.length) * Math.PI * 2;
      const position = rotate(x, y, rad);
      return { lib, position };
    });

    hash.elements.nodes = hash.elements.nodes.concat(groupLibs.map(({
      lib,
      position
    }) => {
      return {
        data: {
          id: lib.name,
          name: lib.name,
          group: all_groups.indexOf(lib.group),
        },
        position
      };
    }));
  });

  // add stargazer_count and github url
  hash.elements.nodes = hash.elements.nodes.map((node) => {
    const library = libraries.find((lib) => {
      return (lib.name === node.data.name)
    });
    node.data['stargazers_count'] = fetchStarConut(library.github);
    if (node.data['stargazers_count'] > 3000) {
      const a = node.data['stargazers_count'] - 3000;
      node.data['stargazers_count'] = 3000 + a / 3;
    } else if (node.data['stargazers_count'] <= 3000) {
      const a = 3000 - node.data['stargazers_count'];
      node.data['stargazers_count'] += a / 4;
    }
    node.data['github_url'] = library.github;

    console.log(node);
    return node;
  });

  hash.elements.edges = edges.map((edge) => {
    const source = hash.elements.nodes.find((node) => {
      return (node.data.name === edge.source)
    })
    const target = hash.elements.nodes.find((node) => {
      return (node.data.name === edge.target)
    })

    let group = null;
    if (source.data.group === target.data.group) {
      group = source.data.group;
    }

    const retHash = {
      data: {
        id: `${edge.source}_${edge.target}`,
        source: edge.source,
        target: edge.target,
      }
    };

    if (group !== null) {
      retHash.data['group'] = group;
    }

    return retHash;
  });

  fs.writeFileSync(`./src/${lang}.json`, JSON.stringify(hash), 'utf-8');
});