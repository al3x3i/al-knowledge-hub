import mongoose from 'mongoose';
import { DB } from 'secrets';


// const dbUri = process.env.MONGODB_URI || `mongodb://localhost:27017`;

// const dbURI = `mongodb://${DB.USER}:${encodeURIComponent(DB.PASS)}@${DB.HOST}:${DB.PORT}/${DB.NAME}`;
// const dbUri = `mongodb://${DB.USER}:${encodeURIComponent(DB.PASS)}@${DB.HOST}:${DB.PORT}/${DB.NAME}`;

// const dbUri = `mongodb://${DB.USER}:${DB.PASS}@${DB.HOST}:${DB.PORT}/${DB.NAME}`
const dbUri = `mongodb://${DB.USER}:${DB.PASS}@${DB.HOST}:${DB.PORT}/${DB.NAME}?authSource=admin`


const connectToDatabase = () => {
	mongoose
		.connect(dbUri)
		.then(() => console.log('Connected to Database'))
		.catch((error) => {
			console.log('Error while connecting to the Database');
			process.exit(-1)
		});

	mongoose.connection.on('connected', () => {
		console.log('Database connection is open to: ', dbUri);
	});

	mongoose.connection.on('error', (err) => {
		console.log('Database connection error: ', err);
	});

	mongoose.connection.on('disconnected', () => {
		console.log('Database connection disconnected');
	});

	process.on('SIGINT', () => {
		mongoose.connection.close();
		console.log('Database connection closed');
		process.exit(0);
	});
};

export default connectToDatabase;
