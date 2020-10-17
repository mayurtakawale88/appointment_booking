const EventService = require('../event.service');

describe('Test event service', () => {
	it('Test get booked event by date', async () => {
		const date = '2020-10-17';
		const eventService = new EventService();
		const data = await eventService.getBookedSlotByDate(date);
		expect(data).toHaveLength(5);
	});
});
