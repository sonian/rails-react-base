React = require('react/addons')
Request = require('browser-request')
Immutable = require('immutable')

App = React.createClass
  getInitialState: ->
    data: Immutable.fromJS([])

  componentDidMount: ->
    Request.get '/todo_items', (err, response, body) =>
      @setState data: Immutable.fromJS(JSON.parse(body))

  render: ->
    <div>
      <h1>To Do Is Cool</h1>
      <ul>
        {@state.data.map (item) =>
          <li key={item.get('id')}>
            <input type="checkbox" checked={item.get('is_done')} />
            <h1>{item.get('text')}</h1>
          </li>
        }
      </ul>
    </div>

React.render <App />, document.getElementById('app')

