const dateHelper = require('../date.utils');
const moment = require('moment');

describe('Test Date helper functions', () => {
	it('Test Get Date', async () => {
		const date = dateHelper.getDate('2020-10-17T04:30:00Z');
		expect(date).toBe('2020-10-17');
	});
    
	it('Test get slots', async () => {
		const startDate = moment('2020-10-17T04:30:00Z').utc();
		const endDate = moment('2020-10-17T11:30:00Z').utc();
		const slots = dateHelper.getAllSlots(startDate, endDate, 30);
		expect(slots).toHaveLength(14);
	});
    
	it('Test get slots date time range', async () => {
		const startDate = '2020-10-17T05:30:00Z';
		const duration = 30;
		const {
			reqStartSlot,
			reqEndSlot,
		} = dateHelper.getSlotTime(startDate, duration);
		expect(reqStartSlot.format()).toBe('2020-10-17T05:30:00Z');
		expect(reqEndSlot.format()).toBe('2020-10-17T06:00:00Z');
	});

	it('Test grp by AM/PM', async () => {
		const expected = {
			AM: ['10:00 AM', '11:00 AM'],
			PM: ['12:00 PM', '03:30 PM', '04:00 PM'],
		  };
		const dates = [
			'2020-10-17T04:30:00Z',
			'2020-10-17T05:30:00Z',
			'2020-10-17T06:30:00Z',
			'2020-10-17T10:00:00Z',
			'2020-10-17T10:30:00Z',
		];
		const timeZone = 'IST';
		const grp = dateHelper.groupByAmPm(dates);
		expect(grp).toMatchObject(expected);
	});
});
