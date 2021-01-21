import React from 'react';
import RDOGE from './pic/RDOGE.png'
import './About.css'

function About() {
	return (
		<>
			<div className='about'>
				<h1>About</h1>
				<br/>
				<img src={RDOGE} alt="funny doge" className="doge"/>
				<br/>
				<h3>Made by RDOGS</h3>
				<br/>
				<h3>noice</h3>
			</div>
		</>
	);
}

export default About;
