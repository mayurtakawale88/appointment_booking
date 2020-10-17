const BaseValidator = require('./base.validator');

const SchemaValidator = require('jsonschema').Validator;

const { someSchema } = require('../schema/some.schema');

class SomeValidator extends BaseValidator {
	create(data) {
		try {
			const schemaValidator = new SchemaValidator();
			super.prepareValidationErrorObj(schemaValidator.validate(data, someSchema));
		} catch (error) {
			throw error;
		}
	}
}

module.exports = SomeValidator;
