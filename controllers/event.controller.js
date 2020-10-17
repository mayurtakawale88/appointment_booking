const EventValidator = require('../validators/event.validator');
const EventBiz = require('../biz/event.biz');

class EventController {
	register(app) {
		app.route('/create-event')
			.post(async (request, response, next) => {
				try {
					const {
						date_time,
						duration,
					} = request.body;
                    
					const validator = new EventValidator();
					validator.create(request.body);
                    
					const eventBiz = new EventBiz();
					const event = await eventBiz.createEvent(date_time, duration);

					// IF you do not want to execute async services
					response.json({
						event,
					}, 'Event Created');
				} catch (error) {
					next(error);
				}
			});
		
		app.route('/free-slots')
			.get(async (request, response, next) => {
				try {
					const {
						date,
						timezone,
					} = request.query;

					const validator = new EventValidator();
					validator.freeSlots(request.query);

					const eventBiz = new EventBiz();
					const slots = await eventBiz.getFreeSlots(date, timezone);

					response.json({
						slots,
					}, 'Slots Fetched');
				} catch (error) {
					next(error);
				}
			});

		app.route('/booked-events')
			.get(async (request, response, next) => {
				try {
					const {
						dateFrom,
						dateTo,
					} = request.query;

					const validator = new EventValidator();
					validator.bookedEvents(request.query);

					const eventBiz = new EventBiz();
					const bookedEvent = await eventBiz.getBookedEvents(dateFrom, dateTo);

					response.json({
						bookedEvent,
					}, 'Booked Events');
				} catch (error) {
					next(error);
				}
			});
	}
}

module.exports = EventController;
