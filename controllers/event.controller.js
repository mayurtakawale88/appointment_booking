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
	}
}

module.exports = EventController;
