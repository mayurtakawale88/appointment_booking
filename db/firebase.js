const admin = require('firebase-admin');
const serviceAccount = require('../firebase.json');
const config = require('config');

class FireBase {
	constructor() {
		this.projectId = config.get('db.firebase.project-id');
	}

	getConnection() {
		return admin.initializeApp({
			credential: admin.credential.cert(serviceAccount),
			databaseURL: `https://${this.projectId}.firebaseio.com`,
			authDomain: `${this.projectId}.firebaseapp.com`,
		});
		
	}
}

module.exports = FireBase;
