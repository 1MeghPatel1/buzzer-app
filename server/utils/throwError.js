import logger from "./../logger/logger.js";
const throwError = (error) => {
	if (process.env.NODE_ENV === "production") {
		logger.error(error.stack);
		logger.error(error.message);
		throw new Error("Internal server error");
	} else {
		logger.error(error.stack);
		logger.error(error.message);
		throw new Error(error.message);
	}
};
export default throwError;
