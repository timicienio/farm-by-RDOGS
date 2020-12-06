import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import EntranceForm from './components/EntranceForm';
import Home from './pages/Home';
import Friends from './pages/Friends';
import Farms from './pages/Farms';
import Preferences from './pages/Preferences';
import About from './pages/About';
import { useState } from 'react';

// const UserContext = React.createContext({ name: 'RDOGS'});

function App() {
	const adminUser = {
		email: 'admin@admin.com',
		password: 'admin',
	};

	const [userData, setUserData] = useState({ name: '', email: '' });

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
				{userData.name === '' ? (
					<>
						<EntranceForm />
					</>
				) : (
					<>
						<Navbar />
						<Switch>
							<Route exact path='/' component={Home} />
							<Route path='/friends' component={Friends} />
							<Route path='/farms' component={Farms} />
							<Route
								path='/preferences'
								component={Preferences}
							/>
							<Route path='/about' component={About} />
						</Switch>
					</>
				)}
			</Router>
		</>
	);
}

export default App;
