import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  load,
  create,
  update,
  softUpdateItem,
  deleteItem,
  TODO_ITEMS_LOADING,
  TODO_ITEMS_RECEIVED,
  TODO_CREATE_ITEM,
  TODO_UPDATE_ITEM,
  TODO_SOFT_UPDATE_ITEM,
  TODO_DELETE_ITEM,
} from '../../app/assets/javascripts/actions';
import fetchMock from 'fetch-mock';
import { expect } from 'chai';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const TO_DO_1 = {
  is_done: false,
  text: 'TO_DO_1',
  id: 1,
};

const TO_DO_2 = {
  is_done: true,
  text: 'TO_DO_2',
  id: 2,
};

// For a good idea of how Redux action creators are tested take a look at the
// documentation: https://redux.js.org/docs/recipes/WritingTests.html#action-creators
describe('Action Creators', () => {
  afterEach(() => {
    fetchMock.reset()
    fetchMock.restore()
  });

  it('creates TODO_ITEMS_RECEIVED when fetching todos has been done', () => {
    fetchMock
      .getOnce('/todo_items', {
        body: [TO_DO_1, TO_DO_2],
        headers: { 'content-type': 'application/json' },
      });

    const expectedActions = [
      { type: TODO_ITEMS_LOADING },
      { type: TODO_ITEMS_RECEIVED, payload: { items: [TO_DO_1, TO_DO_2] } },
    ];

    const store = mockStore({ todos: { items: [] } });

    return store.dispatch(load()).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions);
    });
  });

  it('creates TODO_CREATE_ITEM when create todo', () => {
    fetchMock
      .postOnce('/todo_items', {
        body: [TO_DO_1, TO_DO_2],
        headers: { 'content-type': 'application/json' },
      });

    const expectedActions = [
      { type: TODO_CREATE_ITEM },
      { type: TODO_ITEMS_RECEIVED, payload: { items: [TO_DO_1, TO_DO_2] } },
    ];

    const store = mockStore({ todos: { items: [] } });

    return store.dispatch(create()).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions)
    });
  });

  it('creates TODO_UPDATE_ITEM when update todo', () => {
    fetchMock
      .putOnce('/todo_items', {
        body: [TO_DO_1, TO_DO_2],
        headers: { 'content-type': 'application/json' },
      });

    const expectedActions = [
      { type: TODO_UPDATE_ITEM },
      { type: TODO_ITEMS_RECEIVED, payload: { items: [TO_DO_1, TO_DO_2] } },
    ];

    const store = mockStore({ todos: { items: [] } });

    return store.dispatch(update()).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions)
    });
  });

  it('creates TODO_SOFT_UPDATE_ITEM when update todo', () => {
    const expectedAction =
      { type: TODO_SOFT_UPDATE_ITEM, payload: { items: [TO_DO_2] } };

    expect(softUpdateItem({ items: [TO_DO_2] })).to.deep.equal(expectedAction);
  });


  it('creates TODO_DELETE_ITEM when delete todo', () => {
    fetchMock
      .deleteOnce('/todo_items', {
        body: [TO_DO_1, TO_DO_2],
        headers: { 'content-type': 'application/json' },
      });

    const expectedActions = [
      { type: TODO_DELETE_ITEM },
      { type: TODO_ITEMS_RECEIVED, payload: { items: [TO_DO_1, TO_DO_2] } },
    ];

    const store = mockStore({ todos: { items: [] } });

    return store.dispatch(deleteItem()).then(() => {
      expect(store.getActions()).to.deep.equal(expectedActions)
    });
  });


});
