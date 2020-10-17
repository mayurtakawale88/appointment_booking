module.exports = async (request, response, next) => {
	try {
		

		// Do not remvoe this
		next();
	} catch (error) {
		next(error);
	}
};
