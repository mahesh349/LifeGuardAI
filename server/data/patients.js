const mongoCollections = require('../config/mongocollections');
const patients = mongoCollections.patients;

const createPatient = async (
	firstName,
	middleName,
	lastName,
	emailId,
	age,
	gender,
	height,
	smoke,
	alcohol,
	activity,
	allergies,
	cholestrol,
	glucose,
	symptoms,
	other_complaints,
	medications,
	contact_address_line,
	contact_address_line_2,
	contact_city,
	contact_zip_code,
	contact_state,
	contact_number,
	emergencey_contact_number,
	emergencey_contact_name,
	insurrance_member_id,
	insurrance_group_number,
	insurrance_plan_type,
	insurrance_primarycare_provider
) => {
	//validation done

	const patientsCollection = await patients();

	let newPatient = {
		firstName: firstName,
		middleName: middleName,
		lastName: lastName,
		emailId: emailId,
		age: age,
		gender: gender,
		height: height,
		smoke: smoke,
		alcohol: alcohol,
		activity: activity,
		allergies: allergies,
		cholestrol: cholestrol,
		glucose: glucose,
		symptoms: symptoms,
		other_complaints: other_complaints,
		medications: medications,
		recent_visits: [], // no need to send i will initialize it here
		doctor: [], // no need to send i will initialize it here
		contact_address_line: contact_address_line,
		contact_address_line_2: contact_address_line_2,
		contact_city: contact_city,
		contact_zip_code: contact_zip_code,
		contact_state: contact_state,
		contact_number: contact_number,
		emergencey_contact_number: emergencey_contact_number,
		emergencey_contact_name: emergencey_contact_name,
		insurrance_member_id: insurrance_member_id,
		insurrance_group_number: insurrance_group_number,
		insurrance_plan_type: insurrance_plan_type,
		insurrance_primarycare_provider: insurrance_primarycare_provider,
	};

	const insertInfo = await patientsCollection.insertOne(newPatient);

	if (!insertInfo.acknowledged || !insertInfo.insertedId) {
		throw 'could not add patient';
	}

	return insertInfo.insertedId.toString();
};

const getAllPatients = async () => {
	const patientsCollection = await patients();
	const allPatients = await patientsCollection.find({}).toArray();
	if (!allPatients) {
		throw "can't fetch all movies";
	}

	allPatients.forEach((element) => {
		element._id = element._id.toString();
	});

	return allPatients;
};

const checkPatientProfile = async (email) => {
	const patientsCollection = await patients();
	const patient = await patientsCollection.findOne({ emailId: email });
	if (patient) {
		return true;
	} else {
		return false;
	}
};

const getPatientById = async (email) => {
	const patientsCollection = await patients();
	const patient = await patientsCollection.findOne({ emailId: email });
	if (patient) {
		return patient;
	} else {
		throw 'No Patient found';
	}
};

const updatePatient = async (
	email,
	firstName,
	middleName,
	lastName,
	emailId,
	age,
	gender,
	height,
	smoke,
	alcohol,
	activity,
	allergies,
	cholestrol,
	glucose,
	symptoms,
	other_complaints,
	medications,
	contact_address_line,
	contact_address_line_2,
	contact_city,
	contact_zip_code,
	contact_state,
	contact_number,
	emergencey_contact_number,
	emergencey_contact_name,
	insurrance_member_id,
	insurrance_group_number,
	insurrance_plan_type,
	insurrance_primarycare_provider
) => {
	const patientsCollection = await patients();
	console.log();
	const patient = await patientsCollection.findOne({ emailId: email });
	const updatedPatient = {
		firstName: firstName,
		middleName: middleName,
		lastName: lastName,
		emailId: emailId,
		age: age,
		gender: gender,
		height: height,
		smoke: smoke,
		alcohol: alcohol,
		activity: activity,
		allergies: allergies,
		cholestrol: cholestrol,
		glucose: glucose,
		symptoms: symptoms,
		other_complaints: other_complaints,
		medications: medications,
		// recent_visits: [], // no need to send i will initialize it here
		// doctor: [], // no need to send i will initialize it here
		contact_address_line: contact_address_line,
		contact_address_line_2: contact_address_line_2,
		contact_city: contact_city,
		contact_zip_code: contact_zip_code,
		contact_state: contact_state,
		contact_number: contact_number,
		emergencey_contact_number: emergencey_contact_number,
		emergencey_contact_name: emergencey_contact_name,
		insurrance_member_id: insurrance_member_id,
		insurrance_group_number: insurrance_group_number,
		insurrance_plan_type: insurrance_plan_type,
		insurrance_primarycare_provider: insurrance_primarycare_provider,
	};
	const updateInfo = await patientsCollection.findOneAndUpdate(
		{ emailId: email },
		{ $set: updatedPatient },
		{ returnDocument: 'after' }
	);
	if (updateInfo.lastErrorObject === 0)
		throw [404, `Error: Update failed, could not find a user with id`];
};

module.exports = {
	createPatient,
	getAllPatients,
	checkPatientProfile,
	getPatientById,
	updatePatient,
};
