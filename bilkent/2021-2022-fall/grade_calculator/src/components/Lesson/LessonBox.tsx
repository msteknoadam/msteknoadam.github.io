import React, { useState } from "react";
import styled from "styled-components";
import { LessonDetails } from "../../types/types";
import { gradeToLetter } from "../../util/util";
import InputField from "../common/InputField";

type Props = LessonDetails & { lessonName: string };

const LessonBox: React.FC<Props> = (props) => {
	const { lessonName, assessments, catalog } = props;
	const [totalGrade, setTotalGrade] = useState(null as number | null);
	const [letterGrade, setLetterGrade] = useState(null as string | null);

	function calcTotal() {
		let total = 0;
		Object.values(assessments).forEach((a) => (total += (a.received / a.outOf) * a.weight));
		setTotalGrade(total);
		setLetterGrade(gradeToLetter(total, catalog));
	}

	const longestInputLenght = Object.values(assessments).reduce((prev, curr) => {
		const currLen = (Math.round(curr.outOf * 100) / 100).toFixed(2).length * 8.5;
		return Math.max(prev, currLen);
	}, 0);

	return (
		<div>
			<h2>{lessonName}</h2>
			<br />
			<table>
				<thead>
					<th>Assessment Name</th>
					<th>Grade</th>
				</thead>
				<tbody>
					{Object.values(assessments).map((assessment) => (
						<tr key={assessment.name}>
							<td>{assessment.name}</td>
							<td>
								<InputField
									onChange={(e) => {
										assessment.received = +e.target.value;
									}}
									width={`${longestInputLenght}px`}
								/>{" "}
								/ {assessment.outOf} ({assessment.weight}%)
							</td>
						</tr>
					))}
				</tbody>
			</table>
			<button onClick={() => calcTotal()}>Calculate Letter Grade</button>
			<br />
			{totalGrade !== null ? (
				<>
					Total Grade: {totalGrade}
					<br />
					Letter Grade: {letterGrade}
				</>
			) : null}
		</div>
	);
};

export default LessonBox;

// export default styled.div``;
