import React, { useEffect, useState } from 'react';
import { Link, Route, Switch, useHistory } from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Farm from '../components/Farm';
//import { getFarmList } from '../axios';

const Farms = ({ userData }) => {
	const [farmSelected, setFarmSelected] = useState(-1);
	// const [friendList, setFriendList] = useState([]);
	const [farmList, setFarmList] = useState([
		{
			farmName: 'farm1',
			type: 'Club',
			members: [
				// users with access to farm (including current user)
				{
					username: 'timicienio',
					email: 'timmy960072@gmail.com',
				},
				{
					username: 'rdogs1',
					email: 'rdogs1@rdogs.com',
				},
				{
					username: 'rdogs2',
					email: 'rdogs2@rdogs.com',
				},
			],
			chunks: [
				{
					// initial chunk
					coor: {
						x: 0,
						y: 0,
					},
					plants: [
						{
							type: 'Post',
							title: 'RDOGS FARM IS NICE',
							body: 'Text body',
							localCoor: {
								x: 30,
								y: 30,
							},
							authorUserName: 'timicienio',
							author: {
								username: 'timicienio',
								email: 'timmy960072@gmail.com',
							},
						},
						{
							type: 'Comment',
							body: 'YEAH',
							localCoor: {
								x: 28,
								y: 30,
							},
							authorUserName: 'timicienio',
							author: {
								username: 'timicienio',
								email: 'timmy960072@gmail.com',
							},
						},
						{
							type: 'Reaction',
							body: '🐕',
							localCoor: {
								x: 33,
								y: 30,
							},
							authorUserName: 'timicienio',
							author: {
								username: 'timicienio',
								email: 'timmy960072@gmail.com',
							},
						},
					],
				},
				{
					coor: {
						x: 1,
						y: 0,
					},
					plants: [
						{
							type: 'Post',
							title: 'RDOGS FARM IS NICE',
							body: 'Text body',
							localCoor: {
								x: 30,
								y: 30,
							},
							authorUserName: 'timicienio',
							author: {
								username: 'timicienio',
								email: 'timmy960072@gmail.com',
							},
						},
						{
							type: 'Comment',
							body: 'YEAH',
							localCoor: {
								x: 28,
								y: 30,
							},
							authorUserName: 'timicienio',
							author: {
								username: 'timicienio',
								email: 'timmy960072@gmail.com',
							},
						},
						{
							type: 'Reaction',
							body: '🐕',
							localCoor: {
								x: 33,
								y: 30,
							},
							authorUserName: 'timicienio',
							author: {
								username: 'timicienio',
								email: 'timmy960072@gmail.com',
							},
						},
					],
				},
			],
		},
		{
			farmName: 'farm2',
			type: 'Club',
			members: [
				// users with access to farm (including current user)
				{
					username: 'timicienio',
					email: 'timmy960072@gmail.com',
				},
				{
					username: 'rdogs1',
					email: 'rdogs1@rdogs.com',
				},
				{
					username: 'rdogs2',
					email: 'rdogs2@rdogs.com',
				},
			],
			chunks: [
				{
					// initial chunk
					coor: {
						x: 0,
						y: 0,
					},
					plants: [
						{
							type: 'Post',
							title: 'RDOGS FARM IS NICE',
							body: 'Text body',
							localCoor: {
								x: 30,
								y: 30,
							},
							authorUserName: 'timicienio',
							author: {
								username: 'timicienio',
								email: 'timmy960072@gmail.com',
							},
						},
						{
							type: 'Comment',
							body: 'YEAH',
							localCoor: {
								x: 28,
								y: 30,
							},
							authorUserName: 'timicienio',
							author: {
								username: 'timicienio',
								email: 'timmy960072@gmail.com',
							},
						},
						{
							type: 'Reaction',
							body: '🐕',
							localCoor: {
								x: 33,
								y: 30,
							},
							authorUserName: 'timicienio',
							author: {
								username: 'timicienio',
								email: 'timmy960072@gmail.com',
							},
						},
					],
				},
				{
					coor: {
						x: 1,
						y: 0,
					},
					plants: [
						{
							type: 'Post',
							title: 'RDOGS FARM IS NICE',
							body: 'Text body',
							localCoor: {
								x: 30,
								y: 30,
							},
							authorUserName: 'timicienio',
							author: {
								username: 'timicienio',
								email: 'timmy960072@gmail.com',
							},
						},
						{
							type: 'Comment',
							body: 'YEAH',
							localCoor: {
								x: 28,
								y: 30,
							},
							authorUserName: 'timicienio',
							author: {
								username: 'timicienio',
								email: 'timmy960072@gmail.com',
							},
						},
						{
							type: 'Reaction',
							body: '🐕',
							localCoor: {
								x: 33,
								y: 30,
							},
							authorUserName: 'timicienio',
							author: {
								username: 'timicienio',
								email: 'timmy960072@gmail.com',
							},
						},
					],
				},
			],
		},
		{
			farmName: 'farm3',
			type: 'Club',
			members: [
				// users with access to farm (including current user)
				{
					username: 'timicienio',
					email: 'timmy960072@gmail.com',
				},
				{
					username: 'rdogs1',
					email: 'rdogs1@rdogs.com',
				},
				{
					username: 'rdogs2',
					email: 'rdogs2@rdogs.com',
				},
			],
			chunks: [
				{
					// initial chunk
					coor: {
						x: 0,
						y: 0,
					},
					plants: [
						{
							type: 'Post',
							title: 'RDOGS FARM IS NICE',
							body: 'Text body',
							localCoor: {
								x: 30,
								y: 30,
							},
							authorUserName: 'timicienio',
							author: {
								username: 'timicienio',
								email: 'timmy960072@gmail.com',
							},
						},
						{
							type: 'Comment',
							body: 'YEAH',
							localCoor: {
								x: 28,
								y: 30,
							},
							authorUserName: 'timicienio',
							author: {
								username: 'timicienio',
								email: 'timmy960072@gmail.com',
							},
						},
						{
							type: 'Reaction',
							body: '🐕',
							localCoor: {
								x: 33,
								y: 30,
							},
							authorUserName: 'timicienio',
							author: {
								username: 'timicienio',
								email: 'timmy960072@gmail.com',
							},
						},
					],
				},
				{
					coor: {
						x: 1,
						y: 0,
					},
					plants: [
						{
							type: 'Post',
							title: 'RDOGS FARM IS NICE',
							body: 'Text body',
							localCoor: {
								x: 30,
								y: 30,
							},
							authorUserName: 'timicienio',
							author: {
								username: 'timicienio',
								email: 'timmy960072@gmail.com',
							},
						},
						{
							type: 'Comment',
							body: 'YEAH',
							localCoor: {
								x: 28,
								y: 30,
							},
							authorUserName: 'timicienio',
							author: {
								username: 'timicienio',
								email: 'timmy960072@gmail.com',
							},
						},
						{
							type: 'Reaction',
							body: '🐕',
							localCoor: {
								x: 33,
								y: 30,
							},
							authorUserName: 'timicienio',
							author: {
								username: 'timicienio',
								email: 'timmy960072@gmail.com',
							},
						},
					],
				},
			],
		},
	]);

	const history = useHistory();

	// useEffect(() => {});

	const onSelectFarm = key => {
		setFarmSelected(key);
		history.push('/farms/' + String(key));
	};

	const farmRoute = farm => {
		return (
			<Route path={farm.key}>
				<Farm data={farm} />
			</Route>
		);
	};

	return (
		<>
			<Container fluid>
				<Row>
					<Col sm={2}>
						<ListGroup>
							{farmList.map((farm, key) => (
								<ListGroup.Item
									eventKey={key}
									onClick={() => onSelectFarm(key)}
								>
									{farm.farmName}
								</ListGroup.Item>
							))}
						</ListGroup>
					</Col>
					<Col sm={10}>
						<Switch>
							<Route exact path='/farms'>
								Select a farm
							</Route>
							{farmList.map(farmRoute)}
						</Switch>
					</Col>
				</Row>
			</Container>
		</>
	);
};

export default Farms;
