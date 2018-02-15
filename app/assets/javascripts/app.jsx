import React, { Component } from 'react';
import { render } from 'react-dom';
import PropTypes from 'prop-types';
import { connect, Provider } from 'react-redux';
import 'whatwg-fetch';
import { create } from './actions';
import configureStore from './configureStore';

// TODO:
//  - move API call inside `componentWillMount` to Redux
//  - implement the following features in the component and with Redux:
//    * editing the text of a todo
//    * check/un-checking a todo as dsone
//    * deleting a todo
//  - testing of Redux code is a plus. Write your tests in `rails-react-base/spec/javascripts/`

class App extends Component {
  static propTypes = {
    create: PropTypes.func.isRequired,
    newForm: PropTypes.shape({
      text: PropTypes.string,
    }),
    todos: PropTypes.shape({
      items: PropTypes.array,
    }).isRequired,
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

  async componentWillMount() {
    const response = await fetch('/todo_items');
    const data = await response.json();

    this.setState({ data });
  }

  handleNewChange = (e) => {
    this.setState({
      newForm: { ...this.state.newForm, text: e.target.value },
    });
  }

  handleNewKeyUp = (e) => {
    if (e.keyCode === 13) {
      this.props.create(this.state.newForm);
      this.setState({ newForm: { ...this.props.newForm } });
    }
  }

  render() {
    // TODO: Once the data is loaded from Redux completely, remove this
    const todos = this.props.todos.items.length ? this.props.todos.items : this.state.data;

    return (
      <div>
        <h1>To Do Is Cool</h1>
        <ul>
          {todos.map(item => (
            <li key={item.id}>
              <input type="checkbox" checked={item.is_done} value />
              <input type="text" value={item.text} />
              <button>Delete</button>
            </li>
          ))}
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

const ConnectedApp = connect(state => ({ todos: state.todos }), { create })(App);

render(
  <Provider store={configureStore()}>
    <ConnectedApp />
  </Provider>,
  document.getElementById('app'),
);
