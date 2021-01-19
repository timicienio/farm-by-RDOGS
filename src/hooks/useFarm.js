import React, { useState, useEffect, useContext } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { AuthContext } from '../context/auth';
import {
	CREATE_PLANT_MUTATION,
	DELETE_PLANT_MUTATION,
	LEAVE_FARM_MUTATION,
	SEND_FARM_INVITATION_MUTATION,
	GET_FARM_QUERY,
	GET_FRIENDS_MUTATION,
	FARM_SUBSCRIPTION,
	EDIT_PLANT_MUTATION,
} from '../graphql';

const useFarm = (farmId, selectedTool, selectedPlant) => {
	// console.log(typeof farmId);
	// const [test, setTest] = useState(false);
	const [showPositionCue, setShowPositionCue] = useState(false);
	const [positionCueValidity, setPositionCueValidity] = useState(false);
	const [positionCueType, setPositionCueType] = useState('post');
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
		pollInterval: 500,
	});

	const [getFriends] = useMutation(GET_FRIENDS_MUTATION);
	const [createPlant] = useMutation(CREATE_PLANT_MUTATION);
	const [editOldPlant] = useMutation(EDIT_PLANT_MUTATION);
	const [deleteOldPlant] = useMutation(DELETE_PLANT_MUTATION);
	const [leaveCurrentFarm] = useMutation(LEAVE_FARM_MUTATION);

	// useEffect(()=>{
	// 	alert("subscription procedure.")
	// 	if(!getFarmLoading){
	// 		subscribeToMore({
	// 			document: FARM_SUBSCRIPTION,
	// 			variables: {farmId: farmId},
	// 			updateQuery: (prev, { subscriptionData }) => {
	// 				if (!subscriptionData.data) return prev
	// 				alert("sth change");
	// 				console.log("subscriptionData: ", subscriptionData);
	// 				let plants = prev.getFarm.plants;
	// 				let changePlant = subscriptionData.data.farm.plant;
	// 				switch(subscriptionData.data.mutation){
	// 					case 'CREATED_PLANT':
	// 						return { plants: [plants, changePlant]};
	// 					case 'EDITED_PLANT':
	// 						let newPlants = plants.splice(subscriptionData.data.farm.index, 1);
	// 						newPlants = newPlants.splice(subscriptionData.data.farm.index, 1, changePlant);
	// 						return {plants: [newPlants]};
	// 					case 'DELETED_PLANT':
	// 						const newPlants2 = plants.splice(subscriptionData.data.farm.index, 1);
	// 						return {plants: [newPlants2]};
	// 					default:
	// 						return {plants:[plants]};
	// 				}
	// 			},
	// 			onError: err => console.error(err)
	// 		})
	// 	}
	// }, [subscribeToMore, getFarmLoading])

	const leaveFarm = async () => {
		try {
			const res = await leaveCurrentFarm({
				variables: {
					farmId: farmId,
				},
			});
			console.log(res);
		} catch (err) {
			alert(err.graphQLErrors[0].message);
			console.log(err.graphQLErrors[0].message);
		}
	};

	const [sendFarmInvitation] = useMutation(SEND_FARM_INVITATION_MUTATION);
	const [friends, setFriends] = useState([]);
	const [hasGetFriend, setHasGetFriend] = useState(false);

	const getFriendsList = async () => {
		try {
			const res = await getFriends();
			setFriends(res.data.getFriends);
			setHasGetFriend(true);
		} catch (err) {
			//console.log(err);
			alert(err);
		}
	};

	//add a member to this farm
	const addNewMember = async friendName => {
		let id = '';
		for (let i = 0; i < friends.length - 1; i++) {
			if (friends[i].username === friendName) {
				id = friends[i].id;
				break;
			}
		}
		try {
			const res = await sendFarmInvitation({
				variables: {
					friendId: id,
				},
			});
			console.log(res);
		} catch (err) {
			console.log(err);
			alert(err.graphQLErrors[0].message);
		}
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
			const res = await createPlant({
				plantInput: {
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
			console.log(res);
		} catch (err) {
			alert('createPlant Error: ', err.graphQLErrors[0].message);
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
			const res = await editOldPlant({
				plantInput: {
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
			console.log(res);
		} catch (err) {
			alert('editPlant Error: ', err.graphQLErrors[0].message);
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
			console.log('deletePlant result: ', res);
		} catch (err) {
			alert('deletePlant Error: ', err.graphQLErrors[0].message);
		}
	};

	const handleChunkCellClicked = ({ chunkCoordinates, cellCoordinates }) => {
		console.log('click', chunkCoordinates, cellCoordinates);
	};

	const handleChunkCellHover = ({ chunkCoordinates, cellCoordinates }) => {
		console.log(
			'hover',
			chunkCoordinates,
			cellCoordinates,
			selectedTool,
			selectedPlant
		);
		if (selectedTool === 'PLANT') {
			let valid = true;
			let cueSize, plantSize;
			const cueAbsolutePosition = {
				x: chunkCoordinates.x * 32 + cellCoordinates.x,
				y: chunkCoordinates.y * 32 + cellCoordinates.y,
			};
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
					console.log('Invalid selected plant');
			}
			// check collision with farm border
			if (cellCoordinates.x + cueSize > 32) {
				valid = false;
				for (let chunk in farmData.getFarm.chunks) {
					if (chunk.coordinates.x === chunkCoordinates.x + 1) {
						valid = true;
						break;
					}
				}
			}
			if (cellCoordinates.y + cueSize > 32) {
				valid = false;
				for (let chunk in farmData.getFarm.chunks) {
					if (chunk.coordinates.y === chunkCoordinates.y + 1) {
						valid = true;
						break;
					}
				}
			}
			console.log(valid);
			// check collision with other plants
			if (valid) {
				for (let i = 0; i < farmData.getFarm.plants.length; i++) {
					let plant = farmData.getFarm.plants[i];
					// console.log(plant);
					const plantAbsolutePosition = {
						x:
							plant.chunkCoordinates.x * 32 +
							plant.plantCoordinates.x,
						y:
							plant.chunkCoordinates.y * 32 +
							plant.plantCoordinates.y,
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
					}
					console.log(
						cueAbsolutePosition,
						cueSize,
						plantAbsolutePosition,
						plantSize
					);

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
						valid = false;
						break;
					}
				}
			}
			console.log(valid);
			if (valid) {
				setPositionCueValidity(true);
			} else {
				setPositionCueValidity(false);
			}
			console.log('show');
			setShowPositionCue(true);
		} else {
			console.log('unshow');
			setShowPositionCue(false);
		}
	};

	const handlePostClicked = index => {};
	const handlePostHover = index => {};
	// test
	// useEffect(() => {
	// 	if (!test && !getFarmLoading) {
	// 		console.log('farmName:', farmData.farmName);
	// 		console.log('farmType:', farmData.farmType);
	// 		console.log('members:', farmData.members);
	// 		console.log('chunks:', farmData.chunks);
	// 		console.log('plants:', farmData.plants);
	// 		setTest(true);
	// 	}
	// }, [test]);

	useEffect(() => {
		if (!hasGetFriend) {
			getFriendsList();
		}
	}, [hasGetFriend]);
	// console.log(positionCueType);

	return [
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
	];
};

export default useFarm;
