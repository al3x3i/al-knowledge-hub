import { ContentType } from '../database/model/ILearning';

export interface LearningPayload {
	date: Date;
	title: string;
	hashtag: string[];
	content: Array<{
		type: ContentType;
		data:
			| { content: string } // TEXT or MARKDOWN
			| {
					url: string;
					alt_text?: string;
					width?: number;
					height?: number;
					mime_type?: string;
					description?: string;
			  }; // IMAGE
	}>;
}
