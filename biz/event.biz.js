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
				// to be implement

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
				// date validation passed date should not be lower that current date
				// to be implement

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

	getBookedEvents(date1, date2) {
		return new Promise(async (resolve, reject) => {
			try {
				const bookedEvents = {};
				const eventServie = new EventService();

				// Date validation date 1 should not be grater than date2
				// to be implement
				let startDate = date1;
				while (startDate <= date2) {
					const bookedSlots = await eventServie.getBookedSlotByDate(startDate);
					const slotsGrp = dateHelper.groupByAmPm(bookedSlots);
					bookedEvents[startDate] = slotsGrp;
					startDate = dateHelper.getDate(moment(startDate).add(1, 'days'));
				}
				resolve(bookedEvents);
			} catch (error) {
				reject(error);
			}
		});
	}
}

module.exports = EventBiz;
