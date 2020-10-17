const admin = require('firebase-admin');
const serviceAccount = require('../../firebase.json');
const config = require('config');

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: `https://${config.get('db.firebase.project-id')}.firebaseio.com`,
	authDomain: `${config.get('db.firebase.project-id')}.firebaseapp.com`,
});

global.db = admin.database();

const EventService = require('../event.service');
const moment = require('moment');

describe('Test event service', () => {
	it('Test get booked event by date', async () => {
		const date = '2020-10-17';
		const eventService = new EventService();
		const data = await eventService.getBookedSlotByDate(date);
		expect(data).toHaveLength(5);
	});

	it('Test free slots', async () => {
		const startDate = moment('2020-10-17T04:30:00Z').utc();
		const endDate = moment('2020-10-17T11:30:00Z').utc();
		const date = '2020-10-17';
		const eventService = new EventService();
		const data = await eventService.getFreeSlot(date, startDate, endDate);
		console.log(data);
	});
});
