const express = require('express');
const router = express.Router();
const data = require('../data');
const doctorsData = data.doctors;
const helpers = require('../helpers');

router
	.route('/')
	.get(async (req, res) => {
		try {
			let doctorsList = await doctorsData.getAllDoctors();
			res.json(doctorsList);
		} catch (e) {
			res.sendStatus(500);
		}
	})
	.post(async (req, res) => {
		let doctorInfo = req.body;

		try {
			const newDoctor = await doctorsData.createDoctor(
				doctorInfo.firstName,
				doctorInfo.middleName,
				doctorInfo.lastName,
				doctorInfo.emailId,
				doctorInfo.age,
				doctorInfo.gender,
				doctorInfo.licenceNumber,
				doctorInfo.licenceIssueDate,
				doctorInfo.licenceExpirationDate
			);
			res.json(newDoctor);
		} catch (e) {
			res.sendStatus(500);
		}
	});

router.route('/:emailId').get(async (req, res) => {
	try {
		if (!req.params.emailId) throw 'you must provide movieID';
		req.params.emailId = helpers.IsValidEmail(req.params.emailId);
	} catch (e) {
		return res.status(400).json({ error: e });
	}
	try {
		let val = await doctorsData.checkDoctorProfile(req.params.emailId);
		res.json(val);
	} catch (e) {
		res.status(404).json({ error: 'Doctor not found' });
	}
});
module.exports = router;
