const serviceConstant = require('./constants');
const moment = require('moment');
const dateHelper = require('../utils/date.utils');
const EventRepo = require('../repositories/event.repository');

class EventService {
	constructor() {
		this.eventRepo = new EventRepo();
	}

	getFreeSlot(date, startDateTime, endDateTime) {
		return new Promise(async (resolve, reject) => {
			try {
				// all slots as per doctor availability
				const allSlots = dateHelper.getAllSlots(startDateTime, endDateTime, serviceConstant.DURATION); 

				// Get all booked slots
				const bookedSlots = await this.getBookedSlotByDate(date);
                
				// Get free slots
				const freeSlots = allSlots.filter(slot => !bookedSlots.includes(slot));
				resolve(freeSlots);
			} catch (error) {
				reject(error);
			}
		});
	}

	getBookedSlotByDate(date) {
		return new Promise(async (resolve, reject) => {
			try {
				const bookedSlot = [];
				const bookedEvent = await this.eventRepo.fetchEventByDate(date);

				if (bookedEvent && Object.keys(bookedEvent).length > 0) {
					Object.keys(bookedEvent).forEach(element => {
						const ele = bookedEvent[element];
						bookedSlot.push(ele.start_time);
						let slotCount = ele.duration / serviceConstant.DURATION;
						if ((ele.duration % serviceConstant.DURATION) !== 0) {
						    slotCount = ((Math.abs((ele.duration % serviceConstant.DURATION) - 
                        serviceConstant.DURATION) + ele.duration) / serviceConstant.DURATION);
						}
						slotCount -= 1;

						for (let i = 1; i <= slotCount; i++) {
							bookedSlot.push(moment(ele.start_time).add((serviceConstant.DURATION * i), 'minutes').utc().format());
						}
					});
				}
				resolve(bookedSlot);
			} catch (error) {
				reject(error);
			}
		});
	} 
}

module.exports = EventService;
