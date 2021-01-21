import React, { useState, useEffect, useContext } from 'react';
import { useQuery, useMutation, useSubscription } from '@apollo/react-hooks';
import { AuthContext } from '../context/auth';
import {
	CREATE_PLANT_MUTATION,
	DELETE_PLANT_MUTATION,
	LEAVE_FARM_MUTATION,
	ADD_FARMER_MUTATION,
	GET_FARM_QUERY,
	GET_FRIENDS_MUTATION,
	FARM_SUBSCRIPTION,
	EDIT_PLANT_MUTATION,
	ADD_CHUNK_MUTATION,
} from '../graphql';

const useFarm = (farmId, selectedTool, selectedPlant, selectedEdit) => {
	// // console.log(typeof farmId);
	// const [test, setTest] = useState(false);
	const [, updateState] = useState();
	const [showPositionCue, setShowPositionCue] = useState(false);
	const [positionCueValidity, setPositionCueValidity] = useState(false);
	const [positionCueType, setPositionCueType] = useState('post');
	const [clickedCell, setClickedCell] = useState({});
	const [clickedPlant, setClickedPlant] = useState({ title: '', body: '' });
	const [showAddMemberError, setShowAddMemberError] = useState(false);
	const [friends, setFriends] = useState([]);
	const [hasGetFriend, setHasGetFriend] = useState(false);
	const [showAddPlantPopUp, setShowAddPlantPopUp] = useState(false);
	const [selectedMovePlant, setSelectedMovePlant] = useState(false);
	const [movePlantId, setMovePlantId] = useState(-1);
	const [showRewritePlantPopUp, setShowRewritePlantPopUp] = useState(false);
	const [showHarvestPlantPopUp, setShowHarvestPlantPopUp] = useState(false);
	const { user } = useContext(AuthContext);
	const {
		loading: getFarmLoading,
		error: getFarmError,
		data: farmData,
		//subscribeToMore,
	} = useQuery(GET_FARM_QUERY, {
		variables: {
			farmId: farmId,
		},
		// pollInterval: 500,
	});

	const [getFriends] = useMutation(GET_FRIENDS_MUTATION);
	const [createPlant] = useMutation(CREATE_PLANT_MUTATION);
	const [editOldPlant] = useMutation(EDIT_PLANT_MUTATION);
	const [deleteOldPlant] = useMutation(DELETE_PLANT_MUTATION);
	const [leaveCurrentFarm] = useMutation(LEAVE_FARM_MUTATION);
	const [addNewChunk] = useMutation(ADD_CHUNK_MUTATION);
	const [addChunkError, setAddChunkError] = useState('');
	const [showAddChunkError, setShowAddChunkError] = useState(false);

	const { data, loading } = useSubscription(FARM_SUBSCRIPTION, {
		variables: { farmId },
		onSubscriptionData: ({ subscriptionData: { data } }) => {
			// console.log(data);
			if (data.farm.mutation === 'CREATED_PLANT') {
				farmData.getFarm.plants.push(data.farm.plant);
			} else if (data.farm.mutation === 'EDITED_PLANT') {
				farmData.getFarm.plants[data.farm.index] = data.farm.plant;
				// console.log("yee", farmData.getFarm.plants[data.farm.index])
			} else if (data.farm.mutation === 'DELETED_PLANT') {
				farmData.getFarm.plants.splice(data.farm.index, 1);
			}
			updateState({});
		},
	});

	// useEffect(() => {
	// 	if (!loading) {
	// 		// // console.log("yee", data.farm);
	// 		// // console.log("farmData", farmData);

	// 	}
	// }, [data, loading]);

	function checkPlantCollision(
		chunkCoordinates,
		cellCoordinates,
		cueSize,
		ignorePlantId = -1
	) {
		let plantSize;
		const cueAbsolutePosition = {
			x: chunkCoordinates.x * 32 + cellCoordinates.x,
			y: chunkCoordinates.y * 32 + cellCoordinates.y,
		};

		for (let i = 0; i < farmData.getFarm.plants.length; i++) {
			let plant = farmData.getFarm.plants[i];
			if (plant.id === ignorePlantId) continue;
			// // console.log(plant);
			const plantAbsolutePosition = {
				x: plant.chunkCoordinates.x * 32 + plant.plantCoordinates.x,
				y: plant.chunkCoordinates.y * 32 + plant.plantCoordinates.y,
			};

			switch (plant.plantType) {
				case 'Post':
					plantSize = 4;

					break;
				case 'Comment':
					plantSize = 2;

					break;
				case 'Reaction':
					plantSize = 1;
					break;
				default:
			}

			const xCollide =
				(cueAbsolutePosition.x < plantAbsolutePosition.x &&
					cueAbsolutePosition.x + cueSize >
						plantAbsolutePosition.x) ||
				(cueAbsolutePosition.x >= plantAbsolutePosition.x &&
					plantAbsolutePosition.x + plantSize >
						cueAbsolutePosition.x);

			const yCollide =
				(cueAbsolutePosition.y < plantAbsolutePosition.y &&
					cueAbsolutePosition.y + cueSize >
						plantAbsolutePosition.y) ||
				(cueAbsolutePosition.y >= plantAbsolutePosition.y &&
					plantAbsolutePosition.y + plantSize >
						cueAbsolutePosition.y);

			if (xCollide && yCollide) {
				return false;
			}
		}
		return true;
	}

	const leaveFarm = async () => {
		try {
			const res = await leaveCurrentFarm({
				variables: {
					farmId: farmId,
				},
			});
			// console.log(res);
		} catch (err) {
			//alert(err.graphQLErrors[0].message);
			// console.log(err.graphQLErrors[0].message);
		}
	};

	const [addFarmer] = useMutation(ADD_FARMER_MUTATION);
	const [addMemberError, setAddMemberError] = useState('');

	const getFriendsList = async () => {
		try {
			const res = await getFriends();
			setFriends(res.data.getFriends);
			setHasGetFriend(true);
		} catch (err) {
			//// console.log(err);
			alert(err);
		}
	};

	//add a member to this farm
	const addNewMember = async friendId => {
		setShowAddMemberError(false);
		try {
			const res = await addFarmer({
				variables: {
					farmId: farmId,
					friendId: friendId,
				},
			});
			// console.log(res);
		} catch (err) {
			// console.log(err);
			setAddMemberError(err.graphQLErrors[0].message);
			setShowAddMemberError(true);
		}
		// }
	};

	// create a plant
	const createNewPlant = async (
		plantType,
		title,
		body,
		chunkX,
		chunkY,
		plantX,
		plantY
	) => {
		try {
			//// console.log(plantType, title, body, chunkX, chunkY, plantX, plantY);
			const res = await createPlant({
				variables: {
					farmId: farmId,
					plantType: plantType,
					title: title,
					body: body,
					chunkCoordinates: {
						x: chunkX,
						y: chunkY,
					},
					plantCoordinates: {
						x: plantX,
						y: plantY,
					},
				},
			});
		} catch (err) {
			console.error('createPlant Error: ', err);
		}
	};

	const editPlant = async (
		plantId,
		plantType,
		title,
		body,
		chunkX,
		chunkY,
		plantX,
		plantY
	) => {
		try {
			// // console.log(plantId);
			const res = await editOldPlant({
				variables: {
					farmId: farmId,
					plantId: plantId,
					plantType: plantType,
					title: title,
					body: body,
					chunkCoordinates: {
						x: chunkX,
						y: chunkY,
					},
					plantCoordinates: {
						x: plantX,
						y: plantY,
					},
				},
			});
			// // console.log(res);
		} catch (err) {
			console.error('editPlant Error: ', err);
		}
	};

	const deletePlant = async plantId => {
		try {
			const res = await deleteOldPlant({
				variables: {
					farmId: farmId,
					plantId: plantId,
				},
			});
			// // console.log('deletePlant result: ', res);
		} catch (err) {
			console.error('deletePlant Error: ', err.graphQLErrors[0].message);
		}
	};

	const addChunk = async (chunkX, chunkY) => {
		setShowAddChunkError(false);
		try {
			const res = await addNewChunk({
				variables: {
					farmId: farmId,
					chunkCoordinates: {
						x: chunkX,
						y: chunkY,
					},
				},
			});
			// // console.log(res);
		} catch (err) {
			console.error(err.graphQLErrors[0].message);
			setAddChunkError(err.graphQLErrors[0].message);
			setShowAddChunkError(true);
		}
	};

	const handleChunkCellClicked = async coordinates => {
		// // console.log('click', coordinates);
		setClickedCell(coordinates);
		switch (selectedTool) {
			case 'PLANT':
				if (positionCueValidity) {
					setShowAddPlantPopUp(true);
				}
				break;
			case 'EDIT':
				if (selectedEdit === 'MOVE' && selectedMovePlant) {
					await editPlant(
						clickedPlant.id,
						clickedPlant.plantType,
						clickedPlant.title,
						clickedPlant.content,
						coordinates.chunkCoordinates.x,
						coordinates.chunkCoordinates.y,
						coordinates.cellCoordinates.x,
						coordinates.cellCoordinates.y
					);
					setSelectedMovePlant(false);
					setClickedPlant({ title: '', body: '' });
				}
				break;
			// case 'HARVEST':
			// 	//TODO
			// 	break;
		}
	};

	const handleChunkCellHover = ({ chunkCoordinates, cellCoordinates }) => {
		// // console.log('hover', selectedMovePlant);
		if (selectedTool === 'PLANT') {
			let valid = true;
			let cueSize;

			switch (selectedPlant) {
				case 'POST':
					cueSize = 4;
					setPositionCueType('post');
					break;
				case 'COMMENT':
					cueSize = 2;
					setPositionCueType('comment');
					break;
				case 'REACTION':
					cueSize = 1;
					setPositionCueType('reaction');
					break;
				default:
					console.error('Invalid selected plant');
			}
			// check collision with farm border
			if (cellCoordinates.x + cueSize > 32) {
				valid = false;
				for (let i = 0; i < farmData.getFarm.chunks.length; i++) {
					const chunk = farmData.getFarm.chunks[i];
					if (chunk.coordinates.x === chunkCoordinates.x + 1) {
						valid = true;
						break;
					}
				}
			}
			if (cellCoordinates.y + cueSize > 32) {
				valid = false;
				for (let i = 0; i < farmData.getFarm.chunks.length; i++) {
					const chunk = farmData.getFarm.chunks[i];
					if (chunk.coordinates.y === chunkCoordinates.y + 1) {
						valid = true;
						break;
					}
				}
			}

			// check collision with other plants
			if (valid) {
				valid = checkPlantCollision(
					chunkCoordinates,
					cellCoordinates,
					cueSize
				);
			}
			// // console.log(valid);
			if (valid) {
				setPositionCueValidity(true);
			} else {
				setPositionCueValidity(false);
			}
			// // console.log('show');
			setShowPositionCue(true);
		} else if (
			selectedTool === 'EDIT' &&
			selectedEdit === 'MOVE' &&
			selectedMovePlant
		) {
			// console.log('checking move pos');
			let valid = true;
			let cueSize;

			switch (clickedPlant.plantType) {
				case 'Post':
					cueSize = 4;
					setPositionCueType('post');
					break;
				case 'Comment':
					cueSize = 2;
					setPositionCueType('comment');
					break;
				case 'Reaction':
					cueSize = 1;
					setPositionCueType('reaction');
					break;
				default:
					// console.log('Invalid selected plant');
			}
			// check collision with farm border
			if (cellCoordinates.x + cueSize > 32) {
				valid = false;
				for (let i = 0; i < farmData.getFarm.chunks.length; i++) {
					const chunk = farmData.getFarm.chunks[i];
					if (chunk.coordinates.x === chunkCoordinates.x + 1) {
						valid = true;
						break;
					}
				}
			}
			if (cellCoordinates.y + cueSize > 32) {
				valid = false;
				for (let i = 0; i < farmData.getFarm.chunks.length; i++) {
					const chunk = farmData.getFarm.chunks[i];
					if (chunk.coordinates.y === chunkCoordinates.y + 1) {
						valid = true;
						break;
					}
				}
			}

			// check collision with other plants
			if (valid) {
				valid = checkPlantCollision(
					chunkCoordinates,
					cellCoordinates,
					cueSize,
					clickedPlant.id
				);
			}
			// // console.log(valid);
			if (valid) {
				setPositionCueValidity(true);
			} else {
				setPositionCueValidity(false);
			}
			// // console.log('show');
			setShowPositionCue(true);
		} else {
			// // console.log('unshow');
			setShowPositionCue(false);
		}
	};

	const handleAddPlantSubmit = async (title, content) => {
		switch (selectedPlant) {
			case 'POST':
				await createNewPlant(
					'Post',
					title,
					content,
					clickedCell.chunkCoordinates.x,
					clickedCell.chunkCoordinates.y,
					clickedCell.cellCoordinates.x,
					clickedCell.cellCoordinates.y
				);
				break;
			case 'COMMENT':
				await createNewPlant(
					'Comment',
					title,
					content,
					clickedCell.chunkCoordinates.x,
					clickedCell.chunkCoordinates.y,
					clickedCell.cellCoordinates.x,
					clickedCell.cellCoordinates.y
				);
				break;
			case 'REACTION':
				await createNewPlant(
					'Reaction',
					title,
					content,
					clickedCell.chunkCoordinates.x,
					clickedCell.chunkCoordinates.y,
					clickedCell.cellCoordinates.x,
					clickedCell.cellCoordinates.y
				);
				break;
		}
	};

	const handlePlantClicked = index => {
		setClickedPlant(farmData.getFarm.plants[index]);
		// console.log(clickedPlant);
	};

	useEffect(() => {
		if (clickedPlant !== { title: '', body: '' }) {
			switch (selectedTool) {
				case 'EDIT':
					switch (selectedEdit) {
						case 'MOVE':
							if (
								!selectedMovePlant &&
								clickedPlant.author === user.username
							) {
								setSelectedMovePlant(true);
							}

							break;
						case 'REWRITE':
							if (
								(clickedPlant.plantType === 'Post' ||
									clickedPlant.plantType === 'Comment') &&
								clickedPlant.author === user.username
							) {
								setShowRewritePlantPopUp(true);
							}
							break;
						default:
							break;
					}
					break;
				case 'HARVEST':
					{
						if (clickedPlant.author === user.username) {
							setShowHarvestPlantPopUp(true);
						}
					}
					break;
			}
		}
	}, [clickedPlant]);

	const handleRewritePlantSubmit = async (title, content) => {
		switch (clickedPlant.plantType) {
			case 'Post':
				await editPlant(
					clickedPlant.id,
					'Post',
					title,
					content,
					clickedPlant.chunkCoordinates.x,
					clickedPlant.chunkCoordinates.y,
					clickedPlant.plantCoordinates.x,
					clickedPlant.plantCoordinates.y
				);
				break;
			case 'Comment':
				await editPlant(
					clickedPlant.id,
					'Comment',
					'(Empty)',
					content,
					clickedPlant.chunkCoordinates.x,
					clickedPlant.chunkCoordinates.y,
					clickedPlant.plantCoordinates.x,
					clickedPlant.plantCoordinates.y
				);
				break;
		}
	};

	const handleHarvestPlantSubmit = async () => {
		await deletePlant(clickedPlant.id);
	};

	const handlePlantHover = index => {};

	// test
	// useEffect(() => {
	// 	if (!test && !getFarmLoading) {
	// 		// console.log('farmName:', farmData.farmName);
	// 		// console.log('farmType:', farmData.farmType);
	// 		// console.log('members:', farmData.members);
	// 		// console.log('chunks:', farmData.chunks);
	// 		// console.log('plants:', farmData.plants);
	// 		setTest(true);
	// 	}
	// }, [test]);

	useEffect(() => {
		if (!hasGetFriend) {
			getFriendsList();
		}
	}, [hasGetFriend]);
	useEffect(() => {
		if (
			selectedMovePlant &&
			selectedTool === 'EDIT' &&
			selectedEdit === 'MOVE'
		) {
			setMovePlantId(clickedPlant.id);
		} else {
			setShowPositionCue(false);
			setMovePlantId(-1);
		}
	}, [selectedTool, selectedEdit, selectedMovePlant, clickedPlant]);
	useEffect(() => {
		if (selectedTool === 'DRAG') {
			setClickedPlant({ title: '', body: '' });
			setSelectedMovePlant(false);
		}
	}, [selectedTool]);

	return [
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

		// Edit > Move
		movePlantId,

		// Edit > Rewrite
		showRewritePlantPopUp,
		setShowRewritePlantPopUp,
		handleRewritePlantSubmit,
		clickedPlant,

		// Harvest
		showHarvestPlantPopUp,
		setShowHarvestPlantPopUp,
		handleHarvestPlantSubmit,
	];
};

export default useFarm;
