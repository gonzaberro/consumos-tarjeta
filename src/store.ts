import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "./reducer/dataReducer";

const store = configureStore({ reducer: { data: dataReducer } });

export default store;
