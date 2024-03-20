import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../firebase/Auth';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../component/Navbar';
import { Toaster, toast } from 'react-hot-toast';
import {
	Avatar,
	Box,
	Button,
	Card,
	CardContent,
	CircularProgress,
	Grid,
	LinearProgress,
	Typography,
} from '@mui/material';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import CardMembershipIcon from '@mui/icons-material/CardMembership';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import PatientDetail from '../../component/PatientDetailForm/patientDetail';

export default function PatientDashboard() {
	const { currentUser } = useContext(AuthContext);
	const [hasProfile, setHasProfile] = useState(false);
	const [loading, setLoading] = useState(true);
	const [patientDetails, setPatientDetails] = useState();
	const navigate = useNavigate();
	const [val, setVal] = useState();

	const fetchData = async (email) => {
		try {
			const url = 'http://localhost:3002/patients/check' + email;
			let ans = await axios.get(url);
			console.log(email);
			console.log('*********************profile:- ', ans.data);
			setHasProfile(ans.data);
			setLoading(false);
		} catch (e) {
			console.error(e);
		}
	};

	const patientData = async (email) => {
		try {
			const url = 'http://localhost:3002/patients/' + email;
			let res = await axios.get(url);
			console.log(res, 'patientData');
			setLoading(false);
			setPatientDetails(res.data);
		} catch (e) {
			toast((t) => <span>You will have to fill your detail form</span>);
			setTimeout(() => {
				console.log('This will run after 1 second!');
			}, 1000);
			navigate('/PatientDetailsForm');
			console.log(e);
		}
	};

	useEffect(() => {
		console.log('in load');
		try {
			if (currentUser) {
				fetchData(currentUser?.email);
				patientData(currentUser?.email);
			}
		} catch (error) {
			<Navigate to={`/`} />;
		}
	}, [currentUser]);

	if (!currentUser) {
		return <Navigate to={`/`} />;
	}

	const MetricLine = ({ label, value, maxValue, color }) => {
		const [val, setVal] = useState('');
		const valuePercentage = (value / maxValue) * 100;
		useEffect(() => {
			// Set val based on conditions
			if (label === 'Blood Pressure') {
				setVal(`${value} mmHg`);
			} else {
				if (value === 1) setVal('low');
				else if (value === 2) setVal('Medium');
				else if (value === 3) setVal('High');
				else setVal('No');
			}
		}, [value, label]); // Only re-run the effect if value or maxValue changes
		return (
			<Box display="flex" alignItems="center" mb={2}>
				<Typography
					variant="subtitle2"
					component="span"
					sx={{ width: 100, mr: 2 }}
				>
					{label}
				</Typography>
				<Box width="100%" mr={1}>
					<LinearProgress
						variant="determinate"
						value={valuePercentage}
						sx={{
							height: 10,
							backgroundColor: '#ddd',
							'& .MuiLinearProgress-bar': { backgroundColor: color },
							boxShadow: 2,
						}}
						elevation={3}
					/>
				</Box>
				<Typography variant="subtitle2" component="span">
					{`${val}`}
				</Typography>
			</Box>
		);
	};

	const PatientDashboard = ({ patient }) => {
		const maxValues = {
			bloodPressure: 200, // Hypothetical max value for blood pressure
			glucose: 10, // Hypothetical max value for glucose
			cholesterol: 5, // Hypothetical max value for cholesterol
		};
		const navigate = useNavigate();
		const handleEditClick = (email) => {
			navigate(`/editPatient/${email}`);
		};
		return (
			<Box>
				<Card sx={{ margin: 2 }}>
					<CardContent>
						<Grid container spacing={2}>
							<Grid item xs={12} sm={6} md={3}>
								<Avatar sx={{ width: 56, height: 56 }}>P</Avatar>
							</Grid>
							<Grid item xs={12} sm={6} md={9}>
								<Typography variant="h5">{`${patient.firstName} ${patient.lastName}`}</Typography>
								<Typography variant="caption text">{`Age: ${patient.age}`}</Typography>
								<br />
								<Typography variant="caption text">{`Gender: ${
									patient.gender === 1 ? 'Male' : 'Female'
								}`}</Typography>
								<br />
								<Typography variant="caption text">{`Address: ${patient.contact_address_line} ${patient.contact_address_line_2} ${patient.contact_city}  ${patient.contact_state} ${patient.contact_zip_code} `}</Typography>
								{/* ...other personal details */}
							</Grid>
						</Grid>
						<Grid item xs={12} sm={6} md={3}>
							<Button onClick={() => handleEditClick(currentUser.email)}>
								Edit your details
							</Button>
						</Grid>
						<Box sx={{ marginTop: 2 }}>
							<Typography variant="h6">Health Metrics</Typography>
							<MetricLine
								label="Blood Pressure"
								value={120} // Your actual value here
								maxValue={maxValues.bloodPressure}
								color="#cc0000"
							/>
							<MetricLine
								label="Glucose"
								value={patient.glucose} // Your actual value here
								maxValue={maxValues.glucose}
								color="#82ca9d"
							/>
							<MetricLine
								label="Cholesterol"
								value={patient.cholestrol} // Your actual value here
								maxValue={maxValues.cholesterol}
								color="#ffc658"
							/>
							{/* </Grid> */}
						</Box>
						{/* Additional patient info and metrics */}
					</CardContent>
				</Card>

				<Card
					sx={{
						bgcolor: 'background.paper',
						boxShadow: 2,
						borderRadius: 2,
						margin: 2,
					}}
				>
					<CardContent>
						<Typography
							variant="h6"
							gutterBottom
							sx={{
								fontWeight: 'bold',
								color: 'primary.main',
								marginBottom: 3,
							}}
						>
							<HealthAndSafetyIcon
								sx={{ verticalAlign: 'middle', marginRight: 1 }}
							/>
							Insurance Details
						</Typography>
						<Grid container spacing={2}>
							<Grid item xs={12} sm={6}>
								<Box display="flex" alignItems="center">
									<AccountBalanceIcon
										sx={{ color: 'primary.main', marginRight: 1 }}
									/>
									<div>
										<Typography variant="subtitle1">Group Number:</Typography>
										<Typography variant="body1" sx={{ fontWeight: 'medium' }}>
											{patient.insurrance_group_number}
										</Typography>
									</div>
								</Box>
							</Grid>
							<Grid item xs={12} sm={6}>
								<Box display="flex" alignItems="center">
									<CardMembershipIcon
										sx={{ color: 'primary.main', marginRight: 1 }}
									/>
									<div>
										<Typography variant="subtitle1">Member ID:</Typography>
										<Typography variant="body1" sx={{ fontWeight: 'medium' }}>
											{patient.insurrance_member_id}
										</Typography>
									</div>
								</Box>
							</Grid>
							<Grid item xs={12} sm={6}>
								<Box display="flex" alignItems="center">
									<LocalHospitalIcon
										sx={{ color: 'primary.main', marginRight: 1 }}
									/>
									<div>
										<Typography variant="subtitle1">Plan Type:</Typography>
										<Typography variant="body1" sx={{ fontWeight: 'medium' }}>
											{patient.insurrance_plan_type}
										</Typography>
									</div>
								</Box>
							</Grid>
							<Grid item xs={12} sm={6}>
								<Box display="flex" alignItems="center">
									<HealthAndSafetyIcon
										sx={{ color: 'primary.main', marginRight: 1 }}
									/>
									<div>
										<Typography variant="subtitle1">
											Primary Care Provider:
										</Typography>
										<Typography variant="body1" sx={{ fontWeight: 'medium' }}>
											{patient.insurrance_primarycare_provider}
										</Typography>
									</div>
								</Box>
							</Grid>
						</Grid>
					</CardContent>
				</Card>
			</Box>
		);
	};

	return (
		<div
			style={{
				height: '100vh',
			}}
		>
			<Navbar user="patient" />
			<Toaster />
			{loading ? (
				<CircularProgress />
			) : patientDetails ? (
				<PatientDashboard patient={patientDetails} />
			) : (
				<div>
					{/* Handle case when patient details are not available */}
					<p>Patient details not found.</p>
				</div>
			)}
		</div>
	);
}
