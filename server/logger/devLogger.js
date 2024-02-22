import winston, { format } from "winston";

const devLogger = () => {
	return winston.createLogger({
		level: "info",
		format: format.combine(format.timestamp(), format.json()),
		transports: [
			//
			// - Write all logs with importance level of `error` or less to `error.log`
			// - Write all logs with importance level of `info` or less to `combined.log`
			//
			new winston.transports.File({ filename: "error.log", level: "error" }),
			new winston.transports.File({ filename: "combined.log" }),
		],
	});
};

export default devLogger;
