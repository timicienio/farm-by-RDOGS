import React from 'react';
import * as MdIcons from 'react-icons/md';
import { IconContext } from 'react-icons/lib';

function StdBox({
	id,
	height,
	width,
	className,
	title,
	titleSize,
	bodySize,
	light,
	margin,
	dragHandle,
	children,
}) {
	return (
		<>
			<div
				className={'std-box ' + className + (light ? ' light' : '')}
				style={{
					margin: margin === undefined ? 12 : margin,
					height: height === undefined ? 'unset' : height,
					width: width === undefined ? 'unset' : width,
				}}
				id={id}
			>
				{dragHandle ? (
					<div className='farm-list-handle'>
						<IconContext.Provider value={{ color: '#c8f0ef' }}>
							<MdIcons.MdDragHandle />
						</IconContext.Provider>
					</div>
				) : (
					<></>
				)}
				<div
					className='std-box-title'
					style={{
						fontSize: titleSize === undefined ? 32 : titleSize,
					}}
				>
					{title}
				</div>
				<div
					className='std-box-content'
					style={{
						fontSize: bodySize === undefined ? 16 : bodySize,
					}}
				>
					{children}
				</div>
			</div>
		</>
	);
}

export default StdBox;
