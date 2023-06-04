export const letterGrades = ["A", "A-", "B+", "B", "B-", "C+", "C", "C-", "D+", "D", "F"] as const;

export interface Assessment {
	name: string;
	outOf: number;
	received: number;
	weight: number;
}

export type LessonCatalog = Record<string, number> | null; // Record<keyof typeof letterGrades, number> but it doesn't work properly, hmm

export interface LessonDetails {
	assessments: Assessment[];
	catalog: LessonCatalog;
}
