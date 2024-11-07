import axios from 'axios';
import dotenv from 'dotenv';
import express, { Application, Request, Response } from 'express';
import { exit } from 'process';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3001;

const mainServerApi = process.env.MAIN_SERVER_API;

if (!mainServerApi) {
	console.error('Missing Main Server API');
	exit(1);
}

const PING_URL = `${mainServerApi}/api/ping`;
console.log('Ping URL: ', PING_URL);

app.get('/api/dummy-api', async (req: Request, res: Response) => {
	res.status(200).send('OK');
});

const keepMainServerAlive = (): void => {
	const callEndpointWithRandomInterval = async () => {
		try {
			const resp = await axios.get(PING_URL);
			console.log(`Request - Status: ${resp.status}`);
		} catch (err: unknown) {
			if (axios.isAxiosError(err)) {
				console.error(`Error during request (Axios): ${err.message}`);
			} else {
				console.error(`Error api call: ${String(err)}`);
			}
		}

		const randomInterval = Math.floor(Math.random() * 9 + 1) * 60 * 1000; // from 1 minute till 9 minutes. (The * 9 + 1 ensures a minimum of 1)
		// const randomInterval = 1 * 60 * 1000; // every minute

		console.log('Next request interval: ', randomInterval);
		setTimeout(callEndpointWithRandomInterval, randomInterval);
	};

	// Start the api calls in infinite loop
	callEndpointWithRandomInterval();
};

app.listen(PORT, () => {
	console.log(`Dummy server is running on http://localhost:${PORT}`);
	keepMainServerAlive();
});
