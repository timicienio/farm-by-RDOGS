import React, { useState, useContext } from 'react';
// import { AuthContext } from '../context/auth';
import { useQuery, useMutation } from '@apollo/react-hooks';
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

	const handleChange = e => {
		setCreateFarmName(e.target.value);
	};

	useEffect(() => {
		if (!hasSetFarmList) {
			const { data } = useQuery(GET_FARMS_QUERY);
			setFarmList(data.getFarms);
			setHasSetFarmList(true);
		}
	}, [hasSetFarmList]);

	return { handleChange, createNewFarm, farmList, createFarmName };
};

export default { useFarms };
