import withRedux from "next-redux-wrapper";
import {
  createStore,
} from 'redux';

// actions.js
export const gobrew = brewery => ({
  type: 'BREW',
  brewery,
});

// reducers.js
export const brewery = (action, state = {}) => {
  switch (action.type) {
    case 'BREW':
      return action.brewery;
    default:
      return state;
  }
}

// store.js
export function configureStore(initialState = {}) {
  const store = createStore(brewery, initialState);
  return store;
}

export const store = configureStore();

// export default withRedux(store)