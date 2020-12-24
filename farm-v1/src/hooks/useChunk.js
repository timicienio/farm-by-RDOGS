import React, { useState } from 'react';

const useChunk = (chunk, modifyChunk) => {
	const modifyLocalChunk = (attribute, attributeValue) =>
		modifyChunk({ ...chunk, [attribute]: attributeValue });
	const addPlant = newPlant => {
		modifyLocalChunk('plants', [...chunk.plants, newPlant]);
	};
	const modifyPlant = modifiedPlant => {
		const filteredPlant = chunk.plants.filter(
			item => item.id !== modifiedPlant.id
		);
		modifyLocalChunk('plants', [...filteredPlant, modifiedPlant]);
	};

	const [created, setCreated] = useState(true);

	return [chunk, addPlant, modifyPlant, created, setCreated];
};

export default useChunk;
