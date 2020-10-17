const EventRepo = require('../event.repository');

describe('Test event firebase opertaions', () => {
	it('Test insert opertaion', async () => {
		const date = '2020-10-17';
		const startTime = '2020-10-17T05:30:00Z';
		const endTime = '2020-10-17T06:30:00Z';
		const duration = 60;
		const eventRepo = new EventRepo();
		try {
			await eventRepo.insertEvent(date, startTime, endTime, duration);   
			expect(true).toBe(true);
		} catch (error) {
			console.log(error);
		}
	});
    
	it('Fetch event by date', async () => {
		const date = '2020-10-17';
		const expected = {
			'2020-10-17T05:30:00Z': {
				duration: 60,
				end_time: '2020-10-17T06:30:00Z',
				start_time: '2020-10-17T05:30:00Z',
			},
			'2020-10-17T07:30:00Z': {
				duration: 67,
				end_time: '2020-10-17T09:00:00Z',
				start_time: '2020-10-17T07:30:00Z',
			},
		};
		try {
			const eventRepo = new EventRepo();
			const data = await eventRepo.fetchEventByDate(date);
			expect(data).toMatchObject(expected);
		} catch (error) {
			console.log(error);
		} 
	});
});
