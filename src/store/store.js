import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { coinReducer, chartReducer, exchangeReducer } from "./reducers.js";
import { composeWithDevTools } from "redux-devtools-extension";

const reducers = combineReducers({
  coinReducer,
  chartReducer,
  exchangeReducer
});

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
