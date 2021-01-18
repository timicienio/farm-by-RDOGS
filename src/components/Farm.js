import React from 'react';
import FarmOfClub from './FarmOfClub';
import Draggable from 'react-draggable';
import './Farm.css';

function Farm({ data }) {
	console.log(data.farmType);
	switch (data.farmType) {
		case 'Club':
			return <FarmOfClub data={data} />;
		case 'Timeline':
		//TODO
	}
}

export default Farm;
