const redux = require("redux");
const createStore = redux.legacy_createStore;

//* Action Types
const PRODUCT_ORDERED = "PRODUCT_ORDERED";
const PRODUCT_RESTOCKED = "PRODUCT_RESTOCKED";

//* Action Creators
const orderedProduct = () => {
  return {
    type: PRODUCT_ORDERED,
  };
};

const restokedProducts = (qty = 1) => {
  return {
    type: PRODUCT_RESTOCKED,
    payload: qty,
  };
};

//* Reducer
const initialState = {
  numOfProducts: 10,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case PRODUCT_ORDERED:
      return {
        ...state,
        numOfProducts: state.numOfProducts - 1,
      };
    case PRODUCT_RESTOCKED:
      return {
        ...state,
        numOfProducts: state.numOfProducts + action.payload,
      };
    default:
      return state;
  }
};

//! Store
const store = createStore(reducer);

//! Initial state
console.log(store.getState());
//* Subscribe to store
const unsubscribe = store.subscribe(() => console.log(store.getState()));

//* Dispatch actions
store.dispatch(orderedProduct()); //! 9
store.dispatch(orderedProduct()); //! 8
store.dispatch(orderedProduct()); //! 7
store.dispatch(restokedProducts(3)); //! 10

unsubscribe();
