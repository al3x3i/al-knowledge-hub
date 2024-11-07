import mongoose, { Schema, Document } from 'mongoose';

export type AccessLevel = 'L1' | 'L2' | 'L3';
export type ContentType = 'TEXT' | 'MARKDOWN' | 'IMAGE';

interface ILearning extends Document {
	date: Date;
	title: string;
	hashtag: string[];
	content: Array<
		| {
				type: Extract<ContentType, 'TEXT' | 'MARKDOWN'>;
				accessLevel: AccessLevel;
				data: {
					content: string;
				};
		  }
		| {
				type: Extract<ContentType, 'IMAGE'>;
				accessLevel: AccessLevel;
				data: {
					url: string;
					alt_text?: string;
					width?: number;
					height?: number;
					mime_type?: string;
					description?: string;
				};
		  }
	>;
}

const LearningSchema = new Schema<ILearning>({
	date: { type: Date, required: true },
	title: { type: String, required: true },
	hashtag: { type: [String], required: true },
	content: [
		{
			type: {
				type: String,
				required: true,
				enum: ['TEXT', 'MARKDOWN', 'IMAGE'],
			},
			accessLevel: {
				type: String,
				required: true,
				enum: ['L1', 'L2', 'L3'],
				default: "L1"
			},
			data: {
				type: Schema.Types.Mixed,
				required: true
			},
		},
	],
});

const Learning = mongoose.model<ILearning>('Learning', LearningSchema, 'learnings');

export default Learning;
