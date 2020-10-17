const BaseException = require('./base.exception');

class SlotAvailabilityException extends BaseException {
	constructor() {        
		super('Bad Slot', 'SLOT_NOT_AVAILABLE_ERROR', 422);
	}
}

module.exports = SlotAvailabilityException;
