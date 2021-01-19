import { useContext, useState } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { AuthContext } from '../context/auth';
import { EDIT_PROFILE_MUTATION, GET_USER_DATA_QUERY } from '../graphql';

const usePreference = () => {
    const { user } = useContext(AuthContext);
    const {
		loading,
		error,
		data,
	} = useQuery(GET_USER_DATA_QUERY,{
		variables:{
			userId: user.id,
		}
    });

    const [newProfile, setNewProfile] = useState('');
    const [newProfileAlert, setNewProfileAlert] = useState('');
    const [showNewProfileAlert, setShowNewProfileAlert] = useState(false);
    const [editMyProfile] = useMutation(EDIT_PROFILE_MUTATION);
    
    const editProfile = async () =>{
        if(newProfile === ''){
            setNewProfileAlert('Please enter new profile.');
            setShowNewProfileAlert(true);
        }
        else{
            setNewProfileAlert('');
            setShowNewProfileAlert(false);
            try{
                const res = await editMyProfile({
                    variables: {
                        newProfile: newProfile
                    }
                })
                console.log(res);
            }catch(err){
                setNewProfileAlert(err.message);
                setShowNewProfileAlert(true);
                console.log(err);
            }
        }
    }

    const handleChange = e => {
		setNewProfile(e.target.value);
	};

    return {
        loading,
        error,
        data,
        handleChange,
        editProfile,
        newProfileAlert,
        showNewProfileAlert
    };
}

export default usePreference;