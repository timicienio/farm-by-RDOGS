import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as BsIcons from 'react-icons/bs';

export const SidebarData = [
	// {
	// 	title: 'Home',
	// 	path: '/home',
	// 	icon: <AiIcons.AiFillHome />,
	// 	cName: 'nav-text',
	// },
	{
		title: 'Me & Friends',
		path: '/friends',
		icon: <FaIcons.FaUserFriends />,
		cName: 'nav-text',
	},
	{
		title: 'Farms',
		path: '/farms',
		icon: <IoIcons.IoIosGrid />,
		cName: 'nav-text',
	},
	{
		title: 'Preferences',
		path: '/preferences',
		icon: <BsIcons.BsGear />,
		cName: 'nav-text',
	},
	{
		title: 'About',
		path: '/about',
		icon: <BsIcons.BsInfoSquare />,
		cName: 'nav-text',
	},
];
