import React, { ClassAttributes, useState } from 'react';
import '../styles/LearningFeed.css';
import { LearningItem } from '../types/LearningItem';
import ReactMarkdown from 'react-markdown';
import CodeBlock from './CodeBlock';

interface LearningFeedProps {
	learningData: LearningItem[];
}

interface CodeProps  {
	inline?: boolean; 
	className?: string;
	children?: React.ReactNode; 
  }

const LearningFeed: React.FC<LearningFeedProps> = ({ learningData }) => {
	return (
		<div className="row m-0 learning-feed">
			{learningData.map((item, index) => (
				<div key={index} className="col-12 p-0">
					<div className="card learning-item">
						<div className="card-body">
							<div className="learning-item-header">
								<span className="learning-item-date">{item.date}</span>
								<span className="learning-item-tech">{item.hashtag}</span>
							</div>
							<h5 className="learning-item-title">{item.title}</h5>
							<ReactMarkdown
								components={{
									code({ inline, className, children, ...props }: CodeProps) {
										const match = /language-(\w+)/.exec(className || '');
										return !inline && match ? (
											<CodeBlock language={match[1]}>
												{String(children).replace(/\n$/, '')}
											</CodeBlock>
										) : (
											<code className={className} {...props}>
												{children}
											</code>
										);
									},
								}}
							>
								{item.content}
							</ReactMarkdown>
							{/* <p className="learning-item-content">{item.content}</p> */}
						</div>
					</div>
				</div>
			))}
		</div>
	);
};

export default LearningFeed;
