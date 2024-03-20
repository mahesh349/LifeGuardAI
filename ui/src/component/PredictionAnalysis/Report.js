import React, { useRef } from 'react';
import {
	Modal,
	Box,
	Typography,
	Button,
	Card,
	CardContent,
	useTheme,
	CardActions,
} from '@mui/material';
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Tooltip,
	Legend,
	ArcElement,
} from 'chart.js';
import FavoriteIcon from '@mui/icons-material/Favorite'; // Heart icon
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter'; // Fitness icon
import LocalDrinkIcon from '@mui/icons-material/LocalDrink'; // Drink icon
import SmokingRoomsIcon from '@mui/icons-material/SmokingRooms';
import HeightIcon from '@mui/icons-material/Height'; // Height icon
import ScaleIcon from '@mui/icons-material/Scale';
import WcIcon from '@mui/icons-material/Wc';
import BadgeIcon from '@mui/icons-material/Badge';
import BloodtypeIcon from '@mui/icons-material/Bloodtype';
import EmojiFoodBeverageOutlinedIcon from '@mui/icons-material/EmojiFoodBeverageOutlined';
import HealingOutlinedIcon from '@mui/icons-material/HealingOutlined';
import { Line } from 'react-chartjs-2';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Tooltip,
	Legend
);

const ReportModal = ({ open, onClose, data }) => {
	const modalRef = useRef();
	const theme = useTheme();

	if (!data) {
		return null;
	}
	const {
		age,
		gender,
		height,
		weight,
		ap_hi,
		ap_lo,
		cholesterol,
		gluc,
		smoke,
		alco,
		active,
		probability,
		fullName,
		prediction,
	} = data;

	const levelMapping = {
		0: 'No',
		1: 'Low',
		2: 'Medium',
		3: 'High',
	};
	const genderText = gender === 1 ? 'Male' : 'Female';
	const smokeText = smoke ? 'Yes' : 'No';
	const alcoText = alco ? 'Yes' : 'No';
	const activeText = active ? 'Active' : 'Inactive';
	const glucText = levelMapping[gluc];
	const cholesterolText = levelMapping[cholesterol];

	const ecgLineData = Array.from({ length: 100 }, (_, i) =>
		i % 10 === 0 ? 1 : 0.5
	);

	const chartData = {
		labels: ecgLineData.map((_, i) => i),
		datasets: [
			{
				data: ecgLineData,
				borderColor: theme.palette.primary.main,
				borderWidth: 2,
				fill: false,
			},
		],
	};

	const chartOptions = {
		scales: {
			x: { display: false },
			y: { display: false, min: 0, max: 1 },
		},
		plugins: {
			legend: { display: false },
			tooltip: { enabled: false },
		},
		elements: {
			point: { radius: 0 },
			line: { tension: 0 },
		},
		maintainAspectRatio: false,
	};

	const cardStyles = {
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		width: 'auto',
		maxWidth: '600px', // You can adjust this as per your requirement
		bgcolor: 'background.paper',
		boxShadow: 24,
		p: 4,
		borderRadius: theme.shape.borderRadius,
		outline: 'none',
	};

	const downloadReport = async () => {
		const pdf = new jsPDF();

		const canvasOptions = {
			scale: 2, // Increase the scale for higher resolution
			useCORS: true, // Enable cross-origin resource sharing
			logging: true, // Enable logging to console for debugging (optional)
		};
		const canvas = await html2canvas(modalRef.current, canvasOptions);
		const imgData = canvas.toDataURL('image/png');

		pdf.addImage(imgData, 'PNG', 0, 0);
		pdf.save(`${fullName}_report.pdf`);
	};

	return (
		<Modal
			open={open}
			onClose={onClose}
			aria-labelledby="patient-report-title"
			aria-describedby="patient-report-description"
		>
			<Card
				ref={modalRef}
				sx={{
					position: 'absolute',
					top: '50%',
					left: '50%',
					transform: 'translate(-50%, -50%)',
					maxWidth: 500,
					bgcolor: 'background.paper',
					boxShadow: 24,
					p: 4,
					m: 2,
					borderRadius: 2,
				}}
			>
				<CardContent>
					<Typography
						gutterBottom
						variant="h5"
						component="div"
						sx={{ display: 'flex', alignItems: 'center', fontWeight: 'bold' }}
					>
						<FavoriteIcon color="error" sx={{ mr: 1 }} /> Patient Report
					</Typography>
					<Typography
						variant="body2"
						color="text.secondary"
						sx={{ fontWeight: 'medium' }}
					>
						<BadgeIcon sx={{ verticalAlign: 'middle', mr: 1 }} /> Full Name:{' '}
						{fullName}
						<br />
						<WcIcon sx={{ verticalAlign: 'middle', mr: 1 }} /> Gender:{' '}
						{genderText}
						<br />
						<ScaleIcon sx={{ verticalAlign: 'middle', mr: 1 }} /> Age: {age}{' '}
						years
						<br />
						<HeightIcon sx={{ verticalAlign: 'middle', mr: 1 }} /> Height:{' '}
						{height} cm
						<br />
						<FitnessCenterIcon sx={{ verticalAlign: 'middle', mr: 1 }} />{' '}
						Weight: {weight} kg
						<br />
						<BloodtypeIcon sx={{ verticalAlign: 'middle', mr: 1 }} /> Systolic
						Pressure: {ap_hi} mm Hg
						<br />
						<BloodtypeIcon sx={{ verticalAlign: 'middle', mr: 1 }} /> Diastolic
						Pressure: {ap_lo} mm Hg
						<br />
						<EmojiFoodBeverageOutlinedIcon
							sx={{ verticalAlign: 'middle', mr: 1 }}
						/>{' '}
						Glucose : {glucText}
						<br />
						<LocalDrinkIcon sx={{ verticalAlign: 'middle', mr: 1 }} /> Alcohol
						Consumption: {alco ? 'Yes' : 'No'}
						<br />
						<SmokingRoomsIcon
							sx={{ verticalAlign: 'middle', mr: 1 }}
						/> Smoker: {smoke ? 'Yes' : 'No'}
						<br />
						{/* Other patient data here */}
					</Typography>
					<Box sx={{ height: '100px', my: 2 }}>
						<Line data={chartData} options={chartOptions} />
					</Box>
					<Typography variant="body2" color="text.secondary">
						Probability of CVD: {(probability * 100).toFixed(2)}%
					</Typography>
					<br />
					<HealingOutlinedIcon sx={{ verticalAlign: 'middle', mr: 1 }} />{' '}
					{prediction === 1 ? 'High Chances' : 'Lower Chances'} of Cardio
					Vascular Disorder
				</CardContent>
				<CardActions>
					<Button size="small" onClick={onClose}>
						Close
					</Button>
					{/* Implement your download logic here */}
					<Button size="small" onClick={downloadReport}>
						Download Report
					</Button>
				</CardActions>
			</Card>
		</Modal>
	);
};

export default ReportModal;
