import React, { PropTypes } from 'react';
import { render } from 'react-dom';
import 'whatwg-fetch';

class App extends React.Component {
  static propTypes = {
    newForm: PropTypes.object,
  };

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

  componentDidMount() {
    fetch('/todo_items')
    .then((response) => response.json())
    .then((data) => { this.setState({ data }); });
  }

  create(_data) {
    fetch(
      '/todo_items',
      {
        method: 'POST',
        body: JSON.stringify({ todo_item: _data }),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }
    )
    .then((response) => response.json())
    .then((data) => {
      this.setState({
        data,
        newForm: { ...this.props.newForm },
      });
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
              ref="new"
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
