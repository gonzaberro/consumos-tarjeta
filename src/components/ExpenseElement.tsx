import { Expense } from "../types/ExpenseObject";
import moment from "moment";
import { useState } from "react";
interface Props {
	expense: Expense;
	handleSelectExpense: (checked: boolean, expense: Expense) => void;
}

const ExpenseElement = ({ expense, handleSelectExpense }: Props) => {
	const [checked, setChecked] = useState<boolean>(false);
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setChecked(!checked);
		handleSelectExpense(!checked, expense);
	};

	return (
		<div className="grid expense-element">
			<p className="aling-left">
				<input
					type="checkbox"
					className="item-checkbox"
					checked={checked}
					onChange={handleChange}
				/>
				{expense.establishment}
			</p>

			<p>{expense.cardNumber}</p>
			<p>{moment(expense.date).format("DD/MM/yyyy")}</p>
			<p>{expense.paymentPlan}</p>
			<p className={expense.currency.toLocaleLowerCase()}>{expense.currency}</p>
			<p>
				{expense.price.toLocaleString("es-ar", {
					style: "currency",
					currency: "ARS",
					minimumFractionDigits: 2,
				})}
			</p>
		</div>
	);
};

export default ExpenseElement;
