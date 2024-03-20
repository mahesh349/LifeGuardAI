import './App.css';
import { AuthProvider } from './firebase/Auth';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/landing';
import PatientAuth from './pages/Patient/PatientAuth';
import DocSignUp from './pages/Doctor/DocSignUp';
import DocLogin from './pages/Doctor/DocLogin';
import DoctorDashboard from './pages/Doctor/DoctorDashboard';
import PatSignUp from './pages/Patient/PatSignUp';
import PatLogin from './pages/Patient/PatLogin';
import PatientDashboard from './pages/Patient/PatientDashboard';
import DoctorAuth from './pages/Doctor/DoctorAuth';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import ContactUs from './pages/ContactUs';
import About from './pages/About';
import Prediction from './component/PredictionAnalysis/prediction_analysis';
import PatientDetail from './component/PatientDetailForm/patientDetail';
import EditPatientDetailForm from './component/PatientDetailForm/editPatientDetailForm';

function App() {
	return (
		<AuthProvider>
			<LocalizationProvider dateAdapter={AdapterDateFns}>
				<BrowserRouter>
					<Routes>
						<Route path="/" element={<LandingPage />} />
						<Route path="/PatientDetailsForm" element={<PatientAuth />} />
						<Route path="/DocSignUp" element={<DocSignUp />} />
						<Route path="/DocLogin" element={<DocLogin />} />
						<Route path="/doctorDashboard" element={<DoctorDashboard />} />
						<Route path="/PatSignUp" element={<PatSignUp />} />
						<Route path="/PatLogin" element={<PatLogin />} />
						<Route path="/patientDashboard" element={<PatientDashboard />} />
						<Route path="/DoctorDetailsForm" element={<DoctorAuth />} />
						<Route path="/contact" element={<ContactUs />} />
						<Route path="/about" element={<About />} />
						<Route path="/prediction" element={<Prediction />} />
						<Route
							path="/editPatient/:email"
							element={<EditPatientDetailForm />}
						/>
					</Routes>
				</BrowserRouter>
			</LocalizationProvider>
		</AuthProvider>
	);
}

export default App;
