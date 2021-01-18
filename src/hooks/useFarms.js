import React, { useState, useEffect } from 'react';
// import { AuthContext } from '../context/auth';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { useHistory } from 'react-router-dom';
import { CREATE_FARM_MUTATION, GET_FARMS_QUERY } from '../graphql';

const useFarms = () => {
	const [hasSetFarmList, setHasSetFarmList] = useState(false);
	const [farmList, setFarmList] = useState([]);
	// record the farm name which will be created
	const [createFarmName, setCreateFarmName] = useState(false);

	const [createFarm] = useMutation(CREATE_FARM_MUTATION);

	const createNewFarm = async () => {
		try {
			const res = await createFarm({
				farmName: createFarmName,
				farmType: 'Club',
			});
			setCreateFarmName('');
		} catch (err) {
			console.log(err);
		}
	};

	const handleNewFarmChange = e => {
		setCreateFarmName(e.target.value);
	};

	const history = useHistory();

	const [farmSelected, setFarmSelected] = useState(-1);

	const onSelectFarm = key => {
		setFarmSelected(key);
		history.push('/farms/' + String(key));
	};

	useEffect(() => {
		if (!hasSetFarmList) {
			const { data } = useQuery(GET_FARMS_QUERY);
			setFarmList(data.getFarms);
			setHasSetFarmList(true);
		}
	}, [hasSetFarmList]);

	return {
		handleNewFarmChange,
		createNewFarm,
		farmList,
		farmSelected,
		onSelectFarm,
		createFarmName,
		history,
	};
};

export default useFarms;
