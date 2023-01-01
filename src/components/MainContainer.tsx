import "../styles/main.css";
import OptionSection from "./OptionsSection";
import FileSection from "./FileSection";
import ContentSection from "./ContentSection";

const MainContainer = () => {
	return (
		<div className="grid main">
			<OptionSection />
			<FileSection />
			<ContentSection />
		</div>
	);
};

export default MainContainer;
