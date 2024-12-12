import mongoose from 'mongoose';
import { DB } from '../secrets';

// const dbURI = `mongodb://${DB.USER}:${encodeURIComponent(DB.PASS)}@${DB.HOST}:${DB.PORT}/${DB.NAME}?authSource=admin`;

const dbURI = process.env.MONGO_CONNECT_URI ?? '';

if (!dbURI) {
	console.error('Mongo DB URI is not provided');
	process.exit(1);
}

const connectToDatabase = () => {
	mongoose
		.connect(dbURI)
		.then(() => console.log('Connected to Database'))
		.catch((error) => {
			console.log('Error while connecting to the Database');
		});

	mongoose.connection.on('connected', () => {
		console.log('Database connection is open to: ', dbURI);
	});

	mongoose.connection.on('error', (err) => {
		console.log('Database connection error: ', err);
	});

	mongoose.connection.on('disconnected', () => {
		console.log('Database connection disconnected');
	});

	mongoose.connection.on('reconnectFailed', () => {
		console.error('MongoDB Reconnection Failed');
	});

	mongoose.connection.on('reconnect', () => {
		console.log('MongoDB Reconnected');
	});

	process.on('SIGINT', () => {
		mongoose.connection.close();
		console.log('Database connection closed');
		process.exit(0);
	});
};

export default connectToDatabase;
