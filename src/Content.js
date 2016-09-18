import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';
import './Content.css';

class Content extends Component {
  render() {
    return (
      <div className="Content">
        <ReactMarkdown source={require('raw!./contents.md')} />
      </div>
    );
  }
}

export default Content;
