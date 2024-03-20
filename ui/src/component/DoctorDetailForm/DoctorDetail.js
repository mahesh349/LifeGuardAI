import React, { useContext, useEffect, useState } from 'react';
import '../PatientDetailForm/patientDetail.css';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import Grid from '@mui/material/Grid';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import toast, { Toaster } from 'react-hot-toast';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../firebase/Auth';

export default function DoctorDetail() {
	const [formData, setFormData] = useState({});
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

	const handleInputChange = (e) => {
		// Update the form data in the state when input values change
		const { id, value } = e.target;
		if (id === 'smoke' || id === 'alcohol') {
			setFormData({ ...formData, [id]: parseInt(value) });
		} else {
			setFormData({ ...formData, [id]: value });
		}

		setFormData({
			...formData,
			[e.target.id]: e.target.value,
		});
	};

	const handledateselection = (value, id) => {
		setFormData({
			...formData,
			[id]: value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log(formData);
		if (!formData.firstName) {
			toast.error('First Name is required');
			return;
		}

		try {
			const response = await fetch('http://localhost:3002/doctors', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formData),
			});

			if (response.ok) {
				toast.success('Successfully submitted!');
				console.log('success adding it to database.');
				navigate('/doctorDashboard');
			} else {
				console.error('Error submitting form data');
			}
		} catch (error) {
			console.error('Error:', error);
		}
	};
	const inputSx = { width: '80%' };

	if (!currentUser) {
		return <Navigate to={`/`} />;
	}

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
						label="First Name "
						defaultValue={formData['firstName'] || ''}
						onChange={handleInputChange}
						required
					/>
				</Grid>
				<Grid item xs={6}>
					<TextField
						id="middleName"
						label="Middle Name"
						defaultValue={formData['middleName'] || ''}
						onChange={handleInputChange}
						required
					/>
				</Grid>
				<Grid item xs={6}>
					<TextField
						id="lastName"
						label="Last Name"
						defaultValue={formData['lastName'] || ''}
						onChange={handleInputChange}
						required
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
						id="age"
						label="Age"
						type="number"
						InputLabelProps={{
							shrink: true,
						}}
						defaultValue={formData['age'] || ''}
						onChange={handleInputChange}
						required
					/>
				</Grid>
				<Grid item xs={6}>
					<TextField
						id="gender"
						label="Gender"
						defaultValue={formData['gender'] || ''}
						onChange={handleInputChange}
						required
					/>
				</Grid>
			</Grid>
			<br />
			<h3>Licence Details:</h3>
			<br />
			<Grid container spacing={2}>
				<Grid item xs={6}>
					<TextField
						id="licenceNumber"
						label="Licence Numner"
						defaultValue={formData['licenceNumber'] || ''}
						onChange={handleInputChange}
						required
					/>
				</Grid>
				<Grid item xs={6}>
					<DatePicker
						label="Licence Issue Date"
						onChange={(value) => handledateselection(value, 'licenceIssueDate')}
						id="licenceIssueDate"
						required
					/>
				</Grid>
				<Grid item xs={6}>
					<DatePicker
						label="Licence Expiration Date"
						onChange={(value) =>
							handledateselection(value, 'licenceExpirationDate')
						}
						id="licenceExpirationDate"
						required
					/>
				</Grid>
			</Grid>
			<br />
			<br />
			<Grid item xs={12}>
				<Button type="submit" variant="contained" className="buttons">
					Submit
				</Button>
			</Grid>
		</Box>
	);
}
