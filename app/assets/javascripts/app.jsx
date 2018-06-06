import React, { Component } from 'react';
import { render } from 'react-dom';
import PropTypes from 'prop-types';
import { connect, Provider } from 'react-redux';
import 'whatwg-fetch';
import {
  load as loadItems,
  create as createItem,
  update as updateItem,
  softUpdateItem,
  deleteItem,
} from './actions';
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
    createItem: PropTypes.func.isRequired,
    loadItems: PropTypes.func.isRequired,
    updateItem: PropTypes.func.isRequired,
    softUpdateItem: PropTypes.func.isRequired,
    deleteItem: PropTypes.func.isRequired,
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
      newForm: { ...this.props.newForm },
    };
  }

  async componentWillMount() {
    this.props.loadItems();
  }

  handleNewChange = (e) => {
    this.setState({
      newForm: { ...this.state.newForm, text: e.target.value },
    });
  };

  handleNewKeyUp = (e) => {
    if (e.keyCode === 13) {
      this.props.createItem(this.state.newForm);
      this.setState({ newForm: { ...this.props.newForm } });
    }
  };

  handleEditChange = idx => (e) => {
    const modifiedItems = this.props.todos.items;
    modifiedItems[idx] = {
      ...modifiedItems[idx],
      text: e.target.value,
    };

    this.props.softUpdateItem({ items: modifiedItems });
  }

  handleEditKeyUp = idx => (e) => {
    if (e.keyCode === 13) {
      this.props.updateItem(this.props.todos.items[idx]);
    }
  };

  itemChecked = idx => () => {
    const item = this.props.todos.items[idx];
    this.props.updateItem({
      ...item,
      is_done: !item.is_done,
    });
  }

  deleteItem = idx => () => {
    this.props.deleteItem(this.props.todos.items[idx]);
  }

  render() {
    return (
      <div>
        <h1>To Do Is Cool</h1>
        <ul>
          {this.props.todos.items.map((item, idx) => (
            <li key={item.id}>
              <input
                type="checkbox"
                value={item.is_done || ''}
                checked={item.is_done}
                onClick={this.itemChecked(idx)}
              />
              <input
                type="text"
                value={item.text}
                onChange={this.handleEditChange(idx)}
                onKeyUp={this.handleEditKeyUp(idx)}
              />
              <button onClick={this.deleteItem(idx)}>Delete</button>
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

const ConnectedApp = connect(state => ({ todos: state.todos }), {
  loadItems,
  createItem,
  updateItem,
  softUpdateItem,
  deleteItem,
})(App);

render(
  <Provider store={configureStore()}>
    <ConnectedApp />
  </Provider>,
  document.getElementById('app'),
);
