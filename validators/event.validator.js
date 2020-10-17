const BaseValidator = require('./base.validator');

const SchemaValidator = require('jsonschema').Validator;

const { createEventSchema } = require('../schema/event.schema');

class EventValidator extends BaseValidator {
	create(data) {
		try {
			const schemaValidator = new SchemaValidator();
			super.prepareValidationErrorObj(schemaValidator.validate(data, createEventSchema));
		} catch (error) {
			throw error;
		}
	}
}

module.exports = EventValidator;
