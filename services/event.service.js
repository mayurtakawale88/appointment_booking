const serviceConstant = require('./constants');
const moment = require('moment');

class EventService {
	getBookedSlotByDate(date, bookedEvent) {
		return new Promise(async (resolve, reject) => {
			try {
				const bookedSlot = [];
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
