import rocketSvg from '../assets/rocket.svg';
import '../styles/LoadingSpinner.css';

interface LoadingSpinnerProps {
	message?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ message = '' }) => {
	return (
		<div className="spinner-overlay">
			<img src={rocketSvg} className="loading-emoji" width={32} height={32} />
			{message && <span>{message}</span>}{' '}
			<span>Please be patient, the public services are starting up.</span>
		</div>
	);
};

export default LoadingSpinner;
