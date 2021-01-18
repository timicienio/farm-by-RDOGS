import React, { useState, useReducer, useEffect } from 'react';
import { MdPlaylistAddCheck } from 'react-icons/md';
import { useQuery, useMutation } from '@apollo/react-hooks';
import {
	CREATE_PLANT_MUTATION,
	LEAVE_FARM_MUTATION,
	SEND_FARM_INVITATION_MUTATION,
	GET_FARM_QUERY,
} from '../graphql';

const useFarm = init => {
	const [test, setTest] = useState(false);
	const { loading, error, data } = useQuery(GET_FARM_QUERY, {
		variables: {
			init,
		},
	});

	const [createPlant] = useMutation(CREATE_PLANT_MUTATION);
	const [leaveFarm] = useMutation(LEAVE_FARM_MUTATION, {
		variables: {
			init,
		},
	});
	const [sendFarmInvitation] = useMutation(SEND_FARM_INVITATION_MUTATION);
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
		leaveFarm,
		// chunks,
		// setFarmName,
		// setType,
		// addMember,
		// removeMember,
		// addChunk,
		// modifyChunk,
	];
};

export default useFarm;
