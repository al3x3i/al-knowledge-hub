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
              <div className="learning-item-header">
                <span className="learning-item-date">{item.date}</span>
                <span className="learning-item-tech">{item.technology}</span>
              </div>
              <h5 className="learning-item-title">{item.title}</h5>
              <p className="learning-item-content">{item.content}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LearningFeed;
