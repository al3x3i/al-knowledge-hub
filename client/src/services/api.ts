import { LearningItem } from '../types/LearningItem';

export const fetchLearnings = async () => {
	try {
		const response = await fetch(
			`${import.meta.env.VITE_API_URL}/api/learnings`,
		);

		if (!response.ok) {
			throw new Error('Network response error');
		}

		const result = (await response.json()) as LearningItem[];
		return result; // This is the learning data
	} catch (error: any) {
		throw new Error(error.message); // Return the error message
	}
};
