React = require('react/addons')
Request = require('browser-request')
Immutable = require('immutable')

App = React.createClass
  getInitialState: ->
    data: Immutable.fromJS([])
    newForm: Immutable.fromJS(text: '')

  componentDidMount: ->
    Request method: 'get', url: '/todo_items', json: true, (err, response, body) =>
      @setState data: Immutable.fromJS(body)

  create: (data) ->
    Request method: 'post', url: '/todo_items', json: { todo_item: data }, (err, response, body) =>
      @setState
        data: Immutable.fromJS(body)
        newForm: Immutable.fromJS(text: '')

  handleNewChange: (e) ->
    @setState newForm: @state.newForm.set('text', e.target.value)

  handleNewKeyUp: (e) ->
    if e.keyCode == 13
      @create(@state.newForm)

  render: ->
    <div>
      <h1>To Do Is Cool</h1>
      <ul>
        {@state.data.map (item) =>
          <li key={item.get('id')}>
            <input type="checkbox" checked={item.get('is_done')} value={true} />
            <input type="text" value={item.get('text')} />
            <button>Delete</button>
          </li>
        }
        <li>
          <input type="text" ref="new" placeholder="new" value={@state.newForm.get('text')} onKeyUp={@handleNewKeyUp} onChange={@handleNewChange} />
        </li>
      </ul>
    </div>

React.render <App />, document.getElementById('app')

