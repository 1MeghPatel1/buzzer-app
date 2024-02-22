import mongoose from "mongoose";
import logger from "../logger/logger.js";

const connectToDatabase = async () => {
	try {
		await mongoose.connect(process.env.MONGO_URI, {});
		console.log("MongoDB connected");
		logger.info("MongoDB connected");
		return;
	} catch (error) {
		console.log(error);
	}
};

export default connectToDatabase;
