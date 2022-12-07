const redux = require("redux");
const createStore = redux.legacy_createStore;
const bindActionCreators = redux.bindActionCreators;
const combineReducers = redux.combineReducers;
const applyMiddleware = redux.applyMiddleware;
const reduxLogger = require("redux-logger");
const logger = reduxLogger.createLogger();

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
const initialProductsState = {
  numOfProducts: 10,
};

const initialFoodItemsState = {
  numOfFoodItems: 25,
};

const productsReducer = (state = initialProductsState, action) => {
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

const foodReducer = (state = initialFoodItemsState, action) => {
  switch (action.type) {
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

//* Combining Reducers
const rootReducer = combineReducers({
  products: productsReducer,
  food: foodReducer,
});

//! Store
const store = createStore(rootReducer, applyMiddleware(logger));

//! Initial state
console.log(store.getState());
//* Subscribe to store
const unsubscribe = store.subscribe(() => {});

//* Bind dispatch actions
const actions = bindActionCreators(
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
