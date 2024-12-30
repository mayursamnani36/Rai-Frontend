import { createStore } from "redux";

const INITIAL_STORE = {
  boards: [],
  users: [],
};

const raiReducer = (store = INITIAL_STORE, action) => {
  let newStore = store;
  if (action.type === "UPDATE_BOARDS_LIST") {
    newStore = {
      ...newStore,
      boards: action.payload,
    };
  }
  if (action.type === "UPDATE_USERS_LIST") {
    newStore = {
      ...newStore,
      users: action.payload,
    };
  }
  return newStore;
};

const raiStore = createStore(raiReducer);

export default raiStore;
