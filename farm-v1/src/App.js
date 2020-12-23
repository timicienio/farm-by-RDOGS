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
import FarmOfClub from './components/FarmOfClub';
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

	// let db = {
	// 	users: [
	// 		{
	// 			username: 'timicienio',
	// 			email: 'timmy960072@gmail.com',
	// 			passwordHash: '',
	// 		},
	// 	],
	// 	farms: [
	// 		{
	// 			farmName: 'farm1',
	// 			type: 'Club',
	// 			members: [
	// 				// users with access to farm (including current user)
	// 				{
	// 					username: 'timicienio',
	// 					email: 'timmy960072@gmail.com',
	// 				},
	// 				{
	// 					username: 'rdogs1',
	// 					email: 'rdogs1@rdogs.com',
	// 				},
	// 				{
	// 					username: 'rdogs2',
	// 					email: 'rdogs2@rdogs.com',
	// 				},
	// 			],
	// 			chunks: [
	// 				{
	// 					// initial chunk
	// 					coor: {
	// 						x: 0,
	// 						y: 0,
	// 					},
	// 					plants: [
	// 						{
	// 							type: 'Post',
	// 							title: 'RDOGS FARM IS NICE',
	// 							body: 'Text body',
	// 							localCoor: {
	// 								x: 30,
	// 								y: 30,
	// 							},
	// 							authorUserName: 'timicienio',
	// 							author: {
	// 								username: 'timicienio',
	// 								email: 'timmy960072@gmail.com',
	// 							},
	// 						},
	// 						{
	// 							type: 'Comment',
	// 							body: 'YEAH',
	// 							localCoor: {
	// 								x: 28,
	// 								y: 30,
	// 							},
	// 							authorUserName: 'timicienio',
	// 							author: {
	// 								username: 'timicienio',
	// 								email: 'timmy960072@gmail.com',
	// 							},
	// 						},
	// 						{
	// 							type: 'Reaction',
	// 							body: '🐕',
	// 							localCoor: {
	// 								x: 33,
	// 								y: 30,
	// 							},
	// 							authorUserName: 'timicienio',
	// 							author: {
	// 								username: 'timicienio',
	// 								email: 'timmy960072@gmail.com',
	// 							},
	// 						},
	// 					],
	// 				},
	// 				{
	// 					coor: {
	// 						x: 1,
	// 						y: 0,
	// 					},
	// 					plants: [
	// 						{
	// 							type: 'Post',
	// 							title: 'RDOGS FARM IS NICE',
	// 							body: 'Text body',
	// 							localCoor: {
	// 								x: 30,
	// 								y: 30,
	// 							},
	// 							authorUserName: 'timicienio',
	// 							author: {
	// 								username: 'timicienio',
	// 								email: 'timmy960072@gmail.com',
	// 							},
	// 						},
	// 						{
	// 							type: 'Comment',
	// 							body: 'YEAH',
	// 							localCoor: {
	// 								x: 28,
	// 								y: 30,
	// 							},
	// 							authorUserName: 'timicienio',
	// 							author: {
	// 								username: 'timicienio',
	// 								email: 'timmy960072@gmail.com',
	// 							},
	// 						},
	// 						{
	// 							type: 'Reaction',
	// 							body: '🐕',
	// 							localCoor: {
	// 								x: 33,
	// 								y: 30,
	// 							},
	// 							authorUserName: 'timicienio',
	// 							author: {
	// 								username: 'timicienio',
	// 								email: 'timmy960072@gmail.com',
	// 							},
	// 						},
	// 					],
	// 				},
	// 			],
	// 		},
	// 	],
	// };

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
			<style type='text/css'>
				{`
					.list-group {
						border-radius: 12px;
					}
					.list-group-item {
    					background-color: #c8f0ef;
    					color: #1c3532;
					}
					.list-group-item.active {
						background-color: #26979f;
						border-color: #26979f
					}
				`}
			</style>
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
							<Route path='/farms'>
								<Farms userData={userData} />
							</Route>
							{/* <Route path='/farms/:farmname?'>
								<FarmOfClub userData={userData} />
							</Route> */}
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
