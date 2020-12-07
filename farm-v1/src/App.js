import './App.css';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from 'react-router-dom';

import Navbar from './components/Navbar';
import EntranceForm from './components/EntranceForm';
import LoginForm from './components/LoginForm';
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
				<Navbar />
				<Switch>
					<Route exact path='/'>
						<Redirect to='/signup' />
					</Route>
					<Route path='/home' component={Home} />
					<Route path='/friends' component={Friends} />
					<Route path='/farms' component={Farms} />
					<Route path='/preferences' component={Preferences} />
					<Route path='/about' component={About} />
					<Route path='/signup' component={EntranceForm} />
					<Route path='/login'>
						<LoginForm setUserData={setUserData} />
					</Route>
				</Switch>
			</Router>
		</>
	);
}

export default App;
