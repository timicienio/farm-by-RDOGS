import './App.css';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from 'react-router-dom';

import Navbar from './components/Navbar';
import EntranceForm from './components/EntranceForm';
import Home from './pages/Home';
import Friends from './pages/Friends';
import Farms from './pages/Farms';
import FarmOfClub from './pages/FarmOfClub';
import Preferences from './pages/Preferences';
import About from './pages/About';
import { useState } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';

// const UserContext = React.createContext({ name: 'RDOGS'});

function App() {
	const adminUser = {
		email: 'admin@admin.com',
		password: 'admin',
	};

	const [userData, setUserData] = useState({
		loggedIn: false,
		name: '',
		email: '',
	});

	// const [error, setError] = useState('');

	const Login = details => {
		console.log(details);
	};

	const Logout = () => {
		console.log('Logout');
	};

	return (
		<>
			<link
				rel='stylesheet'
				href='https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css'
				integrity='sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk'
				crossorigin='anonymous'
			/>
			<Router>
				{!userData.loggedIn ? (
					<>
						<Route path='/entrance'>
							<EntranceForm
								userData={userData}
								setUserData={setUserData}
							/>
						</Route>
						<Redirect to='/entrance' />
					</>
				) : (
					<>
						<Navbar />
						<Switch>
							<Route exact path='/'>
								<Redirect to='/home' />
							</Route>

							<Route path='/home'>
								<Home userData={userData}></Home>
							</Route>
							<Route path='/friends'>
								<Friends userData={userData}></Friends>
							</Route>
							<Route exact path={'/farms'}>
								<Farms userData={userData} />
							</Route>
							<Route path='/farms/:farmname?'>
								<FarmOfClub userData={userData} />
							</Route>
							<Route
								path='/preferences'
								component={Preferences}
							/>
							<Route path='/about' component={About} />
							<Redirect to='/home' />
						</Switch>
					</>
				)}
			</Router>
		</>
	);
}

export default App;
