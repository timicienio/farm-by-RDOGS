import React from 'react';
import FarmOfClub from './FarmOfClub';
// import Draggable from 'react-draggable';
import useFarm from '../hooks/useFarm';
import ManageFarmPopUp from '../components/ManageFarmPopUp';
import AddPostPopUp from './AddPostPopUp';
import AddCommentPopUp from './AddCommentPopUp';
import AddReactionPopUp from './AddReactionPopUp';
import RewritePostPopUp from './RewritePostPopUp';
import RewriteCommentPopUp from './RewriteCommentPopUp';
import './Farm.css';

function Farm({
	data,
	selectedTool,
	selectedPlant,
	selectedEdit,
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
		addChunk,
		addChunkError,
		showAddChunkError,
		addNewMember,
		addMemberError,
		showAddMemberError,

		handleChunkCellClicked,
		handleChunkCellHover,
		handlePlantClicked,
		handlePlantHover,

		showPositionCue,
		setShowPositionCue,
		positionCueValidity,
		positionCueType,

		// Grow
		showAddPlantPopUp,
		setShowAddPlantPopUp,
		handleAddPlantSubmit,

		//Edit > Move
		movePlantId,

		// Edit > Rewrite
		showRewritePlantPopUp,
		setShowRewritePlantPopUp,
		handleRewritePlantSubmit,
		clickedPlant,
	] = useFarm(data.id, selectedTool, selectedPlant, selectedEdit);

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
					<RewritePostPopUp
						show={
							showRewritePlantPopUp &&
							clickedPlant.plantType === 'Post'
						}
						setShow={setShowRewritePlantPopUp}
						handlePopUpSubmit={handleRewritePlantSubmit}
						oldTitle={clickedPlant.title}
						oldContent={clickedPlant.body}
					/>
					<RewriteCommentPopUp
						show={
							showRewritePlantPopUp &&
							clickedPlant.plantType === 'Comment'
						}
						setShow={setShowRewritePlantPopUp}
						handlePopUpSubmit={handleRewritePlantSubmit}
						oldTitle={clickedPlant.title}
						oldContent={clickedPlant.body}
					/>
					<ManageFarmPopUp
						data={farmData}
						friends={friends}
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
						handlePlantClicked={handlePlantClicked}
						handlePlantHover={handlePlantHover}
						selectedTool={selectedTool}
						selectedPlant={selectedPlant}
						showPositionCue={showPositionCue}
						setShowPositionCue={setShowPositionCue}
						positionCueValidity={positionCueValidity}
						positionCueType={positionCueType}
						movePlantId={movePlantId}
					/>
				</>
			);
		case 'Timeline':
		//TODO
	}
}

export default Farm;
