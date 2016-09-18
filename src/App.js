import React, { Component } from 'react';
import { StickyContainer, Sticky } from 'react-sticky';
import Header  from './Header';
import Graph   from './Graph';
import Content from './Content';
import Footer  from './Footer';
import './App.css';
import rubyJson   from './ruby.json';
import pythonJson from './python.json';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = { json: rubyJson }
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = (e) => {
    const scroll = e.srcElement.body.scrollTop;
    const json = (scroll <= 1000) ? rubyJson : pythonJson;

    this.setState({ json: json })
  }

  render() {
    return (
      <div className="App">
        <Header />
        <StickyContainer>
          <Sticky>
            <Graph json={this.state.json} />
          </Sticky>
          <Content />
        </StickyContainer>
        <Footer />
      </div>
    );
  }
}

export default App;
