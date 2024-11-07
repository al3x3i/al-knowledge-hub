import React, { useEffect, useState } from 'react';
import { fetchLearnings } from '../services/api';
import '../styles/DailyLearnings.css';
import { LearningItem } from '../types/LearningItem';
import LearningFeed from './LearningFeed';
import LoadingSpinner from './LoadingSpinner';

const DailyLearnings: React.FC = () => {
	const [data, setData] = useState<LearningItem[]>([]);
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		const fetchData = async () => {
			console.log('Read data!');
			try {
				// const response = await fetch('/api/learnings');
				const result = await fetchLearnings();
				// const response = await fetch('https://al-knowledge-hub.onrender.com/api/learnings');

				setData(result); // Update state with the parsed JSON
			} catch (error: any) {
				setError(error.message);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	return (
		<div className="main">
			<div className="header"></div>
			<div className="menu">
				<ul>
					<li>Daily Learnings</li>
				</ul>
			</div>
			<div className="daily-learnings-container">
				{loading && (
					<LoadingSpinner message='Glad to see you!'/>
				)}
				{!loading && !error && <LearningFeed learningData={data} />}
			</div>
		</div>
	);
};

export default DailyLearnings;
