import cytoscape from 'cytoscape';

const colors = [
  '#34495e', '#c0392b', '#f39c12', '#2980b9', '#2ecc71', '#f1c40f'
]
const style = cytoscape.stylesheet()
  .selector('node')
    .css({
      'content': 'data(name)',
      'width': '70',
      'height': '70',
      'text-valign': 'center',
      'color': 'white',
      'text-outline-width': 2,
      'text-outline-color': function(ele){ return groupToColor(ele.data('group')) },
      'background-color':   function(ele){ return groupToColor(ele.data('group')) }
    })
  .selector('edge')
    .css({
      'curve-style': 'bezier',
      'opacity': 0.666,
      'line-color': function(ele){ return groupToColor(ele.data('group')) }
    });

export let conf = {
  style: style,
  zoomingEnabled: false,
  pan: { x: 730, y: -75 },
};

function groupToColor (group) {
  if (group != undefined) {
    return colors[group]
  } else {
    return '#ddd'
  }
}