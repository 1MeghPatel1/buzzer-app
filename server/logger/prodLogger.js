import winston, { format } from "winston";

const prodLogger = () => {
	return winston.createLogger({
		level: "info",
		format: winston.format.combine(format.timestamp(), format.simple()),
		transports: [
			new winston.transports.File({ filename: "error.log", level: "error" }),
			new winston.transports.File({ filename: "combined.log" }),
		],
	});
};

export default prodLogger;
