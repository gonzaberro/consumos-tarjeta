import {
	AccordionItemHeading,
	AccordionItemButton,
} from "react-accessible-accordion";

interface Props {
	title: string;
	amount: string;
}

const AccordionHeader = ({ title, amount }: Props) => {
	return (
		<AccordionItemHeading>
			<AccordionItemButton className="accordion-button-title">
				<div className="flex accordion-title-container">
					<p>{title}</p>
					<p>{amount}</p>
				</div>
			</AccordionItemButton>
		</AccordionItemHeading>
	);
};

export default AccordionHeader;
