const SomeBiz = require('../biz/some.biz');
const SomeValidator = require('../validators/some.validator');
const serviceConstants = require('../services/constants');

class SomeController {
	register(app) {
		app.route('/some')
			.post(async (request, response, next) => {
				try {
					const {
						data,
					} = request.body;
					const validator = new SomeValidator();
					validator.create(request.body);

					const someBiz = new SomeBiz();
					const result = await someBiz.create(data);

					// IF you do not want to execute async services
					response.json({
						result,
					}, 'Data updated.');

					// IF you need to execute services 
					response.json({
						result,
					}, 'Data updated.', {
						services: [
							serviceConstants.CIBIL
						],
						id: result.id
					});
				} catch (error) {
					next(error);
				}
			});
	}
}

module.exports = SomeController;
