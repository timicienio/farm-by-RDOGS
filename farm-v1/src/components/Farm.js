import React from 'react';
import FarmOfClub from './FarmOfClub';
import Draggable from 'react-draggable';
import './Farm.css';

function Farm({ data }) {
	console.log(data.type);
	switch (data.type) {
		case 'Club':
			return <FarmOfClub data={data} />;
		case 'Timeline':
		//TODO
	}
}

export default Farm;
