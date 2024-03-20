import * as React from 'react';
import DoctorDetail from '../../component/DoctorDetailForm/DoctorDetail.js';
import Navbar from '../../component/Navbar';

export default function DoctorAuth() {
	return (
		<div className="main">
			<div>
				<Navbar user="doctor" />
				<h1>Doctor Registration Form</h1>
				<DoctorDetail />
			</div>
		</div>
	);
}
