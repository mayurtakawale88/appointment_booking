const moment = require('moment');
const serviceConstant = require('../services/constants');

module.exports = {
	getAllSlots: (startDate, endDate, slotDuration) => {
		try {
			const slots = [];
			const endTime = moment(endDate).subtract(slotDuration, 'minutes').utc();
			let startTime = startDate;
			slots.push(startDate.format());

			while (new Date(startTime) < new Date(endTime)) {
				startTime = moment(startTime).add(slotDuration, 'minutes').utc();
				slots.push(startTime.format());
			}
			return slots; 
		} catch (error) {
			return [];
		}
	},

	getDate: (date) => {
		try {
			const d = moment(date).format(moment.HTML5_FMT.DATE);
			return d;
		} catch (error) {
			return null;
		}
	},
    
	getSlotTime: (date, duration) => {
		try {
			const reqStartSlot = moment(date).utc();
			let reqEndSlot = moment(date).add(serviceConstant.DURATION, 'minutes').utc();
			if (duration > 0) {
				reqEndSlot = moment(date).add(duration, 'minutes').utc();
			}
			return {
				reqStartSlot,
				reqEndSlot,
			};
		} catch (error) {
			return {
				reqStartSlot: '',
				reqEndSlot: '',
			};
		}
	},

};
