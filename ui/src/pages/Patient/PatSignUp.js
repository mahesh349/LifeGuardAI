import React, { useState, useContext } from 'react';
import { TextField, Button } from '@mui/material/';
import { Link } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import * as helper from '../../helper';
import Alert from '@mui/material/Alert';
import { doCreateUserWithEmailAndPassword } from '../../firebase/functions';
import { AuthContext } from '../../firebase/Auth';

function PatSignUp() {
	const { currentUser } = useContext(AuthContext);
	const [data, setData] = useState({
		name: '',
		email: '',
		password: '',
		confirmPassword: '',
		// profilePicture: "",
		// skills: [],
		// experience: "",
		// field: "",
	});
	const [error, setError] = useState();
	//const navigate = useNavigate();

	// useEffect(() => {
	//   if (JSON.parse(localStorage.getItem("token_data"))) {
	//     navigate("/dashboard");
	//   }
	// }, []);

	const validateRegister = async (e) => {
		e.preventDefault();
		console.log(data);
		try {
			helper.isValidEmail(data.email);
			helper.isValidPassword(data.password);
			helper.isPasswordSame(data.confirmPassword, data.password);
			helper.isValidString(data.name, 'Full Name');
			console.log('after checking stuff!!');
		} catch (e) {
			setError(e);
			return;
		}

		try {
			await doCreateUserWithEmailAndPassword(
				data.email,
				data.password,
				data.name
			);
			console.log('in second trycatch');
		} catch (e) {
			setError(e);
			return;
		}
	};

	if (currentUser) {
		return <Navigate to={`/patientDashboard`} />;
	}

	return (
		<>
			<div
				className="card"
				style={{
					display: 'block',
					marginLeft: 'auto',
					marginRight: 'auto',
					backgroundColor: '#2196F3', // Set background color to blue
					padding: '20px', // Add padding for better spacing
				}}
			>
				{error ? (
					<Alert
						severity="error"
						onClose={() => {
							console.log('here');
							setError(null);
						}}
					>
						<div>{error.message}</div>
					</Alert>
				) : (
					''
				)}
				<div className="card-body">
					<h1 className="card-title makeCenter" style={{ color: 'white' }}>
						Sign Up
					</h1>
					<br />
					<form onSubmit={validateRegister} id="register-form">
						<TextField
							label="Full Name"
							onChange={(e) => setData({ ...data, name: e.target.value })}
							required
							variant="outlined"
							color="secondary"
							type="text"
							value={data.name}
							fullWidth
							sx={{
								mb: 3,
								borderRadius: '50px',
								backgroundColor: 'white',
								color: 'black',
								'& .MuiOutlinedInput-root': {
									'& fieldset': {
										border: 'none', // Remove border
									},
								},
							}}
							inputProps={{ style: { color: 'black' } }}
						/>
						<TextField
							label="Email"
							onChange={(e) => setData({ ...data, email: e.target.value })}
							required
							variant="outlined"
							color="secondary"
							type="email"
							sx={{
								mb: 3,
								borderRadius: '50px',
								backgroundColor: 'white',
								color: 'black',
								'& .MuiOutlinedInput-root': {
									'& fieldset': {
										border: 'none', // Remove border
									},
								},
							}}
							inputProps={{ style: { color: 'black' } }}
							fullWidth
							value={data.email}
						/>
						<TextField
							label="Password"
							onChange={(e) => setData({ ...data, password: e.target.value })}
							required
							variant="outlined"
							color="secondary"
							type="password"
							value={data.password}
							fullWidth
							sx={{
								mb: 3,
								borderRadius: '50px',
								backgroundColor: 'white',
								color: 'black',
								'& .MuiOutlinedInput-root': {
									'& fieldset': {
										border: 'none', // Remove border
									},
								},
							}}
							inputProps={{ style: { color: 'black' } }}
						/>
						<TextField
							label="Confirm Password"
							onChange={(e) =>
								setData({ ...data, confirmPassword: e.target.value })
							}
							required
							variant="outlined"
							color="secondary"
							type="password"
							value={data.confirmPassword}
							fullWidth
							sx={{
								mb: 3,
								borderRadius: '50px',
								backgroundColor: 'white',
								color: 'black',
								'& .MuiOutlinedInput-root': {
									'& fieldset': {
										border: 'none', // Remove border
									},
								},
							}}
							inputProps={{ style: { color: 'black' } }}
						/>
						<div className="makeCenter">
							<Button
								variant="outlined"
								color="secondary"
								type="submit"
								sx={{
									borderRadius: '50px',
									color: 'black',
									backgroundColor: 'white',
									'&:hover': {
										backgroundColor: 'white',
									},
								}}
								className="makeCenter"
							>
								Sign Up
							</Button>
						</div>
						<br />
						<br />
						<div
							className="makeright"
							style={{ color: 'white', fontSize: '20px' }}
						>
							<small>
								Already have an account?{' '}
								<Link to="/PatLogin" style={{ color: 'white' }}>
									Login
								</Link>
							</small>
						</div>
					</form>
				</div>
			</div>
		</>
	);
}

export default PatSignUp;
