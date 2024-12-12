import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';

import { dummyLearning } from './dummyData';

import { Application } from 'express';
import { appPort } from './common/environment';
import Learning from './database/model/ILearning';
import connectToDatabase from './database/mongoClient';
import keepAlive from './keepAliveRender';
import { LearningPayload } from './model/learning';

const dummyDbData = process.env.DUMMY_DB_DATA;
const isKeepAlive = true;
const app: Application = express();
const PORT = appPort();

// (Cross-Origin Resource Sharing)
app.use(cors());
app.use(express.json());

if (!dummyDbData) {
	connectToDatabase();
}

let counter = 0;

app.get('/healthz', async (req: Request, res: Response) => {
	console.log('Health check request');
	res.status(200).send('OK');
});

app.get('/api/learnings', async (req: Request, res: Response, next) => {
	let learnings: LearningPayload[] | null = null;
	if (dummyDbData) {
		learnings = dummyLearning;
		res.status(200).json(learnings);
	} else {
		counter++;
		console.log('learnings request!' + counter);
		Learning.find()
			// .sort({ date: 1 })
			// .limit(10)
			.then((learnings) => {
				if (!learnings) {
					res.status(401);
				} else {
					res.status(200).json(learnings);
				}
			})
			.catch(next);
	}
});

app.post('/api/learnings', async (req: Request, res: Response, next) => {
	try {
		const { date, title, hashtag, content } = req.body;

		if (!date || !title || !hashtag || !content) {
			res.status(400).json({ error: 'Not all data are provided' });
			return;
		}

		const [day, month, year] = date.split('.').map(Number);
		const parsedDate = new Date(Date.UTC(year, month - 1, day));
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
		next(error);
	}
});

// TODO, use this endpoint clean data in database during development
app.delete('/api/learnings', (req: Request, res: Response, next) => {
	Learning.deleteMany({})
		.then((result) => {
			res.status(200).json({
				message: 'All records `learning` records deleted successfully',
				deletedCount: result.deletedCount,
			});
		})
		.catch(next);
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
	console.log(err.stack);

	res.status(err.status || 500).json({
		message: 'Internal Server Error',
	});
});

app
	.listen(PORT, () => {
		console.log(`Server is running on http://localhost:${PORT}`);

		if (isKeepAlive) {
			keepAlive();
		}
	})
	.on('error', (e) => {
		console.error('Server error: ', e);
	});
