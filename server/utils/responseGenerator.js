const createResponse = (res, status, message, payload) => {
	return res.status(status).json({
		status: status,
		success: true,
		message: message,
		data: payload,
	});
};
export default createResponse;
