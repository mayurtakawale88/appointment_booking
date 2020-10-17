
class EventRepo {
	insertEvent(date, startTime, endTime, duration) {
		return new Promise(async (resolve, reject) => {
			try {
				const eventRef = global.db.ref(`event/${date}`);
				const obj = {
					start_time: startTime,
					end_time: endTime,
					duration,
				};

				const oneEvent = eventRef.child(obj.start_time);
				const resp = await oneEvent.update(obj);
				resolve(resp);
			} catch (error) {
				reject(error);
			} 
		});
	}
    
	fetchEventByDate(date) {
		return new Promise(async (resolve, reject) => {
			try {
				const eventRef = global.db.ref(`event/${date}`);
				eventRef.on('value', (snapshot) => {
					resolve(snapshot.val());
				}, (errorObject) => {
					reject(errorObject);
				});
			} catch (error) {
				reject(error);
			}
		});
	}
}

module.exports = EventRepo;

