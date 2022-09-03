import usersReducer from './users';
import linksReducer from './links';
import statisticsReducer from './statistics';

const { combineReducers, configureStore } = require('@reduxjs/toolkit');

const rootReducer = combineReducers({
    users: usersReducer,
    links: linksReducer,
    statistics: statisticsReducer
});

export function createStore() {
  return configureStore({
    reducer: rootReducer
  });
};