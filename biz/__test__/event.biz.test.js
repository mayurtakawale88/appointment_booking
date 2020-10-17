const EventBiz = require('../event.biz');
const moment = require('moment');

describe('Test event business logic', () => {
	it('Test Create Event', async () => {
		const dateTime = '2020-10-17T07:30:00Z';
		const duration = 67;
		const eventBiz = new EventBiz();
		const expected = {
			date: '2020-10-17',
			startTime: '2020-10-17T07:30:00Z',
			endTime: '2020-10-17T09:00:00Z',
			duration: 67,
		};
		try {
			const result = await eventBiz.createEvent(dateTime, duration);
			expect(result).toMatchObject(expected);
		} catch (error) {
			console.log(error);
		}
	});

	it('Test free slots', async () => {
		const startDate = moment('2020-10-17T04:30:00Z').utc();
		const endDate = moment('2020-10-17T11:30:00Z').utc();
		const date = '2020-10-17';
		const eventBiz = new EventBiz();
		const data = await eventBiz.getFreeSlot(date, startDate, endDate);
		console.log(data);
	});
});
