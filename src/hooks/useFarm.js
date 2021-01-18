import React, { useState, useReducer, useEffect, useContext } from 'react';
import { MdPlaylistAddCheck } from 'react-icons/md';
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
	const [test, setTest] = useState(false);
	const { user } = useContext(AuthContext);
	const {
		loading: getFarmLoading,
		error: getFarmError,
		data
	} = useQuery(GET_FARM_QUERY, {
		variables: {
			farmId: farmId
		},
	});
	
	const [getFriends] = useMutation(GET_FRIENDS_MUTATION);
	const [createPlant] = useMutation(CREATE_PLANT_MUTATION);
	const [leaveFarm] = useMutation(LEAVE_FARM_MUTATION, {
		variables: {
			farmId: farmId
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
	const addNewMember = async(friendName) => {
		let id = "";
		for(let i=0; i < friends.length-1; i++){
			if(friends[i].username === friendName){
				id = friends[i].id
				break;
			}
		}
		try{
			const res = await sendFarmInvitation({
				variables:{
					friendId: id
				},
			})
			console.log(res);
		}
		catch(err){
			console.log(err);
			alert(err);
		}
	}

	// create a plant
	const createNewPlant = async (plantType, title, body, chunkX, chunkY, plantX, plantY) => {
		// author = user.username
		try{
			
		}
		catch(err){

		}
	} 

	// test
	useEffect(() => {
		if (!test) {
			console.log('farmName:', data.farmName);
			console.log('farmType:', data.farmType);
			console.log('members:', data.members);
			console.log('chunks:', data.chunks);
			console.log('plants:', data.plants);
			setTest(true);
		}
	}, [test]);

	useEffect(() => {
		if (!hasGetFriend) {
			getFriendsList();
		}
	}, [hasGetFriend]);

	// const [members, membersDispatch] = useReducer(
	// 	(members, { type, value }) => {
	// 		switch (type) {
	// 			case 'ADD':
	// 				return [...members, value];
	// 			case 'MODIFY':
	// 				let filteredMembers = members.filter(
	// 					item => item.id !== value.id
	// 				);
	// 				return [...filteredMembers, value];
	// 			case 'REMOVE':
	// 				return members.filter(item => item.id !== value.id);
	// 			default:
	// 				console.log('Invalid action when setting members');
	// 				return members;
	// 		}
	// 	},
	// 	init.members
	// );
	// const [chunks, chunksDispatch] = useReducer((chunks, { type, value }) => {
	// 	switch (type) {
	// 		case 'ADD':
	// 			return [...chunks, value];
	// 		case 'MODIFY':
	// 			let filteredChunks = chunks.filter(
	// 				item => item.id !== value.id
	// 			);
	// 			return [...filteredChunks, value];
	// 		default:
	// 			console.log('Invalid action when setting chunks');
	// 			return chunks;
	// 	}
	// }, init.chunks);

	// const addMember = value => {
	// 	membersDispatch({ type: 'ADD', value: { value } });
	// };

	// const removeMember = value => {
	// 	membersDispatch({ type: 'REMOVE', value: { value } });
	// };

	// const addChunk = coor => {
	// 	chunksDispatch({ type: 'ADD', value: { coor: coor } });
	// };

	// const modifyChunk = value => {
	// 	chunksDispatch({ type: 'MODIFY', value: value });
	// };

	return [
		data, //include id, farmName, farmType, members, chunks, plants
		friends, //this user's all friends
		leaveFarm,
		createNewPlant,
		addNewMember
	];
};

export default useFarm;
