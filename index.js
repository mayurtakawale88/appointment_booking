const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const admin = require('firebase-admin');
const serviceAccount = require('./firebase.json');
const config = require('config');

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: `https://${config.get('db.firebase.project-id')}.firebaseio.com`,
	authDomain: `${config.get('db.firebase.project-id')}.firebaseapp.com`,
});

global.db = admin.database();

const { 
	errorHandlingMiddleware, 
	responseMiddleware, 
	requestMiddleware, 
} = require('./middleware');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: true }));

// Do not change order below this
app.use(requestMiddleware);

app.use(responseMiddleware);

// Routes will always go here 
app.use('/api', require('./routes/main'));

app.use(errorHandlingMiddleware);
// Do not change order above this

app.listen(8607);

console.log('Server started on port 8607');
