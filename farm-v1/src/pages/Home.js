import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
	return (
		<>
			<div className ='home'>
				<h1>Home</h1>
			</div>
			<div>
				<span>
					<Link to = '/friends'> SHOW MY FRIENDS </Link>
				</span>
				<br></br>
				<span>
					<Link to = '/farms'> SHOW MY FARMS </Link>
				</span>

			</div>
			
		</>
	);
}

export default Home;
