const admin = require('firebase-admin');
const serviceAccount = require('../../firebase.json');
const config = require('config');

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: `https://${config.get('db.firebase.project-id')}.firebaseio.com`,
	authDomain: `${config.get('db.firebase.project-id')}.firebaseapp.com`,
});

global.db = admin.database();

const EventBiz = require('../event.biz');

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

	it('Test Free slot', async () => {
		const date = '2020-10-17';
		const timeZone = 'IST';
		const eventBiz = new EventBiz();
		const data = await eventBiz.getFreeSlots(date, timeZone);
		console.log(data);
	});

	it('Test booked event', async () => {
		const date1 = '2020-10-17';
		const date2 = '2020-10-18';
		const eventBiz = new EventBiz();
		const data = await eventBiz.getBookedEvents(date1, date2);
		console.log(data);
	});
});
