import React, { useState } from "react";
import { LessonDetails } from "../../types/types";
import { gradeToLetter } from "../../util/util";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

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

	// const longestInputLenght = Object.values(assessments).reduce((prev, curr) => {
	// 	const currLen = (Math.round(curr.outOf * 100) / 100).toFixed(2).length * 8.5;
	// 	return Math.max(prev, currLen);
	// }, 0);

	return (
		<Card variant="outlined" sx={{ width: "fit-content" }}>
			<CardContent>
				<Typography variant="h2">{`${
					letterGrade === null ? lessonName : `${lessonName}: ${letterGrade}`
				}`}</Typography>
				{totalGrade !== null ? <Typography variant="h4">Total Grade: {totalGrade}</Typography> : null}
				<br />
				{Object.values(assessments).map((assessment) => (
					<>
						<TextField
							variant="outlined"
							size="small"
							label={assessment.name}
							onChange={(e) => {
								assessment.received = +e.target.value.replace(",", ".");
							}}
							// width={`${longestInputLenght}px`}
						/>{" "}
						<Typography
							variant="body1"
							component="span"
							sx={{ display: "display-inline", lineHeight: "40px" }}
						>
							/ {assessment.outOf} ({assessment.weight}%)
						</Typography>
						<br />
						<br />
					</>
				))}
				<Button variant="contained" onClick={() => calcTotal()}>
					Calculate Letter Grade
				</Button>
				<br />
			</CardContent>
		</Card>
	);
};

export default LessonBox;

// export default styled.div``;
