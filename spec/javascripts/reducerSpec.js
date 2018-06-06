import reducer, { initialState } from '../../app/assets/javascripts/reducer';
import { expect } from 'chai';

import {
  TODO_ITEMS_LOADING,
  TODO_ITEMS_RECEIVED,
  TODO_ITEMS_FAILURE,
  TODO_SOFT_UPDATE_ITEM,
} from '../../app/assets/javascripts/actions';

const RECEIVED_ITEMS = 'RECEIVED_ITEMS';

describe('todos reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).to.deep.equal(initialState);
  });

  it('should handle TODO_ITEMS_LOADING', () => {
    expect(reducer(initialState, { type: TODO_ITEMS_LOADING })).to.deep.equal(initialState);
  });

  it('should handle TODO_ITEMS_RECEIVED', () => {
    const action = {
      type: TODO_ITEMS_RECEIVED,
      payload: { items: RECEIVED_ITEMS },
    };

    expect(reducer(initialState, action)).to.deep.equal({
      ...initialState,
      items: RECEIVED_ITEMS,
    });
  });

  it('should handle TODO_SOFT_UPDATE_ITEM', () => {
    const action = {
      type: TODO_SOFT_UPDATE_ITEM,
      payload: { items: RECEIVED_ITEMS },
    };

    expect(reducer(initialState, action)).to.deep.equal({
      ...initialState,
      items: RECEIVED_ITEMS,
    });
  });

  it('should handle TODO_ITEMS_FAILURE', () => {
    expect(reducer(initialState, { type: TODO_ITEMS_FAILURE })).to.deep.equal(initialState);
  });
});
