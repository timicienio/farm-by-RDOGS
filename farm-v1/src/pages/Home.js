import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
	return (
		<>
			<div>
				<h1>Home</h1>
				<div>
					<span>
						<Link to = '/friends'> SHOW MY FRIENDS </Link>
					</span>
					<br></br>
					<span>
						<Link to = '/farms'> SHOW MY FARMS </Link>
					</span>

				</div>
			</div>
			
		</>
	);
}

export default Home;
