const express = require('express');
const app = express();
const configRoutes = require('./routes');
const cors = require('cors');

app.use(express.json());
app.use(cors());

configRoutes(app);

if (require.main === module) {
	app.listen(3002, () => {
		console.log("We've now got a server!");
		console.log('Your routes will be running on http://localhost:3002');
	});
}

module.exports = app;
