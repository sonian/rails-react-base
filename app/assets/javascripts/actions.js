import 'whatwg-fetch';

// TYPES
export const TODO_ITEMS_LOADING = 'TODO_ITEMS_LOADING';
export const TODO_ITEMS_RECEIVED = 'TODO_ITEMS_RECEIVED';
export const TODO_ITEMS_FAILURE = 'TODO_ITEMS_FAILURE';

// ACTION CREATORS
export function create(todo) {
  return async (dispatch) => {
    try {
      const response = await fetch(
        '/todo_items',
        {
          method: 'POST',
          body: JSON.stringify({ todo_item: todo }),
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        },
      );
      const data = await response.json();
      dispatch({ type: TODO_ITEMS_RECEIVED, payload: { items: data } });
    } catch (e) {
      console.error(e);
    }
  };
}
