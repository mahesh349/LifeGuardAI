import * as React from 'react';
import './PatientAuth.css';
import PatientDetail from '../../component/PatientDetailForm/patientDetail';
import Navbar from '../../component/Navbar';

export default function PatientAuth() {
	return (
		<div className="main">
			<div>
				<Navbar />
				<h1>Patient Registration Form</h1>
				<PatientDetail />
			</div>
		</div>
	);
}
