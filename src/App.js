import './App.css';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from 'react-router-dom';

import Navbar from './components/Navbar';
import EntranceForm from './components/EntranceForm';
// import Home from './pages/Home';
import Friends from './pages/Friends';
import Farms from './pages/Farms';
import Preferences from './pages/Preferences';
import About from './pages/About';
import { useState, useContext, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import { AuthContext } from './context/auth';

function App() {
	const adminUser = {
		email: 'admin@admin.com',
		password: 'admin',
	};

	const [userData, setUserData] = useState({
		loggedIn: false,
		name: '',
		email: '',
		token: '',
	});

	return (
		<>
			<link
				rel='stylesheet'
				href='https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css'
				integrity='sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T'
				crossOrigin='anonymous'
			/>
			<style type='text/css'>
				{`
					.btn:focus {
						outline: none;
						box-shadow: none;
						color: #1c3532; 
					}
					.btn-primary {
						background-color: #c8f0ef;
						border-width: 0px;
						color: #1c3532;
						border-radius: 12px;
					}
					.btn-primary:hover{
						background-color:#ff6169
					}
					.btn-primary:focus{
						background-color:#c8f0ef
					}
					.btn-secondary {
						background-color: #faebd7;
						border-width: 0px;
						color: #1c3532;
						border-radius: 12px;
					}
					.btn-secondary:hover{
						background-color:#ff6169
					}
					.btn-secondary:focus{
						background-color: #faebd7;
						color: #1c3532;
					}
					.btn-info {
						background-color: #c8f0ef;
						border-width: 0px;
						color: #1c3532;
						border-radius: 30px;
						padding-top: 0px;
						padding-bottom: 0px;
					}
					.btn-info:hover{
						background-color:#c8f0ef
						color: #1c3532;
					}
					.list-group {
						border-radius: 12px;
					}
					.list-group-horizontal {
						border-radius: unset;
					}
					.list-group-item {
    					background-color: #faebd7;
						color: #1c3532;
						transition-duration: 0.15s;
					}
					
					.list-group-item:hover{
						background-color:#ff6169;
						color: #faebd7;

					}
					.list-group-item.active {
						background-color: #ff6169;
						color: #faebd7;
						border-color: transparent
					}
					.list-group-item-secondary:hover
					{
						background-color: #c8f0ef;
						color: #1c3532;
					}
					.list-group-item-secondary.active {
						background-color: #c8f0ef;
						color: #1c3532;
					}
					.container-fluid {
						margin: 30px;
						height: fit-content;
					}
					.modal-content {
						background-color: #26979f;
						border-radius: 12px;
						border-width: 0px;
						color: #faebd7;
					
					}
					.modal-header {
						color: #c8f0ef;
						font-size: 32px;
						border-bottom-width: 0px;
					}
					.form-control {
						border-radius: 12px;
						
						margin-bottom: 10px;
					}
				
				`}
			</style>
			<Router>
				{!useContext(AuthContext).user ? (
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
								<Redirect to='/friends' />
							</Route>
							<Route path='/friends'>
								<Friends
									userData={userData}
									setUserData={setUserData}
								/>
							</Route>
							<Route path='/farms'>
								<Farms />
							</Route>
							<Route
								path='/preferences'
								component={Preferences}
							/>
							<Route path='/about' component={About} />
							<Redirect to='/friends' />
						</Switch>
					</>
				)}
			</Router>
		</>
	);
}

export default App;
