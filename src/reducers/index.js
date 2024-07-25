import { combineReducers } from "redux";
import toursReducer from "./toursReducer";

const rootReducer = combineReducers({
  tours: toursReducer,
});

export default rootReducer;
