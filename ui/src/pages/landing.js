import React from 'react';
import {
	Box,
	Button,
	Container,
	Grid,
	Divider,
	Paper,
	Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';
import './landing.css';
const PRIMARY_COLOR = 'primary';

function RenderButton(label, color, to) {
	return (
		<Box data-cy={`${label.toLowerCase()}-link`}>
			<Button
				variant="contained"
				color={color}
				size="large"
				component={Link}
				to={to}
				style={{
					borderRadius: 50,
					boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
				}}
			>
				{label}
			</Button>
		</Box>
	);
}

export default function LandingPage() {
	const pageStyle = {
		background: 'linear-gradient(135deg, #64B5F6 0%, #1976D2 100%)',
		minHeight: '100vh',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	};

	return (
		<div style={pageStyle}>
			<Paper elevation={3} style={{ padding: 20, margin: 20 }}>
				<Container maxWidth="md">
					<Grid container spacing={4}>
						<Grid item xs={12} md={6}>
							<Typography
								variant="h4"
								align="left"
								gutterBottom
								sx={{
									color: '#0091c4',
									fontSize: '2.3rem',
									fontWeight: 'bold',
								}}
							>
								Enriching End of Life Care with Technology
							</Typography>
							<br />
							<Typography
								variant="h6"
								align="left"
								paragraph
								sx={{
									color: 'black',
									fontSize: '1.3rem',
									fontWeight: 'bold',
								}}
							>
								Welcome to our platform dedicated to improving end-of-life care
								through technology.
							</Typography>
							<br />
							<div>
								<Box mt={2} align="center">
									<Box m={2}></Box>
									{RenderButton('Doctor', PRIMARY_COLOR, '/DocLogin')}

									<Box m={2}></Box>
									{RenderButton('For Patients', PRIMARY_COLOR, '/PatLogin')}
								</Box>
							</div>
						</Grid>
						<Grid item xs={12} md={6}>
							<img
								src="/Online.jpg"
								alt="doctor logo"
								style={{ width: '100%', height: 'auto' }}
							/>
						</Grid>
					</Grid>
				</Container>
			</Paper>
		</div>
	);
}
