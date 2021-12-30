import { LessonCatalog, letterGrades } from "../types/types";

export function gradeToLetter(grade: number, catalog: LessonCatalog): string {
	if (!catalog) {
		return "Curve Lesson";
	}

	for (const letter of letterGrades) {
		if (grade >= catalog[letter]) return letter;
	}

	return "Unknown Grade";
}
