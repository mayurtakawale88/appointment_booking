const BaseValidator = require('./base.validator');

const SchemaValidator = require('jsonschema').Validator;

const { createEventSchema, freeSlotsSchema, bookedEventsSchema } = require('../schema/event.schema');

class EventValidator extends BaseValidator {
	create(data) {
		try {
			const schemaValidator = new SchemaValidator();
			super.prepareValidationErrorObj(schemaValidator.validate(data, createEventSchema));
		} catch (error) {
			throw error;
		}
	}

	freeSlots(data) {
		try {
			const schemaValidator = new SchemaValidator();
			super.prepareValidationErrorObj(schemaValidator.validate(data, freeSlotsSchema));
		} catch (error) {
			throw error;
		}
	}

	bookedEvents(data) {
		try {
			const schemaValidator = new SchemaValidator();
			super.prepareValidationErrorObj(schemaValidator.validate(data, bookedEventsSchema));
		} catch (error) {
			throw error;
		}
	}
}

module.exports = EventValidator;
