import './Farms.css';

import React, { useEffect, useState } from 'react';
import { Redirect, Route, Switch, useParams } from 'react-router-dom';
import { ListGroup, Button, Dropdown } from 'react-bootstrap';
import { IconContext } from 'react-icons';
import { BsFilePost } from 'react-icons/bs';
import { BiPlus, BiCommentDetail, BiMove, BiPencil } from 'react-icons/bi';
import { FaRegHandPaper } from 'react-icons/fa';
import { RiPlantLine, RiMoreLine } from 'react-icons/ri';
import { GiDigDug, GiWheat } from 'react-icons/gi';
import { VscReactions } from 'react-icons/vsc';
import Farm from '../components/Farm';
import FarmToolbox from '../components/FarmToolbox';
import CreateNewFarmPopUp from '../components/CreateNewFarmPopUp';
import useFarms from '../hooks/useFarms';

const Farms = ({}) => {
	const {
		handleNewFarmChange,
		createNewFarm,

		farmListLoading,
		farmListError,
		data, // List of farms fetched

		selectedFarm,
		onSelectFarm,
		selectedTool,
		onSelectTool,
		selectedPlant,
		onSelectPlant,
		selectedEdit, // 'MOVE', 'REWRITE'
		onSelectEdit,

		createFarmName,
		createFarmType,
		createFarmAlert,

		// addFarmMemberName,
		// handleAddFarmMemberChange,
		// leaveFarm,

		showCreateFarmAlert,
		history,
		showCreateFarmPopUp,
		setShowCreateFarmPopUp,
		showManageFarmPopUp,
		setShowManageFarmPopUp,
	} = useFarms();

	// const [selectedFarmIndex, setSelectedFarmIndex] = useState(-1);
	// // console.log(selectedFarmIndex);

	return (
		<IconContext.Provider value={{}}>
			<div className='map-container'>
				<Switch>
					<Route exact path='/farms/'>
						<Redirect to='/farms/-1' />
					</Route>
					<Route exact path='/farms/-1'>
						<div className='map-not-selected'>
							<h1 className='map-not-selected-text'>
								Select a farm...
							</h1>
						</div>
					</Route>
					{farmListLoading ? (
						<></>
					) : (
						data.getUserData.farms.map((farm, index) => (
							<Route path={'/farms/' + String(index)}>
								<Farm
									data={farm}
									selectedTool={selectedTool}
									selectedPlant={selectedPlant}
									selectedEdit={selectedEdit}
									showManageFarmPopUp={showManageFarmPopUp}
									setShowManageFarmPopUp={
										setShowManageFarmPopUp
									}
									// setSelectedFarmIndex={setSelectedFarmIndex}
								/>
							</Route>
						))
					)}
				</Switch>

				<FarmToolbox
					title='Farms'
					id='farm-list'
					defaultPosition={{ x: 0, y: 0 }}
				>
					{farmListLoading ? (
						<></>
					) : !data.getUserData.farms.length ? (
						<span id='farm-list-switch'>
							Create your first farm!
						</span>
					) : (
						<div id='farm-list-switch'>
							<ListGroup>
								{data.getUserData.farms.map((farm, key) => (
									<>
										<ListGroup.Item
											eventKey={key}
											onClick={() => onSelectFarm(key)}
											active={selectedFarm == key}
											className='farm-list-item'
										>
											<span>{farm.farmName}</span>

											{selectedFarm === key ? (
												<Button
													variant='info'
													id='manage-farm-button'
													size='sm'
													onClick={() => {
														// console.log(
														// 	'show manage'
														// );
														setShowManageFarmPopUp(
															true
														);
													}}
												>
													<RiMoreLine
														size='0.7em'
														id='manage-farm-button'
													/>
												</Button>
											) : (
												<></>
											)}
										</ListGroup.Item>
									</>
								))}
							</ListGroup>
						</div>
					)}
					<Button
						variant='primary'
						onMouseUp={() => setShowCreateFarmPopUp(true)}
					>
						<BiPlus />
						New Farm
					</Button>
				</FarmToolbox>

				<FarmToolbox title='Tools' defaultPosition={{ x: 220, y: 0 }}>
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
								<span className='tool-name' id='grow-tool-text'>
									Grow
								</span>
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

							<ListGroup.Item active={selectedTool === 'EDIT'}>
								<GiDigDug />
								<span className='tool-name'>Edit</span>
								<ListGroup id='edit-type-switch' horizontal>
									<ListGroup.Item
										style={{ padding: 0 }}
										onClick={() => {
											onSelectTool('EDIT');
											onSelectEdit('MOVE');
										}}
										active={
											selectedTool === 'EDIT' &&
											selectedEdit === 'MOVE'
										}
										variant='secondary'
									>
										<BiMove style={{ margin: 10 }} />
									</ListGroup.Item>
									<ListGroup.Item
										style={{ padding: 0 }}
										onClick={() => {
											onSelectTool('EDIT');
											onSelectEdit('REWRITE');
										}}
										active={
											selectedTool === 'EDIT' &&
											selectedEdit === 'REWRITE'
										}
										variant='secondary'
									>
										<BiPencil style={{ margin: 10 }} />
									</ListGroup.Item>
								</ListGroup>
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
					showAlert={showCreateFarmAlert}
					alert={createFarmAlert}
				/>
			</div>
		</IconContext.Provider>
	);
};

export default Farms;
