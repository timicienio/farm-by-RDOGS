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
} from '../graphql';

const useFarm = farmId => {
	console.log(typeof farmId);
	const [test, setTest] = useState(false);
	const { user } = useContext(AuthContext);
	const {
		loading: getFarmLoading,
		error: getFarmError,
		data: farmData,
		subscribeToMore,
	} = useQuery(GET_FARM_QUERY, {
		variables: {
			farmId: farmId,
		},
	});

	const [getFriends] = useMutation(GET_FRIENDS_MUTATION);
	const [createPlant] = useMutation(CREATE_PLANT_MUTATION);
	const [deleteOldPlant] = useMutation(DELETE_PLANT_MUTATION);
	const [leaveCurrentFarm] = useMutation(LEAVE_FARM_MUTATION);

	useEffect(()=>{
		alert("subscription procedure.")
		if(!getFarmLoading){
			subscribeToMore({
				document: FARM_SUBSCRIPTION,
				variables: {farmId: farmId},
				updateQuery: (prev, { subscriptionData }) => {
					if (!subscriptionData.data) return prev
					alert("sth change");
					console.log("subscriptionData: ", subscriptionData);
					let plants = prev.getFarm.plants;
					let changePlant = subscriptionData.data.farm.plant;
					switch(subscriptionData.data.mutation){
						case 'CREATED_PLANT':
							return { plants: [plants, changePlant]};
						case 'EDITED_PLANT':
							let newPlants = plants.splice(subscriptionData.data.farm.index, 1);
							newPlants = newPlants.splice(subscriptionData.data.farm.index, 1, changePlant);
							return {plants: [newPlants]};
						case 'DELETED_PLANT':
							const newPlants2 = plants.splice(subscriptionData.data.farm.index, 1);
							return {plants: [newPlants2]};
						default:
							return {plants:[plants]};
					}
				},
				onError: err => console.error(err)
			})
		}
	}, [subscribeToMore, getFarmLoading])


	const leaveFarm = async () => {
		try{
			const res = await leaveCurrentFarm({
				variables: {
					farmId: farmId
				}
			})
			console.log(res);
		}
		catch(err){
			alert(err.graphQLErrors[0].message)
			console.log(err.graphQLErrors[0].message);
		}
	}

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

	const deletePlant = async plantId => {
		try{
			const res = await deleteOldPlant({
				variables: {
					farmId: farmId,
					plantId: plantId
				}
			})
			console.log("deletePlant result: ", res);
		}
		catch(err){
			alert('deletePlant Error: ', err.graphQLErrors[0].message);
		}
	};

	const handleChunkCellClicked = ({ chunkCoordinates, cellCoordinates }) => {
		console.log('click', chunkCoordinates, cellCoordinates);
	};

	// test
	useEffect(() => {
		if (!test && !getFarmLoading) {
			console.log('farmName:', farmData.farmName);
			console.log('farmType:', farmData.farmType);
			console.log('members:', farmData.members);
			console.log('chunks:', farmData.chunks);
			console.log('plants:', farmData.plants);
			setTest(true);
		}
	}, [test]);

	useEffect(() => {
		if (!hasGetFriend) {
			getFriendsList();
		}
	}, [hasGetFriend]);

	return [
		farmData, //include id, farmName, farmType, members, chunks, plants
		friends, //this user's all friends
		getFarmLoading,
		leaveFarm,
		createNewPlant,
		deletePlant,
		addNewMember,
		handleChunkCellClicked,
	];
};

export default useFarm;
