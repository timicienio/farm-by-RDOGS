import React, { useState, useEffect, useContext } from 'react';
// import { AuthContext } from '../context/auth';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../context/auth';
import { CREATE_FARM_MUTATION, GET_USER_DATA_QUERY } from '../graphql';

const useFarms = () => {
	const { user } = useContext(AuthContext);
	const {
		loading: farmListLoading,
		error: farmListError,
		data: data,
	} = useQuery(GET_USER_DATA_QUERY,{
		variables:{
			userId: user.id,
		}
	});

	const [showCreateFarmPopUp, setShowCreateFarmPopUp] = useState(false);
	const [createFarmName, setCreateFarmName] = useState('');
	const [createFarmType, setCreateFarmType] = useState('Club');
	const [selectedFarm, setSelectedFarm] = useState(0);
	const [selectedTool, setSelectedTool] = useState('DRAG'); // DRAG, PLANT, MODIFY, HARVEST
	const [selectedPlant, setSelectedPlant] = useState('POST');
	const [createFarmAlert, setCreateFarmAlert] = useState('');
	const [showCreateFarmAlert, setShowCreateFarmAlert] = useState(false);

	const [createFarm] = useMutation(CREATE_FARM_MUTATION);

	const createNewFarm = async () => {
		//alert(createFarmName, "  ", createFarmType);
		if(createFarmName === ''){
			setCreateFarmAlert("Please enter a name.");
			setShowCreateFarmAlert(true);
		}
		else{
			setCreateFarmAlert('');
			setShowCreateFarmAlert(false);
			try {
				alert('create farm');
				const res = await createFarm({
					variables: {
						farmName: createFarmName,
						farmType: createFarmType,
					},
				});
				alert('res', res);
				setCreateFarmName('');
			} catch (err) {
				alert('error', err);
			}
		}
	};

	const handleNewFarmChange = e => {
		console.log(e.target);
		setCreateFarmName(e.target.value);
	};

	const history = useHistory();

	const onSelectFarm = key => {
		setSelectedFarm(key);
		history.push('/farms/' + String(key));
	};

	const onSelectTool = tool => {
		setSelectedTool(tool);
	};

	const onSelectPlant = plant => {
		setSelectedPlant(plant);
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
		data, // List of farms fetched
		selectedFarm,
		onSelectFarm,
		selectedTool,
		onSelectTool,
		selectedPlant,
		onSelectPlant,
		createFarmName,
		createFarmType,
		createFarmAlert,
		showCreateFarmAlert,
		history,
		showCreateFarmPopUp,
		setShowCreateFarmPopUp,
	};
};

export default useFarms;
