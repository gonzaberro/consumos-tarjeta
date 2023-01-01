import { Expense } from "./ExpenseObject";

export interface MonthExpenses {
	[month: string]: Expense[];
}
