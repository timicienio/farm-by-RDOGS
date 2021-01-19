import './Farms.css';

import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import { ListGroup, Button, Dropdown } from 'react-bootstrap';
import { IconContext } from 'react-icons';
import { BsFilePost } from 'react-icons/bs';
import { BiPlus, BiCommentDetail } from 'react-icons/bi';
import { FaRegHandPaper } from 'react-icons/fa';
import { RiPlantLine, RiMoreLine } from 'react-icons/ri';
import { GiDigDug, GiWheat } from 'react-icons/gi';
import { VscReactions } from 'react-icons/vsc';
import Farm from '../components/Farm';
import FarmToolbox from '../components/FarmToolbox';
import CreateNewFarmPopUp from '../components/CreateNewFarmPopUp';
import useFarms from '../hooks/useFarms';
import useFarm from '../hooks/useFarm';
import { unset } from 'lodash';

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
						data.getUserData.farms.map((farm, index) => (
							<Route path={'/farms/' + String(index)}>
								<Farm
									data={farm}
									selectedTool={selectedTool}
									selectedPlant={selectedPlant}
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
											active={selectedFarm === key}
											className='farm-list-item'
										>
											<span>{farm.farmName}</span>

											{selectedFarm === key ? (
												<Button
													variant='info'
													id='manage-farm-button'
													size='sm'
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
						New Farm ...
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
