import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface CodeBlockProps {
	language: string;
	children: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ language, children }) => {
	const handleCopy = () => {
		navigator.clipboard.writeText(children);
	};

	return (
		<div className="border rounded bg-dark text-light">
			<div className="d-flex justify-content-between align-items-center p-2 bg-secondary">
				<span className="text-light">{language || 'code'}</span>
				<button className="btn btn-sm btn-outline-light" onClick={handleCopy}>
					Copy code
				</button>
			</div>
			<SyntaxHighlighter
				language={language}
				style={oneDark}
				customStyle={{ padding: '1rem' }}
			>
				{children}
			</SyntaxHighlighter>
		</div>
	);
};

export default CodeBlock;
