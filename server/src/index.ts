import cors from 'cors';
import express, { Request, Response } from 'express';

import { dummyLearning } from 'dummyData';

import Learning from 'database/model/ILearning';
import connectToDatabase from 'database/mongoClient';
import { Application } from 'express';
import { LearningPayload } from 'model/learning';

const app: Application = express();
const PORT = process.env.PORT || 3000;

// (Cross-Origin Resource Sharing)
app.use(cors());
app.use(express.json());

connectToDatabase();

let counter = 0;
app.get('/api/learnings', async (req: Request, res: Response) => {
	const debug = false;
	let learnings: LearningPayload[] | null = null;
	if (debug) {
		learnings = dummyLearning;
	}

	learnings = await Learning.find();
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

		const [day, month, year] = date.split('.').map(Number);
		const parsedDate = new Date(Date.UTC(year,month - 1, day));
		if (isNaN(parsedDate.getTime())) {
			res.status(400).json({ error: 'Invalid Date format' });
			return;
		}

		const newLearning = new Learning({
			date: parsedDate,
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
