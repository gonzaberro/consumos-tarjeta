import { Expense } from "../types/ExpenseObject";
import { MonthExpenses } from "../types/MonthExpensesObject";
import moment from "moment";
import "moment/locale/es";

type SetExpenseCallback = (data: MonthExpenses) => void;

const processVisaFile = (file: File, callBackFunction: SetExpenseCallback) => {
	readVisaFile(file, callBackFunction);
};

export default processVisaFile;

const readVisaFile = (file: File, callBackFunction: SetExpenseCallback) => {
	const reader = new FileReader();

	reader.onload = () => {
		const content = reader.result;
		const expenses: Expense[] = [];

		if (!content || typeof content !== "string") {
			throw new Error("Contenido no puede procesarse");
		}

		content.split(/\r?\n/).forEach((line: string) => {
			if (!line.includes("Numero Tarjeta") && line !== "") {
				expenses.push(createExpenseObject(line));
			}
		});

		callBackFunction(createMonthlyExpenses(expenses));
	};

	reader.readAsText(file);
};

const createMonthlyExpenses = (expenses: Expense[]): MonthExpenses => {
	let monthlyExpenses: MonthExpenses = {};
	const test: Expense[] = expenses;
	test.forEach((expense: Expense) => {
		const paymentPlanTotal: number = Number(expense.paymentPlan.substring(3));
		let paymentPlanPayed: number = Number(expense.paymentPlan.substring(0, 2));
		let paymentDate = moment();

		while (paymentPlanTotal >= paymentPlanPayed) {
			let updatedExpense: Expense = { ...expense };

			updatedExpense.paymentPlan = paymentPlanPayed + "/" + paymentPlanTotal;
			const monthName =
				paymentDate.format("MMMM").toUpperCase() + " " + paymentDate.year();

			const existingExpenses = monthlyExpenses[monthName] || [];

			monthlyExpenses = {
				...monthlyExpenses,
				[monthName]: [...existingExpenses, updatedExpense],
			};

			paymentDate.add(1, "M");
			paymentPlanPayed++;
		}
	});

	return monthlyExpenses;
};

const createExpenseObject = (line: string): Expense => {
	const splittedLine = line.split(";");

	const expense: Expense = {
		cardNumber: splittedLine[0].replace(" ", "").substring(14),
		currency: splittedLine[4],
		date: moment(splittedLine[1], "DD/MM/yyyy").toDate(),
		establishment: splittedLine[2]
			.substring(0, splittedLine[2].length - 5)
			.trim(),
		paymentPlan:
			splittedLine[2].substring(splittedLine[2].length - 5).trim() !== ""
				? splittedLine[2].substring(splittedLine[2].length - 5)
				: "01/01",
		price: Number(splittedLine[5].replace(/,/i, "")),
	};

	return expense;
};
