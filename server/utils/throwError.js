import logger from "./../logger/logger.js";
const throwError = (error) => {
	logger.error(error.message);
	throw error;
};
export default throwError;
