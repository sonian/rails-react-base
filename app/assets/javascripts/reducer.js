import {
  TODO_ITEMS_LOADING,
  TODO_ITEMS_RECEIVED,
  TODO_ITEMS_FAILURE,
  TODO_SOFT_UPDATE_ITEM,
} from './actions';

export const initialState = {
  items: [],
};

export default function todosReducer(state = initialState, { type, payload }) {
  switch (type) {
    case TODO_ITEMS_LOADING:
      return state;
    case TODO_ITEMS_RECEIVED:
      return {
        ...state,
        items: payload.items,
      };
    case TODO_SOFT_UPDATE_ITEM:
      return {
        ...state,
        items: payload.items,
      };
    case TODO_ITEMS_FAILURE:
      return state;
    default:
      return state;
  }
}
