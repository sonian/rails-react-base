import React from 'react';
import {render} from 'react-dom';
import axios from 'axios';

class App extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      data: [],
      newForm: Object.assign({}, this.props.newForm)
    }
  }

  static defaultProps = {
    newForm: { text: '' }
  };

  componentDidMount () {
    axios.get('/todo_items').then(({data}) => {
      this.setState({ data: data });
    });
  }

  create (data) {
    axios.post('/todo_items', data).then(({data}) => {
      this.setState({
        data: data,
        newForm: Object.assign({}, this.props.newForm)
      });
    });
  }

  handleNewChange (e) {
    this.setState({newForm: Object.assign({}, this.state.newForm, {text: e.target.value})});
  }

  handleNewKeyUp (e) {
    if (e.keyCode === 13) {
      this.create(this.state.newForm);
    }
  }

  render () {
    return (
      <div>
        <h1>To Do Is Cool</h1>
        <ul>
          {this.state.data.map((item) =>
            <li key={item.id}>
              <input type="checkbox" checked={item.is_done} value={true} />
              <input type="text" value={item.text} />
              <button>Delete</button>
            </li>
          )}
          <li>
            <input type="text"
              ref="new"
              placeholder="new"
              value={this.state.newForm.text}
              onKeyUp={this.handleNewKeyUp.bind(this)}
              onChange={this.handleNewChange.bind(this)} />
          </li>
        </ul>
      </div>
    );
  }
}

render(<App />, document.getElementById('app'));
