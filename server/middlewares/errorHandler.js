import AppError from "../utils/AppError.js";

export const errorHandler = (err, req, res, next) => {
	switch (err) {
		case err instanceof AppError:
			return res.status(err.statusCode).json({
				success: false,
				message: err.message || "something went wrong",
				statusCode: err.statusCode,
				errorDetails: err,
			});

		default:
			return res.status(400).json({
				success: false,
				message: err?.message || "something went wrong",
				statusCode: err.statusCode || 400,
				errorDetails: err,
			});
	}
};

export default errorHandler;
