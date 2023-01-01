import { Accordion } from "react-accessible-accordion";
import "react-accessible-accordion/dist/fancy-example.css";
import AccordionElement from "./AccordionElement";
import { useSelector } from "react-redux";
import { ReducerStracture } from "../types/ReducerStracture";

const ContentSection = () => {
	const monthlyExpenses = useSelector(
		(state: ReducerStracture) => state.data.monthlyExpenses
	);

	return (
		<Accordion
			allowMultipleExpanded
			allowZeroExpanded
			className="accordion-container"
		>
			{Object.keys(monthlyExpenses).map(key => {
				return (
					<AccordionElement
						key={key}
						data={{ title: key, content: monthlyExpenses[key] }}
					/>
				);
			})}
		</Accordion>
	);
};

export default ContentSection;
