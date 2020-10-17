const express = require('express');
const bodyParser = require('body-parser');

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

// Routes will always go here 
app.use('/some', require('./routes/some'));

app.use(errorHandlingMiddleware);
// Do not change order above this

app.listen(8607);

console.log('Server started on port 8607');
