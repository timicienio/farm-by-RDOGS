import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import './Navbar.css';
import { IconContext } from 'react-icons';

function Navbar() {
	const [sidebar, setSidebar] = useState(false);

	const showSidebar = () => setSidebar(!sidebar);

	return (
		<>
			<IconContext.Provider value={{ color: '#faebd7' }}>
				<div className='navbar'>
					<Link to='#' className='menu-bars'>
						<FaIcons.FaBars onClick={showSidebar} />
					</Link>
					<h1 id='navbar-title'>Farm</h1>
				</div>
				<nav
					className={
						sidebar
							? 'nav-menu std-box  active'
							: 'nav-menu std-box '
					}
				>
					<ul className='nav-menu-items' onClick={showSidebar}>
						{/* <li className='navbar-toggle'>
							<Link to='#' className='menu-bars'>
								<AiIcons.AiOutlineClose />
							</Link>
						</li> */}
						{SidebarData.map((item, index) => {
							return (
								<li key={index} className={item.cName}>
									<Link
										to={item.path}
										style={{ textDecoration: 'none' }}
									>
										{item.icon}
										<span className='sidebar-item-title'>
											{item.title}
										</span>
									</Link>
								</li>
							);
						})}
					</ul>
				</nav>
			</IconContext.Provider>
		</>
	);
}

export default Navbar;
