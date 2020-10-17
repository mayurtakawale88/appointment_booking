const SomeRepo = require('../repositories/some.repository');
const Some = require('../models/Some');

class SomeBiz {
	constructor() {
		this.someRepo = new SomeRepo();
	}

	create(data) {
		return new Promise(async (resolve, reject) => {	
			try {
				const some = new Some(data);
				
				await this.someRepo.create(some);

				resolve(some);
			} catch (error) {
				reject(error);
			}
		});
	}
}

module.exports = SomeBiz;
