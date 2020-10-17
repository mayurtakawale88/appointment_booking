const serviceConstants = require('../services/constants');
const dateHelper = require('../utils/date.utils');
const moment = require('moment');
const EventService = require('../services/event.service');

const {
	SlotAvailabilityException,
} = require('../exceptions');

class EventBiz {
	createEvent(dateTime, duration) {
		return new Promise(async (resolve, reject) => {
			try {
				const date = dateHelper.getDate(dateTime);
                
				// Check given date and time is greater than current date time validation
				// need to be implment

				const startDateTime = moment(date + serviceConstants.START_TIME).utc();
				const endDateTime = moment(date + serviceConstants.END_TIME).utc();

				// Get free slot
				const eventServie = new EventService();
				const freeSlot = await eventServie.getFreeSlot(date, startDateTime, endDateTime);

				
				// make duration to multiple of 30
				let durationMinute = duration;
				if ((duration % serviceConstants.DURATION) !== 0) {
					durationMinute = duration + Math.abs((duration % serviceConstants.DURATION) - serviceConstants.DURATION);
				}
				durationMinute -= serviceConstants.DURATION;
                
				// Get requie slots timing
				const {
					reqStartSlot,
					reqEndSlot,
				} = dateHelper.getSlotTime(dateTime, durationMinute);
                
				// allocate slot if available else throw exception
				if (!freeSlot.includes(reqStartSlot.format()) || !freeSlot.includes(reqEndSlot.format())) {
					throw new SlotAvailabilityException();
				}
				const startTime = reqStartSlot.format();
				const endTime = moment(reqEndSlot).add(serviceConstants.DURATION, 'minutes').utc().format();
				await this.eventRepo.insertEvent(date, startTime, endTime, duration);
				resolve({
					date,
					startTime,
					endTime,
					duration,
				});
			} catch (error) {
				reject(error);
			}
		});
	}

	getFreeSlots(date, timeZone) {
		return new Promise(async (resolve, reject) => {
			try {
				const startDateTime = moment(date + serviceConstants.START_TIME).utc();
				const endDateTime = moment(date + serviceConstants.END_TIME).utc();

				// Get free slot
				const eventServie = new EventService();
				const freeSlot = await eventServie.getFreeSlot(date, startDateTime, endDateTime);
				

				// Group by AM, PM
				const freeSlotsGrp = dateHelper.groupByAmPm(freeSlot, timeZone);
				resolve(freeSlotsGrp);
			} catch (error) {
				reject(error);
			}
		});
	}
}

module.exports = EventBiz;
