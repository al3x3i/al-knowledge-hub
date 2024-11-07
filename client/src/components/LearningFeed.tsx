import React from 'react';
import ReactMarkdown from 'react-markdown';
import '../styles/LearningFeed.css';
import {
	ContentItem,
	LearningItem,
	MarkdownContent,
	TextContent,
} from '../types/LearningItem';
import CodeBlock from './CodeBlock';

interface LearningFeedProps {
	learningData: LearningItem[];
}

function isMarkdownContent(item: ContentItem): item is MarkdownContent {
	return item.type === 'MARKDOWN';
}

function isTextContent(item: ContentItem): item is TextContent {
	return item.type === 'TEXT';
}

function getDateString(date: string): string {
	return new Date(date).toISOString().split('T')[0];
}

const LearningFeed: React.FC<LearningFeedProps> = ({ learningData }) => {
	return (
		<div className="row m-0 learning-feed">
			{learningData.map((item, index) => (
				<div key={index} className="col-12 p-0">
					<div className="card learning-item">
						<div className="card-body">
							<div className="learning-item-header">
								<span className="learning-item-date">
									{getDateString(item.date)}
								</span>
								<span className="learning-item-tech">
									{item.hashtag.join(' ')}
								</span>
							</div>
							<h5 className="learning-item-title">{item.title}</h5>
							{item.content.map((contentItem, idx) => {
								const isLastContent = idx == item.content.length - 1;

								if (isTextContent(contentItem)) {
									return (
										<div key={idx}>
											<pre
												// Try to keep the css style as in the Markdown
												style={{
													whiteSpace: 'pre-line',
													fontSize: '1rem',
													fontFamily: 'inherit',
													lineHeight: '1.5',
													overflowX: 'auto',
												}}
											>
												{contentItem.data.content}
											</pre>
										</div>
									);
								} else if (isMarkdownContent(contentItem)) {
									return (
										<ReactMarkdown
											key={idx}
											components={{
												code(props) {
													const { children, className } = props;
													const match = /language-(\w+)/.exec(className || ''); // trails all empty lines at the end of the string
													const formattedChildren = String(children).replace(
														/\n+$/,
														'',
													);
													return match ? (
														<CodeBlock language={match[1]}>
															{formattedChildren}
														</CodeBlock>
													) : (
														<code className="inline-code">
															{formattedChildren}
														</code>
													);
												},
											}}
										>
											{contentItem.data.content}
										</ReactMarkdown>
									);
								}
								if (!isLastContent) {
									return <br />;
								}
								// {isLastContent && <br/>}
							})}
						</div>
					</div>
				</div>
			))}
		</div>
	);
};

export default LearningFeed;
