import {
	Box,
	Button,
	Container,
	FormControl,
	FormHelperText,
	Grid,
	InputLabel,
	MenuItem,
	Select,
	TextField,
	Typography,
	styled,
} from '@mui/material';
import React, { useState } from 'react';
import Navbar from '../Navbar';
import ReportModal from './Report';
import { useNavigate } from 'react-router-dom';

const Prediction = () => {
	const [formData, setFormData] = useState({
		fullName: '',
		age: '',
		gender: '',
		height: '',
		weight: '',
		ap_hi: '',
		ap_lo: '',
		cholesterol: '',
		gluc: '',
		smoke: '',
		alco: '',
		active: '',
	});
	const navigate = useNavigate();

	// const FormContainer = styled('form')({
	// 	'& .MuiTextField-root': {
	// 		margin: (theme) => theme.spacing(2),
	// 		width: '25ch',
	// 	},
	// });

	const clearForm = () => {
		setFormData({
			age: '',
			gender: '',
			height: '',
			weight: '',
			ap_hi: '',
			ap_lo: '',
			cholesterol: '',
			gluc: '',
			smoke: '',
			alco: '',
			active: '',
			fullName: '',
		});
	};
	const [prediction, setPrediction] = useState(null);
	const [isModalOpen, setModalOpen] = useState(false);
	const [reportData, setReportData] = useState(null);
	const [formErrors, setFormErrors] = useState({});

	const validate = (name, value) => {
		let error = '';
		switch (name) {
			case 'age':
				if (value < 0 || value > 150) error = 'Age must be between 0 and 150';
				break;
			case 'height':
				if (value < 0 || value > 250) error = 'Height must be valid in cms';
				break;
			case 'weight':
				if (value < 0 || value > 200) error = 'Weight must be valid in kgs';
				break;
			case 'ap_hi':
				if (value < 0 || value > 200)
					error = 'Systolic pressure must be between 0 and 200 mm Hg';
				break;
			case 'ap_lo':
				if (value < 0 || value > 200)
					error = 'Diastolic pressure must be between 0 and 200 mm Hg';
				break;
			// Add cases for other fields if necessary
			default:
				error = null;
		}
		return error;
	};

	const handleInputChange = (e) => {
		const { name, value, type } = e.target;
		const error = validate(name, value);
		setFormErrors({ ...formErrors, [name]: error });
		setFormData({
			...formData,
			[name]: type === 'number' ? parseFloat(value, 10) : value,
		});
	};
	const handleSubmit = async (e) => {
		console.log(formData, 'formData');
		e.preventDefault();
		try {
			const response = await fetch('http://127.0.0.1:5000/predict', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formData),
			});
			console.log(response, 'resp');

			if (response.ok) {
				const result = await response.json();

				clearForm();
				setReportData({
					age: formData.age,
					gender: formData.gender,
					height: formData.height,
					weight: formData.weight,
					ap_hi: formData.ap_hi,
					ap_lo: formData.ap_lo,
					cholesterol: formData.cholesterol,
					gluc: formData.gluc,
					smoke: formData.smoke,
					alco: formData.alco,
					active: formData.active,
					probability: result.probability,
					fullName: formData.fullName,
					prediction: result.prediction,
				});
				setModalOpen(true);
				setPrediction(result.prediction);
			} else {
				console.error('Error:', response.statusText);
			}
		} catch (error) {
			console.error('Error:', error.message);
		}
	};

	const handleBack = () => {
		navigate('/doctorDashboard');
	};
	const handleCloseModal = () => {
		setModalOpen(false); // This will close the modal
	};
	return (
		<Box
			component="form"
			noValidate
			autoComplete="off"
			onSubmit={handleSubmit}
			error={!!formErrors['age']}
		>
			<Navbar />
			<Typography variant="h4" gutterBottom sx={{ mt: 2 }}>
				Cardio Vascular Disorder Prediction
			</Typography>
			<Grid container spacing={3} sx={{ p: 2 }}>
				<Grid item xs={12} md={6}>
					<TextField
						id="fullName"
						fullWidth
						label="Full Patient Name"
						variant="outlined"
						name="fullName"
						value={formData.fullName}
						onChange={handleInputChange}
						required
					/>
				</Grid>
				<Grid item xs={12} md={6}>
					<TextField
						label="Age"
						name="age"
						variant="outlined"
						fullWidth
						type="number"
						value={formData.age}
						onChange={handleInputChange}
					/>
					{formErrors['age'] && (
						<FormHelperText>{formErrors['age']}</FormHelperText>
					)}
				</Grid>
				<Grid item xs={12} md={6}>
					<FormControl fullWidth>
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
				<Grid item xs={12} md={6}>
					<TextField
						id="height"
						label="Height"
						name="height"
						type="number"
						placeholder="Height should be in cms"
						fullWidth
						InputLabelProps={{
							shrink: true,
						}}
						value={formData.height}
						onChange={handleInputChange}
					/>
					{formErrors['height'] && (
						<FormHelperText>{formErrors['height']}</FormHelperText>
					)}
				</Grid>
				<Grid item xs={12} md={6}>
					<TextField
						id="weight"
						label="Weight"
						name="weight"
						type="number"
						fullWidth
						placeholder="weight should be in Kgs"
						InputLabelProps={{
							shrink: true,
						}}
						value={formData.weight}
						onChange={handleInputChange}
					/>
					{formErrors['weight'] && (
						<FormHelperText>{formErrors['weight']}</FormHelperText>
					)}
				</Grid>
				<Grid item xs={12} md={6}>
					<FormControl fullWidth>
						<InputLabel id="demo-simple-select-label">Smoke</InputLabel>
						<Select
							id="demo-simple-select"
							label="Smoke"
							onChange={handleInputChange}
							value={formData.smoke != null ? formData.smoke : ''}
							displayEmpty
							name="smoke"
							sx={{ textAlign: 'left' }}
						>
							<MenuItem value={1}>Yes</MenuItem>
							<MenuItem value={0}>No</MenuItem>
						</Select>
					</FormControl>
				</Grid>
				<Grid item xs={12} md={6}>
					<FormControl fullWidth>
						<InputLabel id="demo-simple-select-label">Alcohol</InputLabel>
						<Select
							id="demo-simple-select"
							label="alcohol"
							onChange={handleInputChange}
							value={formData.alco != null ? formData.alco : ''}
							displayEmpty
							name="alco"
							sx={{ textAlign: 'left' }}
						>
							<MenuItem value={1}>Yes</MenuItem>
							<MenuItem value={0}>No</MenuItem>
						</Select>
					</FormControl>
				</Grid>
				<Grid item xs={12} md={6}>
					<FormControl fullWidth>
						<InputLabel id="active">Activity</InputLabel>
						<Select
							id="active"
							label="activity"
							onChange={handleInputChange}
							value={formData.active != null ? formData.active : ''}
							displayEmpty
							sx={{ textAlign: 'left' }}
							name="active"
						>
							<MenuItem value={1}>High</MenuItem>
							<MenuItem value={0}>Low</MenuItem>
						</Select>
					</FormControl>
				</Grid>
				<Grid item xs={12} md={6}>
					<FormControl fullWidth>
						<InputLabel id="cholesterol">Cholesterol</InputLabel>
						<Select
							id="cholesterol"
							label="cholesterol"
							placeholder="Your cholesterol level"
							onChange={handleInputChange}
							value={formData.cholesterol != null ? formData.cholesterol : ''}
							displayEmpty
							name="cholesterol"
							sx={{ textAlign: 'left' }}
						>
							<MenuItem value={3}>High</MenuItem>
							<MenuItem value={2}>Medium</MenuItem>
							<MenuItem value={1}>Low</MenuItem>
							<MenuItem value={0}>No</MenuItem>
						</Select>
					</FormControl>
				</Grid>
				<Grid item xs={12} md={6}>
					<TextField
						id="ap_hi"
						label="Systolic blood pressure"
						name="ap_hi"
						type="number"
						fullWidth
						InputLabelProps={{
							shrink: true,
						}}
						value={formData.ap_hi}
						onChange={handleInputChange}
					/>
					{formErrors['ap_hi'] && (
						<FormHelperText>{formErrors['ap_hi']}</FormHelperText>
					)}
				</Grid>
				<Grid item xs={12} md={6}>
					<TextField
						label="Diastolic Blood pressure"
						name="ap_lo"
						variant="outlined"
						fullWidth
						type="number"
						value={formData.ap_lo}
						onChange={handleInputChange}
					/>
					{formErrors['ap_lo'] && (
						<FormHelperText>{formErrors['ap_lo']}</FormHelperText>
					)}
				</Grid>
			</Grid>
			<Grid item xs={12} md={6}>
				<FormControl fullWidth>
					<InputLabel id="gluc">Glucose</InputLabel>
					<Select
						id="gluc"
						label="glucose"
						placeholder="Your glucose level"
						onChange={handleInputChange}
						value={formData.gluc || ''}
						name="gluc"
						displayEmpty
						sx={{ textAlign: 'left' }}
					>
						<MenuItem value={3}>High</MenuItem>
						<MenuItem value={2}>Medium</MenuItem>
						<MenuItem value={1}>Low</MenuItem>
					</Select>
				</FormControl>
			</Grid>
			<Box type="submit" variant="contained" color="primary">
				<Button
					type="submit"
					variant="contained"
					color="primary"
					sx={{ mt: 2, ml: 2 }}
				>
					Predict
				</Button>
			</Box>
			<Button
				variant="outlined"
				color="primary"
				sx={{ mt: 2, ml: 2 }}
				onClick={handleBack}
			>
				Back
			</Button>
			<ReportModal
				open={isModalOpen}
				onClose={handleCloseModal}
				data={reportData}
			/>
		</Box>
	);
};

export default Prediction;
