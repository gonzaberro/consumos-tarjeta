import { AccordionItem, AccordionItemPanel } from "react-accessible-accordion";
import AccordionHeader from "./AccordionHeader";
import { AccordionObject } from "../types/AccordionObject";
import { Expense } from "../types/ExpenseObject";
import ExpenseElement from "./ExpenseElement";
import { useMemo, useState } from "react";

interface Props {
	data: AccordionObject;
}

const AccordionElement = ({ data }: Props) => {
	const [selectedExpenses, setSelectedExpenses] = useState<Expense[]>([]);

	const amountTotal = useMemo(() => {
		const source =
			selectedExpenses.length === 0 ? data.content : selectedExpenses;

		const usdAmount = source.reduce(
			(accumulator: number, expense: Expense) =>
				expense.currency === "Dolares"
					? accumulator + expense.price
					: accumulator,
			0
		);
		const argAmount = source.reduce(
			(accumulator: number, expense: Expense) =>
				expense.currency === "Pesos"
					? accumulator + expense.price
					: accumulator,
			0
		);

		return (
			"Acumulado del mes: " +
			argAmount.toLocaleString("es-ar", {
				style: "currency",
				currency: "ARS",
				minimumFractionDigits: 2,
			}) +
			" | " +
			usdAmount.toLocaleString("es-ar", {
				style: "currency",
				currency: "USD",
				minimumFractionDigits: 2,
			})
		);
	}, [selectedExpenses, data]);

	const handleSelectExpense = (checked: boolean, expense: Expense) => {
		if (!checked) {
			setSelectedExpenses(expenses => expenses.filter(exp => exp !== expense));
		} else {
			setSelectedExpenses(expenses => [...expenses, expense]);
		}
	};

	return (
		<AccordionItem className="accordion-item">
			<AccordionHeader title={data.title} amount={amountTotal} />
			<AccordionItemPanel>
				{data.content.map((expense: Expense) => {
					return (
						<ExpenseElement
							key={expense.establishment}
							expense={expense}
							handleSelectExpense={handleSelectExpense}
						/>
					);
				})}
			</AccordionItemPanel>
		</AccordionItem>
	);
};

export default AccordionElement;
