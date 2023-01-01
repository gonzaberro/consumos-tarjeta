// Please note that this gist follows the repo available at: https://github.com/delasign/react-redux-tutorial
import { createSlice } from "@reduxjs/toolkit";
import { DataReducer } from "../types/DataReducerObject";
import { Action } from "../types/ActionObject";
import moment from "moment";
import "moment/locale/es";

const initialState: DataReducer = {
	brand: "visa",
	monthlyExpenses: {
		[moment().format("MMMM").toUpperCase() + " " + moment().year()]: [],
	},
};

export const dataSlice = createSlice({
	name: "Data",
	initialState: initialState,
	reducers: {
		setBrand: (state, action: Action) => {
			state.brand = action.payload;
		},
		setMonthlyExpenses: (state, action: Action) => {
			state.monthlyExpenses = action.payload;
		},
	},
});

// Action creators are generated for each case reducer function
export const { setBrand, setMonthlyExpenses } = dataSlice.actions;
// You must export the reducer as follows for it to be able to be read by the store.
export default dataSlice.reducer;
