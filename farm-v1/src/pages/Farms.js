import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
//import { getFarmList } from '../axios';

const Farms = ({ userData }) => {
	const [haveFarm, setHaveFarm] = useState(false);
	// const [friendList, setFriendList] = useState([]);
	const [farmList, setFarmList] = useState([
		{ farmName: 'rdogsFarm1', members: [] },
		{ farmName: 'rdogsFarm2' },
	]);

	useEffect(() => {
		if (!haveFarm) {
			//setFarmList(getFarmList(userData.name));
			setHaveFarm(true);
		}
	});

	return (
		<>
			<Container fluid>
				<Row>
					<Col sm={2}>
						<ListGroup>
							{farmList.map((farm, key) => (
								<ListGroup.Item eventKey={key}>
									<Link to={'/farms/' + farm.farmName}>
										{farm.farmName}
									</Link>
								</ListGroup.Item>
							))}
						</ListGroup>
					</Col>
					<Col sm={10}></Col>
				</Row>
			</Container>
		</>
	);
};

export default Farms;
