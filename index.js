const redux = require("redux");
const createStore = redux.legacy_createStore;

//* Action Types
const PRODUCT_ORDERED = "PRODUCT_ORDERED";
const PRODUCT_RESTOCKED = "PRODUCT_RESTOCKED";
const FOOD_ORDERED = "FOOD_ORDERED";
const FOOD_RESTOCKED = "FOOD_RESTOCKED";

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

const orderedFood = (qty = 1) => {
  return {
    type: FOOD_ORDERED,
    payload: qty,
  };
};

const restokedFood = (qty = 1) => {
  return {
    type: FOOD_RESTOCKED,
    payload: qty,
  };
};

//* Reducer
const initialState = {
  numOfProducts: 10,
  numOfFoodItems: 25,
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
    case FOOD_ORDERED:
      return {
        ...state,
        numOfFoodItems: state.numOfFoodItems - action.payload,
      };
    case FOOD_RESTOCKED:
      return {
        ...state,
        numOfFoodItems: state.numOfFoodItems + action.payload,
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

//* Bind dispatch actions
const actions = redux.bindActionCreators(
  { orderedProduct, restokedProducts, orderedFood, restokedFood },
  store.dispatch
);

actions.orderedProduct();
actions.orderedProduct();
actions.restokedProducts(2);
actions.orderedFood();
actions.orderedFood();
actions.orderedFood(2);
actions.restokedFood(4);

unsubscribe();
