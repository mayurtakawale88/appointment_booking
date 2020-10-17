const { SchemaException } = require('../exceptions/');

class BaseValidator {
	prepareValidationErrorObj(validatorResult) {
		try {
			if (!validatorResult.valid) {
				console.log(validatorResult);
				throw new SchemaException(validatorResult.errors);
			}
		} catch (error) {
			throw error;
		}
	}
}

module.exports = BaseValidator;
