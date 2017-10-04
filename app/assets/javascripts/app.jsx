/* global fetch, document */
import React, { Component } from 'react';
import { render } from 'react-dom';
import 'whatwg-fetch';

class App extends Component {
  static defaultProps = {
    newForm: { text: '' },
  };

  constructor(props) {
    super(props);

    this.state = {
      data: [],
      newForm: { ...this.props.newForm },
    };
  }

  async componentWillMount() {
    const response = await fetch('/todo_items');
    const data = await response.json();

    this.setState({ data });
  }

  async create(_data) {
    const response = await fetch(
      '/todo_items',
      {
        method: 'POST',
        body: JSON.stringify({ todo_item: _data }),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }
    );
    const data = await response.json();

    this.setState({
      data,
      newForm: { ...this.props.newForm },
    });
  }

  handleNewChange = (e) => {
    this.setState({
      newForm: { ...this.state.newForm, text: e.target.value },
    });
  }

  handleNewKeyUp = (e) => {
    if (e.keyCode === 13) {
      this.create(this.state.newForm);
    }
  }

  render() {
    return (
      <div>
        <h1>To Do Is Cool</h1>
        <ul>
          {this.state.data.map((item) =>
            <li key={item.id}>
              <input type="checkbox" checked={item.is_done} value />
              <input type="text" value={item.text} />
              <button>Delete</button>
            </li>
          )}
          <li>
            <input
              type="text"
              placeholder="new"
              value={this.state.newForm.text}
              onKeyUp={this.handleNewKeyUp}
              onChange={this.handleNewChange}
            />
          </li>
        </ul>
      </div>
    );
  }
}

render(<App />, document.getElementById('app'));
