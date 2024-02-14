import mongoose from "mongoose";

const connectToDatabase = async () => {
	try {
		await mongoose.connect(process.env.MONGO_URI, {});
		console.log("MongoDB connected");
		return;
	} catch (error) {
		console.log(error);
	}
};

export default connectToDatabase;
