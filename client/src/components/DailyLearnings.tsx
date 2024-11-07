import React, { useEffect, useState } from 'react';
import '../styles/DailyLearnings.css';
import { LearningItem } from '../types/LearningItem';
import LearningFeed from './LearningFeed';


const DailyLearnings: React.FC = () => {
	const [data, setData] = useState<LearningItem[]>([]);
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		const fetchData = async () => {
			console.log('Read data!');
			try {
				const response = await fetch('http://localhost:5000/api/learnings');
				if (!response.ok) {
					throw new Error('Network response error');
				}
				const result = (await response.json()) as LearningItem[];

				setData(result); // Update state with the parsed JSON
			} catch (error: any) {
				setError(error.message);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	if (loading) {
		return <div>Loading ...</div>;
	}
	if (error) {
		return <div>Error: {error}</div>;
	}

	return (
		<div className="main">
			<div className='header'></div>
			<div className="menu">
				<ul>
					<li>Daily Learnings</li>
				</ul>
			</div>
			<div className="daily-learnings-container">
				<LearningFeed learningData={data} />
			</div>
		</div>
	);
};

export default DailyLearnings;
