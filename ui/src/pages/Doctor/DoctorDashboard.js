import React, { useContext, useEffect, useState } from 'react';
import { Button, CircularProgress, Typography } from '@mui/material/';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
	Card,
	CardContent,
	Grid,
	CardMedia,
	Box,
	Modal,
	Backdrop,
	Fade,
} from '@mui/material';
import { AuthContext } from '../../firebase/Auth';
import Navbar from '../../component/Navbar';
import male from '../../assets/male.jpg';
import female from '../../assets/female.jpg';
import { Toaster, toast } from 'react-hot-toast';
import Prediction from '../../component/PredictionAnalysis/prediction_analysis';

export default function DoctorDashboard() {
	const { currentUser } = useContext(AuthContext);
	const [hasProfile, setHasProfile] = useState(false);
	const [loading, setLoading] = useState(true);
	const [allPatients, setAllPatient] = useState(undefined);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const navigate = useNavigate();

	const handleOpenModal = () => {
		// setIsModalOpen(true);
		navigate('/prediction');
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
	};

	const PopupComponent = ({ isOpen, onClose }) => {
		return (
			<Modal
				open={isOpen}
				onClose={onClose}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{ timeout: 500 }}
			>
				<Fade in={isOpen}>
					<Box
						sx={{
							position: 'absolute',
							top: '50%',
							left: '50%',
							transform: 'translate(-50%, -50%)',
							width: '70%', // Set the desired width
							maxHeight: '80vh', // Set the desired max height
							overflowY: 'auto', // Enable vertical scrolling
							bgcolor: 'background.paper',
							border: '2px solid #000',
							boxShadow: 24,
							p: 4,
						}}
					>
						<div
							style={{
								display: 'flex',
								justifyContent: 'flex-end',
								marginBottom: '10px',
							}}
						>
							<Button onClick={onClose}>Close</Button>
						</div>
						<Typography variant="h6" component="div">
							<Prediction />
						</Typography>
					</Box>
				</Fade>
			</Modal>
		);
	};

	const buildCard = (patient) => {
		return (
			<Grid item xs={10} sm={10} md={10} lg={10} xl={10} key={patient._id}>
				<Card
					sx={{
						display: 'flex',
						marginTop: 5,
						boxShadow:
							'0 15px 30px rgba(0,0,0,0.30), 0 10px 8px rgba(0,0,0,0.22)',
						textDecoration: 'none',
					}}
				>
					<Box sx={{ display: 'flex', flexDirection: 'row' }}>
						<CardMedia
							component="img"
							sx={{ width: 120 }}
							image={patient.gender === 1 ? male : female}
							alt="Patient Image"
						/>
						<CardContent>
							<Typography variant="h5" component="h3" gutterBottom>
								Name: {patient.firstName} {patient.lastName}
							</Typography>
							<Typography variant="body1" gutterBottom>
								Email: {patient.emailId}
							</Typography>
							<Typography variant="body1" gutterBottom>
								Age: {patient.age}
							</Typography>
							<Typography variant="body1" gutterBottom>
								Gender: {patient.gender === 1 ? 'male' : 'female'}
							</Typography>
						</CardContent>
					</Box>
					<Box sx={{ flexGrow: 1 }} />
					<Button
						onClick={handleOpenModal}
						variant="contained"
						className="buttons"
						sx={{
							width: '100px',
							height: '40px',
							alignSelf: 'center',
							margin: 2,
						}}
					>
						Predict
					</Button>
					<PopupComponent isOpen={isModalOpen} onClose={handleCloseModal} />
				</Card>
			</Grid>
		);
	};

	const card =
		allPatients &&
		allPatients.map((patient) => {
			return buildCard(patient);
		});

	const fetchData = async (email) => {
		try {
			const url = 'http://localhost:3002/doctors/' + email;
			let ans = await axios.get(url);
			console.log(email);
			console.log('*********************profile:- ', ans.data);
			setHasProfile(ans.data);
			let patients = await axios.get('http://localhost:3002/patients');
			console.log(patients.data);
			setAllPatient(patients.data);
			setLoading(false);
		} catch (e) {
			console.error(e);
			toast.error(e);
		}
	};

	useEffect(() => {
		console.log('in load');
		if (currentUser) {
			fetchData(currentUser?.email);
		}
	}, [currentUser]);

	if (!currentUser) {
		return <Navigate to={`/`} />;
	}

	if (!currentUser) {
		return <Navigate to={`/`} />;
	}

	return (
		<div
			style={{
				height: '100vh',
			}}
		>
			<Navbar />
			<Toaster />
			{loading ? (
				<div style={{ display: 'flex', alignItems: 'center' }}>
					<CircularProgress size={40} color="secondary" />
					<Typography variant="body1" style={{ marginLeft: 10 }}>
						Loading...
					</Typography>
				</div>
			) : hasProfile ? (
				<>
					<br />
					<Grid
						container
						spacing={1}
						sx={{
							justifyContent: 'center',
							alignItems: 'center',
							marginBottom: 20,
						}}
					>
						{card}
					</Grid>
					<br />
				</>
			) : (
				<Navigate to={`/DoctorDetailsForm`} />
			)}
		</div>
	);
}
