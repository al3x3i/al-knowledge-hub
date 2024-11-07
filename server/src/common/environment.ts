export const appPort = () => process.env.PORT || 3000;
export const dummyData = () => process.env.DUMMY_DB_DATA === 'true';
export const renderDummyServer = () => process.env.RENDER_DUMMY_SERVER;
