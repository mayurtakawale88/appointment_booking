const mysql = require('../db/mysql');

class SomeRepo {
	create(some) {
		return new Promise(async (resolve, reject) => {
			try {
				const query = `insert into some  
				(code, name) 
				values
				(:code, :name)`;
				await mysql.execute(query, some);
				resolve(true);
			} catch (error) {
				reject(error);
			}
		});
	}
}

module.exports = SomeRepo;
