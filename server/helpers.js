// First name, middle name, last name, age, gender, height, smoke, alcohol, activity, allergies, symptoms, other complaints, medications, recent visits, doctor
// contact: {address line, address line 2, city, zipcode, state, contact number}
// emergency contact: {name, contact number}
// insurance: {member id, group number, plan type, primary care provider}
// health data:{  date:  {weight, systolic-blood-pressure, diastolic-blood-pressure, cholesterole, glucose} }

function First_Name(FirstName) {
	const trimmedFirstName = (FirstName || '').trim().toLowerCase();
	const symbolRegex = /[!@#$%^&*(),.?":{}|<>]/;
	const numberRegex = /\d/;

	if (!trimmedFirstName) {
		throw new Error('Input First Name is empty or not a string');
	}

	if (
		symbolRegex.test(trimmedFirstName) ||
		numberRegex.test(trimmedFirstName)
	) {
		throw new Error('Invalid input: contains symbols or numbers in first name');
	}
}

function Last_Name(LastName) {
	const trimmedLastName = (LastName || '').trim().toLowerCase();
	const symbolRegex = /[!@#$%^&*(),.?":{}|<>]/;
	const numberRegex = /\d/;
	if (!trimmedLastName) {
		throw new Error('Input Last Name is empty or not a string');
	}

	if (symbolRegex.test(trimmedLastName) || numberRegex.test(trimmedLastName)) {
		throw new Error('Invalid input: contains symbols or numbers in last name');
	}
}

function Middle_Name(MiddleName) {
	const trimmedMiddleName = (MiddleName || '').trim().toLowerCase();
	const symbolRegex = /[!@#$%^&*(),.?":{}|<>]/;
	const numberRegex = /\d/;

	if (!trimmedMiddleName) {
		throw new Error('Input Middle Name is empty or not a string');
	}

	if (
		symbolRegex.test(trimmedMiddleName) ||
		numberRegex.test(trimmedMiddleName)
	) {
		throw new Error(
			'Invalid input: contains symbols or numbers in middle name'
		);
	}
}

function Patient_Age(Age) {
	if (typeof Age !== 'number' || Age <= 0 || Age > 999) {
		throw new Error('Invalid age input');
	}
}

function Patient_Gender(Gender) {
	const LowerGender = (Gender || '').trim().toLowerCase();
	const validGenders = ['male', 'female'];

	if (
		!LowerGender ||
		/[!@#$%^&*(),.?":{}|<>]/.test(LowerGender) ||
		/\d/.test(LowerGender)
	) {
		throw new Error('Invalid gender input');
	}

	if (validGenders.includes(LowerGender)) {
		return true;
	} else {
		throw new Error('Invalid gender');
	}
}

function Patient_Height(Height) {
	if (typeof Height !== 'number') {
		throw `Invalid height input`;
	}
}

function Patient_Smoke(Smoke) {
	const TSmoke = (Smoke || '').trim().toLowerCase();

	if (!TSmoke || /[!@#$%^&*(),.?":{}|<>]/.test(TSmoke) || /\d/.test(TSmoke)) {
		throw new Error('Invalid input at smoke');
	}

	if (TSmoke !== 'no' && TSmoke !== 'yes') {
		throw new Error('Please enter only Yes or No answer for smoke');
	}
}

function Patient_Alcohol(Alcohol) {
	const TAlcohol = (Alcohol || '').trim().toLowerCase();

	if (
		!TAlcohol ||
		/[!@#$%^&*(),.?":{}|<>]/.test(TAlcohol) ||
		/\d/.test(TAlcohol)
	) {
		throw new Error('Invalid input for alcohol');
	}

	if (TAlcohol !== 'yes' && TAlcohol !== 'no') {
		throw new Error('Please give a Yes or No answer for alcohol');
	}
}

function Patient_Allergies(allergies) {
	const TAllergies = (allergies || '').trim().toLowerCase();

	if (
		!TAllergies ||
		/[!@#$%^&*(),.?":{}|<>]/.test(TAllergies) ||
		/\d/.test(TAllergies)
	) {
		throw new Error('Invalid Allergie Input');
	}
}

function Patient_Activity(Activity) {
	const TActivity = (Activity || '').trim();

	if (!TActivity) {
		throw new Error('Input is not a valid non-empty string');
	}
}

const IsValidString = (string, parameter) => {
	if (
		!string ||
		typeof string !== 'string' ||
		(string = string.trim()).length === 0
	) {
		throw new Error(`Invalid ${parameter}: ${string || 'empty string'}`);
	}
	return string;
};

const IsValidEmail = (email) => {
	email = IsValidString(email, 'Email');
	if (!email.match(/^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/g))
		throw new Error('Invalid Email');
	return email.toLowerCase();
};

module.exports = {
	IsValidString,
	IsValidEmail,
	Patient_Activity,
	Patient_Allergies,
	Patient_Alcohol,
	Patient_Smoke,
	Patient_Height,
	Patient_Gender,
	Patient_Age,
	Middle_Name,
	Last_Name,
	First_Name,
};
