import React from "react";
import LessonsData from "./data/lessons.json";
import LessonBox from "./components/Lesson/LessonBox";
import Global from "./styles/global";
import LessonsWrapper from "./components/Lesson/LessonsWrapper";

const App: React.FC = () => (
	<>
		<Global />
		<LessonsWrapper>
			{Object.entries(LessonsData).map(([lessonName, lessonDetails]) => (
				<LessonBox
					lessonName={lessonName}
					assessments={lessonDetails.assessments}
					catalog={lessonDetails.catalog}
				/>
			))}
		</LessonsWrapper>
	</>
);

export default App;
