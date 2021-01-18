import './Farms.css';

import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import { ListGroup, Button } from 'react-bootstrap';
// import Container from 'react-bootstrap/Container';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';

import Farm from '../components/Farm';
import FarmToolbox from '../components/FarmToolbox';
import CreateNewFarmPopUp from '../components/CreateNewFarmPopUp';
import useFarms from '../hooks/useFarms';
import useFarm from '../hooks/useFarm';

const Farms = ({ userData }) => {
	// const [friendList, setFriendList] = useState([]);
	// const [farmList, setFarmList] = useState([
	// 	{
	// 		farmName: 'RDOGS Working Group',
	// 		type: 'Club',
	// 		members: [
	// 			// users with access to farm (including current user)
	// 			{
	// 				username: 'timicienio',
	// 				email: 'timmy960072@gmail.com',
	// 			},
	// 			{
	// 				username: 'rdogs1',
	// 				email: 'rdogs1@rdogs.com',
	// 			},
	// 			{
	// 				username: 'rdogs2',
	// 				email: 'rdogs2@rdogs.com',
	// 			},
	// 		],
	// 		chunks: [
	// 			{
	// 				// initial chunk
	// 				coor: {
	// 					x: 0,
	// 					y: 0,
	// 				},
	// 				plants: [
	// 					{
	// 						id: 0,
	// 						type: 'Post',
	// 						title: 'RDOGS FARM IS NICE',
	// 						body: 'Text body',
	// 						localCoor: {
	// 							x: 10,
	// 							y: 10,
	// 						},
	// 						authorUserName: 'timicienio',
	// 						author: {
	// 							username: 'timicienio',
	// 							email: 'timmy960072@gmail.com',
	// 						},
	// 					},
	// 					{
	// 						id: 1,
	// 						type: 'Comment',
	// 						body: 'YEAH',
	// 						localCoor: {
	// 							x: 14,
	// 							y: 10,
	// 						},
	// 						authorUserName: 'timicienio',
	// 						author: {
	// 							username: 'timicienio',
	// 							email: 'timmy960072@gmail.com',
	// 						},
	// 					},
	// 					{
	// 						id: 2,
	// 						type: 'Reaction',
	// 						body: '🐕',
	// 						localCoor: {
	// 							x: 16,
	// 							y: 10,
	// 						},
	// 						authorUserName: 'timicienio',
	// 						author: {
	// 							username: 'timicienio',
	// 							email: 'timmy960072@gmail.com',
	// 						},
	// 					},
	// 				],
	// 			},
	// 			{
	// 				coor: {
	// 					x: 1,
	// 					y: 0,
	// 				},
	// 				plants: [
	// 					{
	// 						id: 0,
	// 						type: 'Post',
	// 						title: 'RDOGS FARM IS NICE',
	// 						body: 'Text body',
	// 						localCoor: {
	// 							x: 8,
	// 							y: 8,
	// 						},
	// 						authorUserName: 'timicienio',
	// 						author: {
	// 							username: 'timicienio',
	// 							email: 'timmy960072@gmail.com',
	// 						},
	// 					},
	// 					{
	// 						id: 1,
	// 						type: 'Comment',
	// 						body: 'YEAH',
	// 						localCoor: {
	// 							x: 8,
	// 							y: 12,
	// 						},
	// 						authorUserName: 'timicienio',
	// 						author: {
	// 							username: 'timicienio',
	// 							email: 'timmy960072@gmail.com',
	// 						},
	// 					},
	// 					{
	// 						id: 2,
	// 						type: 'Reaction',
	// 						body: '🐕',
	// 						localCoor: {
	// 							x: 8,
	// 							y: 14,
	// 						},
	// 						authorUserName: 'timicienio',
	// 						author: {
	// 							username: 'timicienio',
	// 							email: 'timmy960072@gmail.com',
	// 						},
	// 					},
	// 				],
	// 			},
	// 		],
	// 	},
	// 	{
	// 		farmName: 'IM B08',
	// 		type: 'Club',
	// 		members: [
	// 			// users with access to farm (including current user)
	// 			{
	// 				username: 'timicienio',
	// 				email: 'timmy960072@gmail.com',
	// 			},
	// 			{
	// 				username: 'rdogs1',
	// 				email: 'rdogs1@rdogs.com',
	// 			},
	// 			{
	// 				username: 'rdogs2',
	// 				email: 'rdogs2@rdogs.com',
	// 			},
	// 		],
	// 		chunks: [
	// 			{
	// 				// initial chunk
	// 				coor: {
	// 					x: 0,
	// 					y: 0,
	// 				},
	// 				plants: [
	// 					{
	// 						id: 0,
	// 						type: 'Post',
	// 						title: 'RDOGS FARM IS NICE',
	// 						body: 'Text body',
	// 						localCoor: {
	// 							x: 30,
	// 							y: 30,
	// 						},
	// 						authorUserName: 'timicienio',
	// 						author: {
	// 							username: 'timicienio',
	// 							email: 'timmy960072@gmail.com',
	// 						},
	// 					},
	// 					{
	// 						id: 1,
	// 						type: 'Comment',
	// 						body: 'YEAH',
	// 						localCoor: {
	// 							x: 28,
	// 							y: 30,
	// 						},
	// 						authorUserName: 'timicienio',
	// 						author: {
	// 							username: 'timicienio',
	// 							email: 'timmy960072@gmail.com',
	// 						},
	// 					},
	// 					{
	// 						id: 2,
	// 						type: 'Reaction',
	// 						body: '🐕',
	// 						localCoor: {
	// 							x: 20,
	// 							y: 30,
	// 						},
	// 						authorUserName: 'timicienio',
	// 						author: {
	// 							username: 'timicienio',
	// 							email: 'timmy960072@gmail.com',
	// 						},
	// 					},
	// 				],
	// 			},
	// 			{
	// 				coor: {
	// 					x: 1,
	// 					y: 0,
	// 				},
	// 				plants: [
	// 					{
	// 						id: 0,
	// 						type: 'Post',
	// 						title: 'RDOGS FARM IS NICE',
	// 						body: 'Text body',
	// 						localCoor: {
	// 							x: 30,
	// 							y: 30,
	// 						},
	// 						authorUserName: 'timicienio',
	// 						author: {
	// 							username: 'timicienio',
	// 							email: 'timmy960072@gmail.com',
	// 						},
	// 					},
	// 					{
	// 						id: 1,
	// 						type: 'Comment',
	// 						body: 'YEAH',
	// 						localCoor: {
	// 							x: 28,
	// 							y: 30,
	// 						},
	// 						authorUserName: 'timicienio',
	// 						author: {
	// 							username: 'timicienio',
	// 							email: 'timmy960072@gmail.com',
	// 						},
	// 					},
	// 					{
	// 						id: 3,
	// 						type: 'Reaction',
	// 						body: '🐕',
	// 						localCoor: {
	// 							x: 20,
	// 							y: 30,
	// 						},
	// 						authorUserName: 'timicienio',
	// 						author: {
	// 							username: 'timicienio',
	// 							email: 'timmy960072@gmail.com',
	// 						},
	// 					},
	// 				],
	// 			},
	// 		],
	// 	},
	// 	{
	// 		farmName: "I don't know how to name a club",
	// 		type: 'Club',
	// 		members: [
	// 			// users with access to farm (including current user)
	// 			{
	// 				username: 'timicienio',
	// 				email: 'timmy960072@gmail.com',
	// 			},
	// 			{
	// 				username: 'rdogs1',
	// 				email: 'rdogs1@rdogs.com',
	// 			},
	// 			{
	// 				username: 'rdogs2',
	// 				email: 'rdogs2@rdogs.com',
	// 			},
	// 		],
	// 		chunks: [
	// 			{
	// 				// initial chunk
	// 				coor: {
	// 					x: 0,
	// 					y: 0,
	// 				},
	// 				plants: [
	// 					{
	// 						id: 0,
	// 						type: 'Post',
	// 						title: 'RDOGS FARM IS NICE',
	// 						body: 'Text body',
	// 						localCoor: {
	// 							x: 10,
	// 							y: 10,
	// 						},
	// 						authorUserName: 'timicienio',
	// 						author: {
	// 							username: 'timicienio',
	// 							email: 'timmy960072@gmail.com',
	// 						},
	// 					},
	// 					{
	// 						id: 1,
	// 						type: 'Comment',
	// 						body: 'YEAH',
	// 						localCoor: {
	// 							x: 10,
	// 							y: 14,
	// 						},
	// 						authorUserName: 'timicienio',
	// 						author: {
	// 							username: 'timicienio',
	// 							email: 'timmy960072@gmail.com',
	// 						},
	// 					},
	// 					{
	// 						id: 2,
	// 						type: 'Reaction',
	// 						body: '🐕',
	// 						localCoor: {
	// 							x: 10,
	// 							y: 15,
	// 						},
	// 						authorUserName: 'timicienio',
	// 						author: {
	// 							username: 'timicienio',
	// 							email: 'timmy960072@gmail.com',
	// 						},
	// 					},
	// 				],
	// 			},
	// 			{
	// 				coor: {
	// 					x: 1,
	// 					y: 0,
	// 				},
	// 				plants: [
	// 					{
	// 						type: 'Post',
	// 						title: 'RDOGS FARM IS NICE',
	// 						body: 'Text body',
	// 						localCoor: {
	// 							x: 0,
	// 							y: 2,
	// 						},
	// 						authorUserName: 'timicienio',
	// 						author: {
	// 							username: 'timicienio',
	// 							email: 'timmy960072@gmail.com',
	// 						},
	// 					},
	// 					{
	// 						type: 'Comment',
	// 						body: 'YEAH',
	// 						localCoor: {
	// 							x: 0,
	// 							y: 6,
	// 						},
	// 						authorUserName: 'timicienio',
	// 						author: {
	// 							username: 'timicienio',
	// 							email: 'timmy960072@gmail.com',
	// 						},
	// 					},
	// 					{
	// 						type: 'Reaction',
	// 						body: '🐕',
	// 						localCoor: {
	// 							x: 0,
	// 							y: 8,
	// 						},
	// 						authorUserName: 'timicienio',
	// 						author: {
	// 							username: 'timicienio',
	// 							email: 'timmy960072@gmail.com',
	// 						},
	// 					},
	// 				],
	// 			},
	// 		],
	// 	},
	// ]);

	const {
		handleNewFarmChange,
		createNewFarm,
		getFarms, // List of farms fetched
		onSelectFarm,
		createFarmName,
		createFarmType,
		history,
		showCreateFarmPopUp,
		setShowCreateFarmPopUp,
	} = useFarms();

	return (
		<>
			<div className='map-container'>
				<Switch>
					<Route exact path='/farms'>
						Select a farm
					</Route>
					{getFarms.map((farm, index) => (
						<Route path={'/farms/' + String(index)}>
							<Farm data={farm} />
						</Route>
					))}
				</Switch>
				<FarmToolbox title='Farms'>
					{!getFarms.length ? (
						<span>Create your first farm!</span>
					) : (
						<ListGroup>
							{getFarms.map((farm, key) => (
								<ListGroup.Item
									eventKey={key}
									onClick={() => onSelectFarm(key)}
								>
									{farm.farmName}
								</ListGroup.Item>
							))}
						</ListGroup>
					)}
					<Button
						variant='secondary'
						onClick={setShowCreateFarmPopUp(true)}
					>
						Create...
					</Button>
				</FarmToolbox>
				<CreateNewFarmPopUp
					show={showCreateFarmPopUp}
					setShow={setShowCreateFarmPopUp}
					handleNewFarmChange={handleNewFarmChange}
					createNewFarm={createNewFarm}
					createFarmName={createFarmName}
					createFarmType={createFarmType}
				/>
			</div>
		</>
	);
};

export default Farms;
