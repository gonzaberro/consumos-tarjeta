import { actions } from "./types";

export function setBrand(brand: string) {
	return (dispatch: any) => {
		dispatch({
			type: actions.SET_BRAND,
			payload: brand,
		});
	};
}
