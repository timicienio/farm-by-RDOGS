import React from 'react';
import * as MdIcons from 'react-icons/md';
import { IconContext } from 'react-icons/lib';
import Draggable from 'react-draggable';

function FarmToolbox({ title, children }) {
	return (
		<Draggable
			axis='both'
			handle='.farm-list-handle'
			defaultPosition={{ x: 0, y: 0 }}
			position={null}
			bounds='parent'
		>
			<div className='farm-list std-box'>
				<div className='farm-list-handle'>
					<IconContext.Provider value={{ color: '#c8f0ef' }}>
						<MdIcons.MdDragHandle />
					</IconContext.Provider>
				</div>
				<div className='farm-list-content'>
					<div className='std-box-title'>{title}</div>
					<div className='std-box-content'>{children}</div>
				</div>
			</div>
		</Draggable>
	);
}

export default FarmToolbox;
