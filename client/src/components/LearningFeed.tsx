import React from 'react';
import '../styles/LearningFeed.css';
import { LearningItem } from '../types/LearningItem';

interface LearningFeedProps {
	learningData: LearningItem[];
}

const LearningFeed: React.FC<LearningFeedProps> = ({ learningData }) => {
  return (
    <div className="row m-0 learning-feed" >
      {learningData.map((item, index) => (
        <div key={index} className="col-12 p-0" >
          <div className="card learning-item">
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <span className="text-muted">{item.date}</span>
                <span className="badge badge-primary">{item.technology}</span>
              </div>
              <h5 className="card-title">{item.title}</h5>
              <p className="card-text">{item.content}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LearningFeed;
