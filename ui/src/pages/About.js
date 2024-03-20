import React from 'react';
import './ContactUs.css';
import Navbar from '../component/Navbar';
import { Container, Grid, Paper, Typography } from '@mui/material';
import '../assets/common.css';

const About = () => {
	const pageStyle = {
		//background: 'linear-gradient(135deg, #64B5F6 0%, #1976D2 100%)',
		minHeight: '100vh',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	};

	return (
		<>
			<Navbar />
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
									Welcome to our platform dedicated to improving end-of-life
									care through technology.
								</Typography>
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
									In this journey, we aim to make a difference in end-of-life
									care by leveraging cutting-edge technology. Join us in this
									mission to provide comfort, support, and dignity to those in
									need.
								</Typography>
								<br />
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
		</>
	);
};

export default About;
