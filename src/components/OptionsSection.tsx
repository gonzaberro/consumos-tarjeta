import visa from "../assets/visa.svg";
import mastercard from "../assets/mastercard.svg";
import { useDispatch, useSelector } from "react-redux";
import { ReducerStracture } from "../types/ReducerStracture";
import { setBrand } from "../reducer/dataReducer";
type Brand = "mastercard" | "visa" | "";

const OptionSection = () => {
	const dispatch = useDispatch();
	const selectedBrand: string = useSelector(
		(state: ReducerStracture) => state.data.brand
	);

	const selectBrand = (option: Brand) => {
		dispatch(setBrand(option));
	};

	return (
		<section>
			<div className="flex centered options-section">
				<img
					src={visa}
					alt="Visa"
					className={`${selectedBrand === "visa" ? "selected" : ""}`}
					onClick={() => selectBrand("visa")}
				/>
				<h2>Seleccionar el proveedor y arrastra el archivo</h2>
				<img
					src={mastercard}
					alt="Mastercard"
					className={`${selectedBrand === "mastercard" ? "selected" : ""}`}
					onClick={() => selectBrand("mastercard")}
				/>
			</div>
		</section>
	);
};

export default OptionSection;
