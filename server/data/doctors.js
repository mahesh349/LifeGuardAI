const mongoCollections = require('../config/mongocollections');
const doctors = mongoCollections.doctors;

const createDoctor = async (
	firstName,
	middleName,
	lastName,
	emailId,
	age,
	gender,
	licenceNumber,
	licenceIssueDate,
	licenceExpirationDate
) => {
	//validation done

	const doctorsCollection = await doctors();

	let newDoctor = {
		firstName: firstName,
		middleName: middleName,
		lastName: lastName,
		emailId: emailId,
		age: age,
		gender: gender,
		specialization: [],
		patients: [],
		workingOn: [],
		licenceNumber: licenceNumber,
		licenceIssueDate: licenceIssueDate,
		licenceExpirationDate: licenceExpirationDate,
	};

	const insertInfo = await doctorsCollection.insertOne(newDoctor);

	if (!insertInfo.acknowledged || !insertInfo.insertedId) {
		throw 'could not add patient';
	}

	return insertInfo.insertedId.toString();
};

const getAllDoctors = async () => {
	const doctorsCollection = await doctors();
	const allDoctors = await doctorsCollection.find({}).toArray();
	if (!allDoctors) {
		throw "can't fetch all movies";
	}

	allDoctors.forEach((element) => {
		element._id = element._id.toString();
	});

	return allDoctors;
};

const checkDoctorProfile = async (email) => {
	const doctorsCollection = await doctors();
	const doctor = await doctorsCollection.findOne({ emailId: email });
	if (doctor) {
		return true;
	} else {
		return false;
	}
};

module.exports = {
	createDoctor,
	getAllDoctors,
	checkDoctorProfile,
};
