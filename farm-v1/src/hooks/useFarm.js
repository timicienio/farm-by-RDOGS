import React, { useState, useReducer } from 'react';
import { MdPlaylistAddCheck } from 'react-icons/md';

function useFarm(init) {
	const [farmName, setFarmName] = useState(init.farmName);
	const [type, setType] = useState(init.type);
	const [members, membersDispatch] = useReducer(
		(members, { type, value }) => {
			switch (type) {
				case 'ADD':
					return [...members, value];
				case 'MODIFY':
					let filteredMembers = members.filter(
						item => item.id !== value.id
					);
					return [...filteredMembers, value];
				case 'REMOVE':
					return members.filter(item => item.id !== value.id);
				default:
					console.log('Invalid action when setting members');
					return members;
			}
		},
		init.members
	);
	const [chunks, chunksDispatch] = useReducer((chunks, { type, value }) => {
		switch (type) {
			case 'ADD':
				return [...chunks, value];
			case 'MODIFY':
				let filteredChunks = chunks.filter(
					item => item.id !== value.id
				);
				return [...filteredChunks, value];
			default:
				console.log('Invalid action when setting chunks');
				return chunks;
		}
	}, init.chunks);

	const addMember = value => {
		membersDispatch({ type: 'ADD', value: { value } });
	};

	const modifyMember = value => {
		membersDispatch({ type: 'MODIFY', value: { value } });
	};

	const removeMember = value => {
		membersDispatch({ type: 'REMOVE', value: { value } });
	};

	const addChunk = coor => {
		chunksDispatch({ type: 'ADD', value: { coor: coor } });
	};

	const modifyChunk = value => {
		chunksDispatch({ type: 'MODIFY', value: value });
	};

	return [
		farmName,
		type,
		members,
		chunks,
		setFarmName,
		setType,
		addMember,
		modifyMember,
		removeMember,
		addChunk,
		modifyChunk,
	];
}

export default useFarm;
