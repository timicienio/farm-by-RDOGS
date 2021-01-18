import './Farms.css';

import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import { ListGroup, Button, Dropdown } from 'react-bootstrap';
import { IconContext } from 'react-icons';
import { BsFilePost } from 'react-icons/bs';
import { BiPlus, BiCommentDetail } from 'react-icons/bi';
import { FaRegHandPaper } from 'react-icons/fa';
import { RiPlantLine } from 'react-icons/ri';
import { GiDigDug, GiWheat } from 'react-icons/gi';
import { VscReactions } from 'react-icons/vsc';
import Farm from '../components/Farm';
import FarmToolbox from '../components/FarmToolbox';
import CreateNewFarmPopUp from '../components/CreateNewFarmPopUp';
import useFarms from '../hooks/useFarms';
import useFarm from '../hooks/useFarm';
import { unset } from 'lodash';

const Farms = ({}) => {
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
		farmListLoading,
		farmListError,
		data, // List of farms fetched
		onSelectFarm,
		selectedTool,
		onSelectTool,
		selectedPlant,
		onSelectPlant,
		createFarmName,
		createFarmType,
		history,
		showCreateFarmPopUp,
		setShowCreateFarmPopUp,
	} = useFarms();

	return (
		<IconContext.Provider value={{}}>
			<div className='map-container'>
				<Switch>
					<Route exact path='/farms'>
						Select a farm
					</Route>
					{farmListLoading ? (
						<></>
					) : (
						data.getFarms.map((farm, index) => (
							<Route path={'/farms/' + String(index)}>
								<Farm data={farm} />
							</Route>
						))
					)}
				</Switch>
				<FarmToolbox title='Farms'>
					{farmListLoading ? (
						<></>
					) : !data.getFarms.length ? (
						<span>Create your first farm!</span>
					) : (
						<div id='farm-list-switch'>
							<ListGroup>
								{data.getFarms.map((farm, key) => (
									<ListGroup.Item
										eventKey={key}
										onClick={() => onSelectFarm(key)}
									>
										{farm.farmName}
									</ListGroup.Item>
								))}
							</ListGroup>
						</div>
					)}
					<Button
						variant='primary'
						onClick={() => setShowCreateFarmPopUp(true)}
					>
						<BiPlus />
						New Farm ...
					</Button>
				</FarmToolbox>

				<FarmToolbox title='Tools'>
					<div id='farm-list-switch'>
						<ListGroup>
							<ListGroup.Item
								onClick={() => onSelectTool('DRAG')}
								active={selectedTool === 'DRAG'}
							>
								<FaRegHandPaper />
								<span className='tool-name'>Drag</span>
							</ListGroup.Item>

							<ListGroup.Item active={selectedTool === 'PLANT'}>
								<RiPlantLine />
								<span className='tool-name'>Plant</span>
								<ListGroup id='plant-type-switch' horizontal>
									<ListGroup.Item
										style={{ padding: 0 }}
										onClick={() => {
											onSelectTool('PLANT');
											onSelectPlant('POST');
										}}
										active={
											selectedTool === 'PLANT' &&
											selectedPlant === 'POST'
										}
										variant='secondary'
									>
										<BsFilePost style={{ margin: 10 }} />
									</ListGroup.Item>
									<ListGroup.Item
										style={{ padding: 0 }}
										onClick={() => {
											onSelectTool('PLANT');
											onSelectPlant('COMMENT');
										}}
										active={
											selectedTool === 'PLANT' &&
											selectedPlant === 'COMMENT'
										}
										variant='secondary'
									>
										<BiCommentDetail
											style={{ margin: 10 }}
										/>
									</ListGroup.Item>
									<ListGroup.Item
										style={{ padding: 0 }}
										onClick={() => {
											onSelectTool('PLANT');
											onSelectPlant('REACTION');
										}}
										active={
											selectedTool === 'PLANT' &&
											selectedPlant === 'REACTION'
										}
										variant='secondary'
									>
										<VscReactions style={{ margin: 10 }} />
									</ListGroup.Item>
								</ListGroup>
							</ListGroup.Item>

							<ListGroup.Item
								onClick={() => onSelectTool('MODIFY')}
								active={selectedTool === 'MODIFY'}
							>
								<GiDigDug />
								<span className='tool-name'>Edit</span>
							</ListGroup.Item>

							<ListGroup.Item
								onClick={() => onSelectTool('HARVEST')}
								active={selectedTool === 'HARVEST'}
							>
								<GiWheat />
								<span className='tool-name'>Harvest</span>
							</ListGroup.Item>
						</ListGroup>
					</div>
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
		</IconContext.Provider>
	);
};

export default Farms;
