import React from "react";
import LessonsData from "./data/lessons.json";
import LessonBox from "./components/Lesson/LessonBox";

const App: React.FC = () => (
	<>
		{Object.entries(LessonsData).map(([lessonName, lessonDetails]) => (
			<LessonBox
				lessonName={lessonName}
				assessments={lessonDetails.assessments}
				catalog={lessonDetails.catalog}
			/>
		))}
	</>
);

export default App;
