import axios from 'axios';
import { appPort } from './common/environment';

const keepAlive = (): void => {
	const PORT = appPort();
	const SELF_PING_URL =
		process.env.RENDER_URL || `http://localhost:${PORT}/healthz`;

	const callEndpointWithRandomInterval = async () => {
		try {
			const resp = await axios.get(SELF_PING_URL);
			console.log(`Self-healthz successful - Status: ${resp.status}`);
		} catch (err: unknown) {
			if (axios.isAxiosError(err)) {
				console.error(`Error during health check (Axios): ${err.message}`);
			} else {
				console.error(`Error during health check: ${String(err)}`);
			}
		}

		const randomInterval = Math.floor(Math.random() * 11) * 60 * 1000; // from 1 minute till 10 minutes
		// const randomInterval = 1 * 60 * 1000; // every minute

		setTimeout(callEndpointWithRandomInterval, randomInterval);
	};

	// Start the api calls in infinite loop
	callEndpointWithRandomInterval();
};

export default keepAlive;
