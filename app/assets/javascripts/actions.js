import 'whatwg-fetch';

// TYPES
export const TODO_ITEMS_LOADING = 'TODO_ITEMS_LOADING';
export const TODO_CREATE_ITEM = 'TODO_CREATE_ITEM';
export const TODO_UPDATE_ITEM = 'TODO_UPDATE_ITEM';
export const TODO_SOFT_UPDATE_ITEM = 'TODO_SOFT_UPDATE_ITEM';
export const TODO_DELETE_ITEM = 'TODO_DELETE_ITEM';
export const TODO_ITEMS_RECEIVED = 'TODO_ITEMS_RECEIVED';
export const TODO_ITEMS_FAILURE = 'TODO_ITEMS_FAILURE';

// ACTION CREATORS
export function load() {
  return async (dispatch) => {
    try {
      dispatch({ type: TODO_ITEMS_LOADING });

      const response = await fetch('/todo_items', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      dispatch({ type: TODO_ITEMS_RECEIVED, payload: { items: data } });
    } catch (e) {
      console.error(e);
    }
  };
}

export function create(todo) {
  return async (dispatch) => {
    try {
      dispatch({ type: TODO_CREATE_ITEM });

      const response = await fetch('/todo_items', {
        method: 'POST',
        body: JSON.stringify({ todo_item: todo }),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      dispatch({ type: TODO_ITEMS_RECEIVED, payload: { items: data } });
    } catch (e) {
      console.error(e);
    }
  };
}

export function update(todo) {
  return async (dispatch) => {
    try {
      dispatch({ type: TODO_UPDATE_ITEM });

      const response = await fetch('/todo_items', {
        method: 'PUT',
        body: JSON.stringify({ todo_item: todo }),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      dispatch({ type: TODO_ITEMS_RECEIVED, payload: { items: data } });
    } catch (e) {
      console.error(e);
    }
  };
}

export function softUpdateItem(options) {
  return { type: TODO_SOFT_UPDATE_ITEM, payload: options };
}

export function deleteItem(todo) {
  return async (dispatch) => {
    try {
      dispatch({ type: TODO_DELETE_ITEM });

      const response = await fetch('/todo_items', {
        method: 'DELETE',
        body: JSON.stringify({ todo_item: todo }),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      dispatch({ type: TODO_ITEMS_RECEIVED, payload: { items: data } });
    } catch (e) {
      console.error(e);
    }
  };
}
