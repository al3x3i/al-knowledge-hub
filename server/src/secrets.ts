export const DB = {
	USER: process.env.DB_USER || 'admin',
	PASS: process.env.DB_PASS || 'adminpassword',
	HOST: process.env.DB_HOST || 'localhost',
    PORT: process.env.DB_PORT || '27017',
    NAME: 'knowledge-hub'
};
