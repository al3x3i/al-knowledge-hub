import cors from 'cors';
import express, { Request, Response } from 'express';
import { LearningPayload } from 'model/learning';

import Learning from 'database/model/ILearning';
import connectToDatabase from 'database/mongoClient';
import { Application } from 'express';

const app: Application = express();
const PORT = process.env.PORT || 3000;

const learnings: LearningPayload[] = [
	{
		date: '14.11.2024',
		title: 'Learning MongoDB and Mongoose',
		hashtag: ['#MongoDB', '#Mongoose'],
		content: [
			{
				type: 'MARKDOWN',
				data: {
					content: `
  It is my personal project using MongoDB database with Mongoose. It was a great chance to gain practical experience working with this technology stack.  
  
  I want to leave an example of how I generated the MongoDB schema.  
  In MongoDB, which is a NoSQL database, the data is stored in a flexible, JSON-like format.  
  
  \`\`\`javascript
  import mongoose from 'mongoose';
  
  const LearningSchema = new mongoose.Schema({
	date: { type: Date, required: true },
	title: { type: String, required: true, default: 'No Title' },
	hashtag: { type: [String], required: true },
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
  
  const Learning = mongoose.model('Learning', LearningSchema);
  \`\`\`
		  `,
				},
			},
		],
	},
	{
		date: '12.04.2024',
		title: 'Backward vs Forward Compatibility',
		hashtag: ['#Kafka', '#Avro', '#SchemaMigration'],
		content: [
			{
				type: 'TEXT',
				data: {
					content: `
  I used to understand this clearly when I did Avro schema migration in Kafka.
  
  Important understanding of what the difference is:
  
  **Forward compatibility** - old code can read records that were written by new code.
  **Backward compatibility** - new code can read records that were written by old code.
		  `,
				},
			},
			{
				type: 'TEXT',
				data: {
					content: "My second text"
				},
			},
		],
	},
	
];

// (Cross-Origin Resource Sharing)
app.use(cors());
app.use(express.json());

connectToDatabase();

let counter = 0;
app.get('/api/learnings', async (req: Request, res: Response) => {
	// const learnings = await Learning.find();

	counter++;
	console.log('learnings request!' + counter);
	res.status(200).json(learnings);
});

app.post('/api/learnings', async (req: Request, res: Response) => {
	try {
		const { date, title, hashtag, content } = req.body;

		if (!date || !title || !hashtag || !content) {
			res.status(400).json({ error: 'Not all data are provided' });
			return;
		}

		const newLearning = new Learning({
			date,
			title,
			hashtag,
			content,
		});

		const savedLearning = await newLearning.save();

		res.status(201).json(savedLearning);
	} catch (error) {
		res.status(500).json({ error: 'Internal Server Error' });
	}
});

// TODO, use this endpoint clean data in database during development
app.delete('/api/learnings', async (req: Request, res: Response) => {
	const result = await Learning.deleteMany({});
	res.status(200).json({
		message: 'All records `learning` records deleted successfully',
		deletedCount: result.deletedCount,
	});
});

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT} `);
});
