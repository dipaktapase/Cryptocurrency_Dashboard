import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { coinReducer, chartReducer } from "./reducers.js";
import { composeWithDevTools } from "redux-devtools-extension";

const reducers = combineReducers({
  coinReducer,
  chartReducer,
});

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
