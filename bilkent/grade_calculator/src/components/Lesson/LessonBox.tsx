import React, { useState } from "react";
import { LessonDetails } from "../../types/types";
import { gradeToLetter } from "../../util/util";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Tooltip } from "@mui/material";

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

	const catalogTable: JSX.Element = catalog ? (
		<TableContainer component={Paper}>
			<Table aria-label="Letter Grade Catalog">
				<TableBody>
					{Object.entries(catalog).map(([letterGrade, min]) => (
						<TableRow key={letterGrade} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
							<TableCell component="th" scope="row">
								{letterGrade}
							</TableCell>
							<TableCell align="right">
								{`>`}={min}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	) : (
		<Typography variant="h4" textAlign="center">
			No Letter Grade Catalog Exists For This Lesson
		</Typography>
	);

	return (
		<Card variant="outlined" sx={{ width: "fit-content" }}>
			<CardContent>
				<Tooltip title={catalogTable}>
					<Typography variant="h2" sx={{ textDecoration: "underline dotted" }}>{`${
						letterGrade === null ? lessonName : `${lessonName}: ${letterGrade}`
					}`}</Typography>
				</Tooltip>
				{totalGrade !== null ? (
					<Typography variant="h4">Total Grade: {totalGrade.toFixed(2)}</Typography>
				) : null}
				<br />
				{Object.values(assessments).map((assessment, i) => (
					<React.Fragment key={`${assessment.name}-${i}`}>
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
					</React.Fragment>
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
