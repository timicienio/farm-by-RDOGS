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
import FarmofClub from './pages/FarmofClub';
import Preferences from './pages/Preferences';
import About from './pages/About';
import { useState } from 'react';

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
								<Home
									userData = {userData}
								></Home>
							</Route>
							<Route path='/friends'>
								<Friends
									userData = {userData}
								></Friends>
							</Route>
							<Route exact path={'/farms'}>
								<Farms
									userData = {userData}
								/>
							</Route>
							<Route path="/farms/:farmname?" component={FarmofClub}>
								<FarmofClub
									userData = {userData}
								/>
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
