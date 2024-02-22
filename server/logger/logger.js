import prodLogger from "./prodLogger.js";
import devLogger from "./devLogger.js";

let logger = null;

if (process.env.NODE_ENV === "production") {
	logger = prodLogger();
} else {
	logger = devLogger();
}

export default logger;
