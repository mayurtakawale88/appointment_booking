const serviceConstants = require('../services/constants');
const dateHelper = require('../utils/date.utils');
const moment = require('moment');
const EventRepo = require('../repositories/event.repository');
const EventService = require('../services/event.service');

const {
	SlotAvailabilityException,
} = require('../exceptions');

class EventBiz {
	constructor() {
		this.eventRepo = new EventRepo();
	}

	createEvent(dateTime, duration) {
		return new Promise(async (resolve, reject) => {
			try {
				const date = dateHelper.getDate(dateTime);
                
				// Check given date and time is greater than current date time validation
				// need to be implment

				const startDateTime = moment(date + serviceConstants.START_TIME).utc();
				const endDateTime = moment(date + serviceConstants.END_TIME).utc();

				// Get free slot
				const freeSlot = await this.getFreeSlot(date, startDateTime, endDateTime);

				
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
    
	getFreeSlot(date, startDateTime, endDateTime) {
		return new Promise(async (resolve, reject) => {
			try {
				// all slots as per doctor availability
				const allSlots = dateHelper.getAllSlots(startDateTime, endDateTime, serviceConstants.DURATION); 

				// Get all booked slots
				const eventService = new EventService();
				const bookedEvent = await this.eventRepo.fetchEventByDate(date);
				const bookedSlots = await eventService.getBookedSlotByDate(date, bookedEvent);
                
				// Get free slots
				const freeSlots = allSlots.filter(slot => !bookedSlots.includes(slot));
				resolve(freeSlots);
			} catch (error) {
				reject(error);
			}
		});
	}
}

module.exports = EventBiz;
