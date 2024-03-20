const patientsRoutes = require('./patients');
const doctorsRoutes = require('./doctors');

const constructorMethod = (app) => {
	app.use('/patients', patientsRoutes);
	app.use('/doctors', doctorsRoutes);

	app.use('*', (req, res) => {
		res.sendStatus(404);
	});
};

module.exports = constructorMethod;
