import shoeReducer from "./showReducer";
import { combineReducers } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
    tasks: shoeReducer,
  });
  
  export default rootReducer