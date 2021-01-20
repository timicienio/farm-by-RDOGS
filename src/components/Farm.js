import React from 'react';
import FarmOfClub from './FarmOfClub';
// import Draggable from 'react-draggable';
import useFarm from '../hooks/useFarm';
import ManageFarmPopUp from '../components/ManageFarmPopUp';
import AddPostPopUp from './AddPostPopUp';
import AddCommentPopUp from './AddCommentPopUp';
import AddReactionPopUp from './AddReactionPopUp';
import './Farm.css';

function Farm({
	data,
	selectedTool,
	selectedPlant,
	showManageFarmPopUp,
	setShowManageFarmPopUp,
}) {
	// console.log(data.farmType);
	const [
		farmData, //include id, farmName, farmType, members, chunks, plants
		friends, //this user's all friends
		getFarmLoading,
		leaveFarm,
		createNewPlant,
		editPlant,
		deletePlant,
		addNewMember,

		handleChunkCellClicked,
		handleChunkCellHover,
		handlePostClicked,
		handlePostHover,

		showPositionCue,
		setShowPositionCue,
		positionCueValidity,
		positionCueType,

		showAddPlantPopUp,
		setShowAddPlantPopUp,
		handleAddPlantSubmit,
	] = useFarm(data.id, selectedTool, selectedPlant);
	// console.log(showPositionCue);
	switch (data.farmType) {
		case 'Club':
			return (
				<>
					<AddPostPopUp
						show={showAddPlantPopUp && selectedPlant === 'POST'}
						setShow={setShowAddPlantPopUp}
						handlePopUpSubmit={handleAddPlantSubmit}
					/>
					<AddCommentPopUp
						show={showAddPlantPopUp && selectedPlant === 'COMMENT'}
						setShow={setShowAddPlantPopUp}
						handlePopUpSubmit={handleAddPlantSubmit}
					/>
					<AddReactionPopUp
						show={showAddPlantPopUp && selectedPlant === 'REACTION'}
						setShow={setShowAddPlantPopUp}
						handlePopUpSubmit={handleAddPlantSubmit}
					/>
					<ManageFarmPopUp
						data={farmData}
						loading={getFarmLoading}
						show={showManageFarmPopUp}
						setShow={setShowManageFarmPopUp}
						addNewMember={addNewMember}
						leaveFarm={leaveFarm}
					/>
					<FarmOfClub
						data={farmData}
						loading={getFarmLoading}
						createPlant={createNewPlant}
						deletePlant={deletePlant}
						handleChunkCellClicked={handleChunkCellClicked}
						handleChunkCellHover={handleChunkCellHover}
						handlePostClicked={handlePostClicked}
						handlePostHover={handlePostHover}
						selectedTool={selectedTool}
						selectedPlant={selectedPlant}
						showPositionCue={showPositionCue}
						setShowPositionCue={setShowPositionCue}
						positionCueValidity={positionCueValidity}
						positionCueType={positionCueType}
					/>
				</>
			);
		case 'Timeline':
		//TODO
	}
}

export default Farm;
