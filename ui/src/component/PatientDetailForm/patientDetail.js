import React, { useContext, useEffect, useState } from 'react';
import '../PatientDetailForm/patientDetail.css';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useNavigate, useParams } from 'react-router-dom';
import {
	Button,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import toast, { Toaster } from 'react-hot-toast';
import { AuthContext } from '../../firebase/Auth';
import axios from 'axios';
import Navbar from '../Navbar';

export default function PatientDetail() {
	const { email } = useParams();
	const [formData, setFormData] = useState({
		firstName: '',
		lastName: '',
		middleName: '',
		emailId: '',
		age: '',
		gender: null,
		height: '',
		smoke: null,
		alcohol: null,
		activity: null,
		allergies: '',
		cholestrol: null,
		glucose: null,
		symptoms: '',
		other_complaints: '',
		medications: '',
		contact_address_line: '',
		contact_address_line_2: '',
		contact_city: '',
		contact_zip_code: '',
		contact_state: '',
		contact_number: '',
		emergencey_contact_number: '',
		emergencey_contact_name: '',
		insurrance_member_id: '',
		insurrance_group_number: '',
		insurrance_plan_type: '',
		insurrance_primarycare_provider: '',
	});
	const { currentUser } = useContext(AuthContext);
	const navigate = useNavigate();

	useEffect(() => {
		if (currentUser) {
			console.log('in useeffect doctordetail');
			setFormData({
				...formData,
				emailId: currentUser?.email,
			});
		}
	}, [currentUser]);

	useEffect(() => {
		const fetchPatientDetails = async () => {
			try {
				const url = `http://localhost:3002/patients/${email}`;
				const res = await axios.get(url);
				setFormData(res.data);
			} catch (error) {
				console.error(error);
			}
		};
		fetchPatientDetails();
	}, [email]);

	const clearForm = () => {
		setFormData({
			firstName: '',
			lastName: '',
			middleName: '',
			emailId: '',
			age: '',
			gender: null,
			height: '',
			smoke: null,
			alcohol: null,
			activity: null,
			allergies: '',
			cholestrol: null,
			glucose: null,
			symptoms: '',
			other_complaints: '',
			medications: '',
			contact_address_line: '',
			contact_address_line_2: '',
			contact_city: '',
			contact_zip_code: '',
			contact_state: '',
			contact_number: '',
			emergencey_contact_number: '',
			emergencey_contact_name: '',
			insurrance_member_id: '',
			insurrance_group_number: '',
			insurrance_plan_type: '',
			insurrance_primarycare_provider: '',
		});
	};
	const handleInputChange = (e) => {
		// Update the form data in the state when input values change
		const { name, value } = e.target;
		let { type } = e.target;
		setFormData({
			...formData,
			// [name]: type === 'number' ? parseInt(value, 10) : value,
			[name]: value,
		});
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		// if (!formData.firstName || !formData.emailId) {
		// 	console.log('did it come herer?');
		// 	toast.error('Please fill the required fields');
		// 	return;
		// }

		try {
			console.log(formData, 'payload');
			const response = await fetch('http://localhost:3002/patients', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formData),
			});

			console.log(response);
			if (response.ok) {
				toast.success('Successfully submitted!');
				clearForm();
				console.log('Form data submitted successfully');
				navigate('/patientDashboard');
			} else {
				const errorData = await response.json();
				toast.error(`Error: ${errorData.error}`);
				console.error('Error submitting form data:', errorData.error);
			}
		} catch (error) {
			toast.error(`Error: ${error.message}`);
			console.error('Error:', error);
		}
	};
	const inputSx = { width: '80%' };

	return (
		<Box
			component="form"
			sx={{
				'& .MuiTextField-root': { m: 1, ...inputSx }, // Apply width to text fields
				'& .MuiSelect-root': { ...inputSx }, // Apply width to the Select component
			}}
			noValidate
			autoComplete="off"
			onSubmit={handleSubmit}
		>
			<div>
				<Toaster />
			</div>
			<Grid container spacing={2}>
				<Grid item xs={6}>
					<TextField
						id="firstName"
						label="First Name"
						name="firstName"
						value={formData.firstName}
						onChange={handleInputChange}
						required
					/>
				</Grid>
				<Grid item xs={6}>
					<TextField
						name="middleName"
						label="Middle Name"
						value={formData.middleName}
						onChange={handleInputChange}
					/>
				</Grid>
				<Grid item xs={6}>
					<TextField
						name="lastName"
						label="Last Name"
						defaultValue={formData['lastName'] || ''}
						onChange={handleInputChange}
					/>
				</Grid>
				<Grid item xs={6}>
					<TextField
						id="emailId"
						label="Email Id "
						defaultValue={currentUser?.email}
						onChange={handleInputChange}
						required
					/>
				</Grid>
				<Grid item xs={6}>
					<TextField
						name="age"
						label="Age"
						type="number"
						InputLabelProps={{
							shrink: true,
						}}
						value={formData.age}
						onChange={handleInputChange}
						required
					/>
				</Grid>
				{/* <Grid item xs={6}>
					<TextField
						id="gender"
						label="Gender"
						value={}''}
						onChange={handleInputChange}
						required
					/>
				</Grid> */}
				<Grid item xs={6}>
					<FormControl sx={{ minWidth: '80%' }}>
						<InputLabel id="gender">Gender</InputLabel>
						<Select
							id="demo-simple-select"
							label="Gender"
							onChange={handleInputChange}
							value={formData.gender || ''}
							name="gender"
							sx={{ textAlign: 'left' }}
						>
							<MenuItem value={1}>Male</MenuItem>
							<MenuItem value={2}>Female</MenuItem>
						</Select>
					</FormControl>
				</Grid>
				<Grid item xs={6}>
					<TextField
						id="height"
						label="Height"
						name="height"
						type="number"
						placeholder="Height should be in cms"
						InputLabelProps={{
							shrink: true,
						}}
						value={formData.height}
						onChange={handleInputChange}
					/>
				</Grid>
				<Grid item xs={6}>
					<FormControl sx={{ minWidth: '80%' }}>
						<InputLabel id="demo-simple-select-label">Smoke</InputLabel>
						<Select
							id="demo-simple-select"
							label="Smoke"
							onChange={handleInputChange}
							sx={{ textAlign: 'left' }}
							value={formData.smoke != null ? formData.smoke : ''}
							name="smoke"
						>
							<MenuItem value={1}>Yes</MenuItem>
							<MenuItem value={0}>No</MenuItem>
						</Select>
					</FormControl>
				</Grid>
				<Grid item xs={6}>
					<FormControl sx={{ minWidth: '80%' }}>
						<InputLabel id="demo-simple-select-label">Alcohol</InputLabel>
						<Select
							id="demo-simple-select"
							label="alcohol"
							onChange={handleInputChange}
							sx={{ textAlign: 'left' }}
							value={formData.alcohol != null ? formData.alcohol : ''}
							name="alcohol"
						>
							<MenuItem value={1}>Yes</MenuItem>
							<MenuItem value={0}>No</MenuItem>
						</Select>
					</FormControl>
				</Grid>
				<Grid item xs={6}>
					<FormControl sx={{ minWidth: '80%' }}>
						<InputLabel id="activity">Activity</InputLabel>
						<Select
							id="activity"
							label="activity"
							placeholder="If you do medium to less activity select Low otherwise select high"
							onChange={handleInputChange}
							sx={{ textAlign: 'left' }}
							value={formData.activity != null ? formData.activity : ''}
							name="activity"
						>
							<MenuItem value={1}>High</MenuItem>
							<MenuItem value={0}>Low</MenuItem>
						</Select>
					</FormControl>
				</Grid>
				<Grid item xs={6}>
					<FormControl sx={{ minWidth: '80%' }}>
						<InputLabel id="cholestrol">Cholesterol</InputLabel>
						<Select
							id="cholestrol"
							label="cholestrol"
							placeholder="Your cholestrol level"
							onChange={handleInputChange}
							sx={{ textAlign: 'left' }}
							value={formData.cholestrol != null ? formData.cholestrol : ''}
							name="cholestrol"
						>
							<MenuItem value={3}>High</MenuItem>
							<MenuItem value={2}>Medium</MenuItem>
							<MenuItem value={1}>Low</MenuItem>
							<MenuItem value={0}>No</MenuItem>
						</Select>
					</FormControl>
				</Grid>
				<Grid item xs={6}>
					<FormControl sx={{ minWidth: '80%' }}>
						<InputLabel id="glucose">Glucose</InputLabel>
						<Select
							id="glucose"
							label="glucose"
							placeholder="Your glucose level"
							onChange={handleInputChange}
							sx={{ textAlign: 'left' }}
							value={formData.glucose != null ? formData.glucose : ''}
							name="glucose"
						>
							<MenuItem value={3}>High</MenuItem>
							<MenuItem value={2}>Medium</MenuItem>
							<MenuItem value={1}>Low</MenuItem>
						</Select>
					</FormControl>
				</Grid>
				{/* <Grid item xs={6}>
					<TextField
						id="activity"
						label="Activity"
						value={}| ''}
						onChange={handleInputChange}
					/>
				</Grid> */}
				<Grid item xs={6}>
					<TextField
						id="allergies"
						name="allergies"
						label="Allergies"
						value={formData.allergies}
						onChange={handleInputChange}
					/>
				</Grid>
				<Grid item xs={6}>
					<TextField
						id="symptoms"
						name="symptoms"
						label="Symtoms"
						value={formData.symptoms}
						onChange={handleInputChange}
					/>
				</Grid>
				<Grid item xs={6}>
					<TextField
						name="other_complaints"
						label="Other Complaints"
						value={formData.other_complaints}
						onChange={handleInputChange}
					/>
				</Grid>
				<Grid item xs={6}>
					<TextField
						name="medications"
						label="Medications"
						value={formData.medications}
						onChange={handleInputChange}
					/>
				</Grid>
			</Grid>
			<br />
			<h3>Contact Information:</h3>
			<br />
			<Grid container spacing={2}>
				<Grid item xs={6}>
					<TextField
						name="contact_address_line"
						label="Address Line"
						value={formData.contact_address_line}
						onChange={handleInputChange}
					/>
				</Grid>
				<Grid item xs={6}>
					<TextField
						name="contact_address_line_2"
						label="Address Line 2"
						value={formData.contact_address_line_2}
						onChange={handleInputChange}
					/>
				</Grid>
				<Grid item xs={6}>
					<TextField
						name="contact_city"
						label="City"
						value={formData.contact_city}
						onChange={handleInputChange}
					/>
				</Grid>
				<Grid item xs={6}>
					<TextField
						name="contact_zip_code"
						label="ZipCode"
						value={formData.contact_zip_code}
						onChange={handleInputChange}
					/>
				</Grid>
				<Grid item xs={6}>
					<TextField
						name="contact_state"
						label="State"
						value={formData.contact_state}
						onChange={handleInputChange}
					/>
				</Grid>
				<Grid item xs={6}>
					<TextField
						name="contact_number"
						label="Contact Numner"
						value={formData.contact_number}
						onChange={handleInputChange}
					/>
				</Grid>
			</Grid>
			<br />
			<h3>Emergency Contact:</h3>
			<br />
			<Grid container spacing={2}>
				<Grid item xs={6}>
					<TextField
						name="emergencey_contact_number"
						label="Emergencey Contact Number"
						value={formData.emergencey_contact_number}
						onChange={handleInputChange}
					/>
				</Grid>
				<Grid item xs={6}>
					<TextField
						name="emergencey_contact_name"
						label="Emergency Contact Name"
						value={formData.emergencey_contact_name}
						onChange={handleInputChange}
					/>
				</Grid>
			</Grid>
			<br />
			<h3>Insurance Details:</h3>
			<br />
			<Grid container spacing={2}>
				<Grid item xs={6}>
					<TextField
						name="insurrance_member_id"
						label="Insurance MemberId"
						value={formData.insurrance_member_id}
						onChange={handleInputChange}
					/>
				</Grid>
				<Grid item xs={6}>
					<TextField
						name="insurrance_group_number"
						label="Insurance Group No"
						value={formData.insurrance_group_number}
						onChange={handleInputChange}
					/>
				</Grid>
				<Grid item xs={6}>
					<TextField
						name="insurrance_plan_type"
						label="Insurance Plan Type"
						value={formData.insurrance_plan_type}
						onChange={handleInputChange}
					/>
				</Grid>
				<Grid item xs={6}>
					<TextField
						name="insurrance_primarycare_provider"
						label="Care Provider"
						value={formData.insurrance_primarycare_provider}
						onChange={handleInputChange}
					/>
				</Grid>
				<br />
				<br />
				<Grid item xs={12}>
					<Button type="submit" variant="contained" className="buttons">
						Submit
					</Button>
				</Grid>
			</Grid>
		</Box>
	);
}
