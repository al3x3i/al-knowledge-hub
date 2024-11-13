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
		date: '20.10.2024',
		title: 'Efficiently converting multiple JPEG images into a single PDF file',
		hashtag: ['#Shell'],
		content: `Use this script to convert multiple JPEG images to one PDF file:\n\nsudo pacman -S img2pdf\n\nimg2pdf *.jpg -o image_%d.pdf`,
	},
	{
		date: '18.10.2024',
		title: 'Finished "TypeScript Essential Training" LinkedIn course',
		hashtag: ['#TypeScript'],
		content: `In this course I enhanced my existing skills:\n\n- Integration: Learned to add TypeScript to my projects easily.\n- Type Safety: Improved my understanding of basic types, interfaces, and generics.\n- Advanced Types: Learned about union types and keyof/typeof operators.\n- Decorators: Discovered how to use method and class decorators.\n- Module Management: Enhanced my skills in importing/exporting code and using ambient modules.`,
	},
	{
		date: '15.10.2024',
		title: 'Use shared_buffers to Enhance PostgreSQL Performance',
		hashtag: ['#PostgreSQL'],
		content: `One of our databases was having performance issues, and it was not clear at first why it was slow. We tried different steps to improve it, such as increasing memory and removing CPU limits in Kubernetes for the pod.\nOne big improvement was changing the shared_buffers setting from the default 128MB to 1GB. This change increased the cache hit ratio from about 56% to 92.77%. As a result, queries ran faster, and the system read less data from the disk.\n\nThis SQL query shows cache hit ratio:\n\nSELECT round(100.0 * sum(blks_hit) / (sum(blks_hit) + sum(blks_read)), 2) as cache_hit_ratio \nFROM pg_stat_database;`,
	},
];

// (Cross-Origin Resource Sharing)
app.use(cors());
app.use(express.json());

connectToDatabase();

let counter = 0;
app.get('/api/learnings', async (req: Request, res: Response) => {
	const learnings = await Learning.find();

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

		res.status(200).json(savedLearning);
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
