import React, { useState, useContext } from 'react';
// import { AuthContext } from '../context/auth';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { CREATEFARM_MUTATION, GETFARMS_QUERY } from '../graphql';

const useFarms = () => {
    const [hasSetFarmList, setHasSetFarmList] = useState(false);
    const [farmList, setFarmList] = useState([]);
    // record the farm name which will be created
    const [createFarmName, setCreateFarmName] = useState(false);

    const [createFarm] = useMutation(CREATEFARM_MUTATION);
    
    const createNewFarm = async() =>{
        try{
            const res = await createFarm({
                farmName: createFarmName,
                farmType: "Club"
            })
            setCreateFarmName("");
        }
        catch(err){
            console.log(err);
        }
    }

    const handleChange = e => {
		setCreateFarmName(e.target.value);
	};
    
    useEffect(()=>{
        if(!hasSetFarmList){
            const { data } = useQuery(GETFARMS_QUERY);
            setFarmList(data.getFarms);
            setHasSetFarmList(true);
        }
    })


    return {handleChange, createNewFarm, farmList, createFarmName};
}

export default {useFarms};
