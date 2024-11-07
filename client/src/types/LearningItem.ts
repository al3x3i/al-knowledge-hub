export interface LearningItem {
	date: string;
	title: string;
	hashtag: string[];
	content: ContentItem[];
}

export type ContentItem = TextContent | MarkdownContent | ImageContent;

export interface TextContent {
	type: 'TEXT';
	data: { content: string };
}
export interface MarkdownContent {
	type: 'MARKDOWN';
	data: { content: string };
}
export interface ImageContent {
	type: 'IMAGE';
	data: {
		url: string;
		alt_text?: string;
		width?: number;
		height?: number;
		mime_type?: string;
		description?: string;
	};
}
