const redux = require("redux");
const axios = require("axios");
const createStore = redux.legacy_createStore;
const applyMiddleware = redux.applyMiddleware;
const thunkMiddleware = require("redux-thunk").default;

const FETCH_USERS_START = "FETCH_USERS_START";
const FETCH_USERS_COMPLETE = "FETCH_USERS_COMPLETE";
const FETCH_USERS_ERROR = "FETCH_USERS_ERROR";

const initialState = {
  loading: false,
  users: [],
  error: "",
};

const fetchUsersStart = () => {
  return {
    type: FETCH_USERS_START,
  };
};

const fetchUsersComplete = (users) => {
  return {
    type: FETCH_USERS_COMPLETE,
    payload: users,
  };
};

const fetchUsersError = (error) => {
  return {
    type: FETCH_USERS_ERROR,
    payload: error,
  };
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_START:
      return {
        ...state,
        loading: true,
      };
    case FETCH_USERS_COMPLETE:
      return {
        loading: false,
        users: action.payload,
        error: "",
      };
    case FETCH_USERS_ERROR:
      return {
        loading: false,
        users: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

const fetchUsers = () => {
  return function (dispatch) {
    dispatch(fetchUsersStart());
    axios
      .get("http://jsonplaceholder.typicode.com/users")
      .then((response) => {
        const users = response.data.map((user) => user.id);
        dispatch(fetchUsersComplete(users));
      })
      .catch((error) => {
        dispatch(fetchUsersError(error.message));
      });
  };
};

const store = createStore(usersReducer, applyMiddleware(thunkMiddleware));

store.subscribe(() => console.log(store.getState()));

store.dispatch(fetchUsers());
