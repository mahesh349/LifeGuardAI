import React from 'react';
import './ContactUs.css'; // Import your CSS file for styling
import Navbar from '../component/Navbar';
import { TextField, Button } from '@mui/material/';
import '../assets/common.css';
import { Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const ContactUs = () => {
	const submitFun = async () => {
		toast.success('Successfully submitted!');
	};

	return (
		<>
			<Navbar />
			<div>
				<Toaster />
			</div>
			<div className="contact-us-container">
				<div className="contact-form-container">
					<h1>Contact Us</h1>
					<p>Have questions? Reach out to us using the form below.</p>

					<form onSubmit={submitFun}>
						<div className="form-group">
							<label htmlFor="name">Name:</label>
							<input type="text" id="name" name="name" required />
						</div>

						<div className="form-group">
							<label htmlFor="email">Email:</label>
							<input type="email" id="email" name="email" required />
						</div>

						<div className="form-group">
							<label htmlFor="message">Message:</label>
							<textarea
								id="message"
								name="message"
								rows="4"
								required
							></textarea>
						</div>
						<div className="makeCenter">
							<Button
								variant="outlined"
								color="secondary"
								type="submit"
								sx={{
									borderRadius: '50px',
									color: 'white',
									backgroundColor: '#2196F3',
									'&:hover': {
										backgroundColor: '#2196F3',
									},
								}}
								className="makeCenter"
							>
								Submit
							</Button>
						</div>
					</form>
				</div>

				<div className="company-info-container">
					<h2>School Information</h2>
					<p>
						<strong>Address:</strong> 1 Castle Point Terrace, Hoboken, NJ 07030
					</p>
					<p>
						<strong>Site:</strong>{' '}
						<Link to={'https://www.stevens.edu/'}>
							https://www.stevens.edu/
						</Link>
					</p>
					<p>
						<strong>Phone:</strong>+12012165000
					</p>
				</div>
			</div>
		</>
	);
};

export default ContactUs;
