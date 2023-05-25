/**
 * Define action types.
 * @enum {string}
 */
const ActionTypes = {
  ADD: "ADD",
  SUBTRACT: "SUBTRACT",
  RESET: "RESET",
};

/**
 * Action creator: add.
 * @returns {Object} add action.
 */
const add = () => ({ type: ActionTypes.ADD });

/**
 * Action creator: subtract.
 * @returns {Object} subtract action.
 */
const subtract = () => ({ type: ActionTypes.SUBTRACT });

/**
 * Action creator: reset.
 * @returns {Object} reset action.
 */
const reset = () => ({ type: ActionTypes.RESET });

/**
 * The reducer function.
 * @param {Object} state - current state.
 * @param {Object} action - action object.
 * @returns {Object} new state.
 */
const reducer = (state = { count: 0 }, action) => {
  if (action.type === ActionTypes.ADD) {
    // if action type is ADD
    return { count: state.count + 1 }; // increment count by 1
  }
  if (action.type === ActionTypes.SUBTRACT) {
    // if action type is SUBTRACT
    return { count: state.count - 1 }; // decrement count by 1
  }
  if (action.type === ActionTypes.RESET) {
    // if action type is RESET
    return { count: 0 }; // reset count to 0
  }
  return state; // otherwise return the current state
};

/**
 * Creates a Redux-inspired store.
 * @param {Function} reducer - reducer function.
 * @returns {Object} store object.
 */
const createStore = (reducer) => {
  let state = reducer(undefined, {});
  const subscribers = [];

  const store = {
    getState() {
      return state;
    },
    dispatch(action) {
      state = reducer(state, action);
      subscribers.forEach((subscriber) => subscriber(state));
    },
    subscribe(subscriber) {
      subscribers.push(subscriber);
    },
  };

  return store;
};

const store = createStore(reducer);

// Test the scenarios
console.log("State:", store.getState().count);
store.dispatch(add());
store.dispatch(add());
console.log("State:", store.getState().count);
store.dispatch(subtract());
console.log("State:", store.getState().count);
store.dispatch(reset());
console.log("State:", store.getState().count);

/*
action types defined as object with keys ADD, SUBTRACT, and RESET. 
to identify the type of action being dispatched.
reducer function takes current state + action as input, 
then returns new state. reducer updating the state based on action.
store object holds current state and provides methods for 
dispatching actions and subscribing to changes in state.
*/
