import mongoose, { Schema, Document } from 'mongoose';

interface ILearning extends Document {
	date: Date;
	title: string;
	technology: string;
	content: Array<{
		type: string;
		access_level: string;
		data: {
			content: string;
			language: string;
			description: string;
		};
	}>;
}

const LearningSchema = new Schema<ILearning>({
	date: { type: Date, required: true },
	title: { type: String, required: true },
	technology: { type: String, required: true },
	content: [
		{
			type: { type: String, required: true },
			access_level: { type: String, required: true },
			data: {
				content: { type: String, required: true },
				language: { type: String, required: true },
				description: { type: String, required: true },
			},
		},
	],
});

const Learning = mongoose.model<ILearning>('Learning', LearningSchema)

export default Learning