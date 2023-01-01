import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import svgDragDrop from "../assets/svgDragDrop.svg";
import processVisaFile from "../utils/visaFile";
import { setMonthlyExpenses } from "../reducer/dataReducer";
import { MonthExpenses } from "../types/MonthExpensesObject";
import { useDispatch } from "react-redux";
const FileSection = () => {
	const [fileName, setFileName] = useState(null);

	const dispatch = useDispatch();

	const onDrop = useCallback(
		(acceptedFiles: any) => {
			const file = acceptedFiles[0];
			if (file.type === "text/csv") {
				setFileName(file.name);
				processVisaFile(file, (data: MonthExpenses) =>
					dispatch(setMonthlyExpenses(data))
				);
			}
		},
		[dispatch]
	);

	const { getRootProps, getInputProps } = useDropzone({ onDrop });

	return (
		<section className="flex centered  file-section">
			<div {...getRootProps()} className="drag-drop">
				<input {...getInputProps()} />
				<img src={svgDragDrop} alt="Archivo" />
				{(fileName && <p>{fileName}</p>) || (
					<p>Arrastrá y soltá el archivo o hacé click para importarlo</p>
				)}
			</div>
			,
		</section>
	);
};

export default FileSection;
