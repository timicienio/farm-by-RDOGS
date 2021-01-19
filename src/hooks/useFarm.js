import React, { useState, useEffect, useContext } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { AuthContext } from '../context/auth';
import {
	CREATE_PLANT_MUTATION,
	LEAVE_FARM_MUTATION,
	SEND_FARM_INVITATION_MUTATION,
	GET_FARM_QUERY,
	GET_FRIENDS_MUTATION,
} from '../graphql';

const useFarm = farmId => {
	console.log(typeof farmId);
	const [test, setTest] = useState(false);
	const { user } = useContext(AuthContext);
	const {
		loading: getFarmLoading,
		error: getFarmError,
		data: farmData,
	} = useQuery(GET_FARM_QUERY, {
		variables: {
			farmId: farmId,
		},
	});

	const [getFriends] = useMutation(GET_FRIENDS_MUTATION);
	const [createPlant] = useMutation(CREATE_PLANT_MUTATION);
	const [leaveFarm] = useMutation(LEAVE_FARM_MUTATION, {
		variables: {
			farmId: farmId,
		},
	});
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
			alert(err);
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
					author: user.username,
				},
			});
			console.log(res);
		} catch (err) {
			alert('createPlant Error: ', err);
		}
	};

	const deletePlant = plantId => {
		//TODO
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
	];
};

export default useFarm;
