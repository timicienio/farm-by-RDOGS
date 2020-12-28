import './Farms.css';

import React, { useEffect, useState } from 'react';
import { Link, Route, Switch, useHistory } from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Draggable from 'react-draggable';
import Farm from '../components/Farm';
import * as MdIcons from 'react-icons/md';
import { IconContext } from 'react-icons/lib';
//import { getFarmList } from '../axios';

const Farms = ({ userData }) => {
	const [farmSelected, setFarmSelected] = useState(-1);
	// const [friendList, setFriendList] = useState([]);
	const [farmList, setFarmList] = useState([
		{
			farmName: 'RDOGS Working Group',
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
							id: 0,
							type: 'Post',
							title: 'RDOGS FARM IS NICE',
							body: 'Text body',
							localCoor: {
								x: 10,
								y: 10,
							},
							authorUserName: 'timicienio',
							author: {
								username: 'timicienio',
								email: 'timmy960072@gmail.com',
							},
						},
						{
							id: 1,
							type: 'Comment',
							body: 'YEAH',
							localCoor: {
								x: 14,
								y: 10,
							},
							authorUserName: 'timicienio',
							author: {
								username: 'timicienio',
								email: 'timmy960072@gmail.com',
							},
						},
						{
							id: 2,
							type: 'Reaction',
							body: '🐕',
							localCoor: {
								x: 16,
								y: 10,
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
							id: 0,
							type: 'Post',
							title: 'RDOGS FARM IS NICE',
							body: 'Text body',
							localCoor: {
								x: 8,
								y: 8,
							},
							authorUserName: 'timicienio',
							author: {
								username: 'timicienio',
								email: 'timmy960072@gmail.com',
							},
						},
						{
							id: 1,
							type: 'Comment',
							body: 'YEAH',
							localCoor: {
								x: 8,
								y: 12,
							},
							authorUserName: 'timicienio',
							author: {
								username: 'timicienio',
								email: 'timmy960072@gmail.com',
							},
						},
						{
							id: 2,
							type: 'Reaction',
							body: '🐕',
							localCoor: {
								x: 8,
								y: 14,
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
			farmName: 'IM B08',
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
							id: 0,
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
							id: 1,
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
							id: 2,
							type: 'Reaction',
							body: '🐕',
							localCoor: {
								x: 20,
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
							id: 0,
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
							id: 1,
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
							id: 3,
							type: 'Reaction',
							body: '🐕',
							localCoor: {
								x: 20,
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
			farmName: "I don't know how to name a club",
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
							id: 0,
							type: 'Post',
							title: 'RDOGS FARM IS NICE',
							body: 'Text body',
							localCoor: {
								x: 10,
								y: 10,
							},
							authorUserName: 'timicienio',
							author: {
								username: 'timicienio',
								email: 'timmy960072@gmail.com',
							},
						},
						{
							id: 1,
							type: 'Comment',
							body: 'YEAH',
							localCoor: {
								x: 10,
								y: 14,
							},
							authorUserName: 'timicienio',
							author: {
								username: 'timicienio',
								email: 'timmy960072@gmail.com',
							},
						},
						{
							id: 2,
							type: 'Reaction',
							body: '🐕',
							localCoor: {
								x: 10,
								y: 15,
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
								x: 0,
								y: 2,
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
								x: 0,
								y: 6,
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
								x: 0,
								y: 8,
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

	return (
		<>
			<div className='map-container'>
				<Switch>
					<Route exact path='/farms'>
						Select a farm
					</Route>
					{farmList.map((farm, index) => (
						<Route path={'/farms/' + String(index)}>
							<Farm data={farm} />
						</Route>
					))}
				</Switch>
				<Draggable
					axis='both'
					handle='.farm-list-handle'
					defaultPosition={{ x: 0, y: 0 }}
					position={null}
					bounds='parent'
				>
					<div className='farm-list'>
						<div className='farm-list-handle'>
							<IconContext.Provider value={{ color: '#c8f0ef' }}>
								<MdIcons.MdDragHandle />
							</IconContext.Provider>
						</div>
						<div className='farm-list-content'>
							<div className='toolbox-title'>Farms</div>
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
						</div>
					</div>
				</Draggable>
			</div>
		</>
	);
};

export default Farms;
