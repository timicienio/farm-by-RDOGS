import React, { useState, useEffect } from 'react';
// import { AuthContext } from '../context/auth';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { useHistory } from 'react-router-dom';
import { CREATE_FARM_MUTATION, GET_FARMS_QUERY } from '../graphql';

const useFarms = () => {
	const {
		loading: farmListLoading,
		error: farmListError,
		data: { getFarms },
	} = useQuery(GET_FARMS_QUERY);

	const [showCreateFarmPopUp, setShowCreateFarmPopUp] = useState(false);
	const [createFarmName, setCreateFarmName] = useState('');
	const [createFarmType, setCreateFarmType] = useState('Club');

	const [createFarm] = useMutation(CREATE_FARM_MUTATION);

	const createNewFarm = async () => {
		try {
			const res = await createFarm({
				farmName: createFarmName,
				farmType: createFarmType,
			});
			setCreateFarmName('');
		} catch (err) {
			console.log(err);
		}
	};

	const handleNewFarmChange = e => {
		console.log(e.target);
		setCreateFarmName(e.target.value);
	};

	const history = useHistory();

	const [farmSelected, setFarmSelected] = useState(-1);

	const onSelectFarm = key => {
		setFarmSelected(key);
		history.push('/farms/' + String(key));
	};

	// useEffect(() => {
	// 	if (!hasSetFarmList) {
	// 		const { data } = useQuery(GET_FARMS_QUERY);
	// 		setFarmList(data.getFarms);
	// 		setHasSetFarmList(true);
	// 	}
	// }, [hasSetFarmList]);

	return {
		handleNewFarmChange,
		createNewFarm,
		farmListLoading,
		farmListError,
		getFarms, // List of farms fetched
		onSelectFarm,
		createFarmName,
		createFarmType,
		history,
		showCreateFarmPopUp,
		setShowCreateFarmPopUp,
	};

	// return { handleChange, createNewFarm, getFarms, createFarmName };
};

export default useFarms;
