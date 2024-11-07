import { LearningPayload } from './model/learning';


export const dummyLearning: LearningPayload[] = [
	{
		date: new Date('2023-03-05T00:00:00.000Z'),
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
		date: new Date('2023-02-05T00:00:00.000Z'),
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
					content: 'My second text',
				},
			},
		],
	},
];