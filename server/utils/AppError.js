export default class AppError extends Error {
	constructor(message, statusCode, details = "", stack = "") {
		super(message);
		this.statusCode = statusCode;
		if (details) {
			this.details = details;
		} else {
			this.details = "";
		}
		if (stack) {
			this.stack = stack;
		} else {
			Error.captureStackTrace(this, this.constructor);
		}
	}
}
