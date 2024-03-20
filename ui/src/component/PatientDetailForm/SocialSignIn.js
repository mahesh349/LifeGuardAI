import React from 'react';
import {
	TextField,
	Button,
	Autocomplete,
	Select,
	MenuItem,
	InputLabel,
	FormControl,
} from '@mui/material/';
import GoogleIcon from '@mui/icons-material/Google';
import { doSocialSignIn } from '../../firebase/functions';

const SocialSignIn = () => {
	const socialSignOn = async (provider) => {
		try {
			await doSocialSignIn(provider);
		} catch (error) {
			alert(error);
		}
	};
	return (
		<div>
			<Button
				variant="outlined"
				color="secondary"
				style={{ marginTop: '1em' }}
				sx={{
					borderRadius: '50px',
					color: 'black',
					backgroundColor: 'white',
					'&:hover': {
						backgroundColor: 'white',
					},
				}}
				onClick={() => socialSignOn('google')}
				startIcon={<GoogleIcon style={{ color: 'currentColor' }} />}
			>
				Sign Up with google
			</Button>
		</div>
	);
};

export default SocialSignIn;
