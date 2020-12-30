import axios from 'axios'
const instance = axios.create ({ baseURL: 'http://localhost:5000/api' });

//to check whether the email has been registered
//if existing, return "email has been registered!", else return "not exist" 
const checkEmailExist = async (email) => {
	const {msg: msg} = await instance.get('/checkEmailExist', { params: { email } });
	return msg;
}

//to check whether the user exists
//if existing, return "User exists", else return "not exist" 
const checkUserExist = async (username) => {
	const {msg: msg} = await instance.get('/checkUserExist', { params: { username } });
	return msg;
}

// create a user
const createUser = async (email, username, hashValue) => {
	// email = 'ntuim@gmail.com';
	// username = 'ntuim';
    // hashValue = 'fuckU';
	const { data : {msg} } = await instance.post('/createUser', { params: { email, username, hashValue } });
    console.log(msg);
    return msg;
}

// get friend list
const getFriendList = async (username) =>{
    const {
		data : {message, friendList}
	} = await instance.get('/getFriendList', { params: { username } })
	return friendList;
}

//validate password when log in
//if wrong hashvalue, return "Error", else, return "Success"
const validateLogin = async (username, hashValue) => {
    var msg = "Success";
    // const{
    //     data : {msg}
    // } = await instance.get('validateLogin', {params: {username, hashValue}})
    
    return msg;
}

// get farm
const getFarm = async (username) =>{
    // const {
	// 	data
	// } = await instance.get('/getFarm', { params: { username } })
    
    // return data;
}

// make a new friend
const addFriend = async (username, friendname) =>{
	var msg = 'success';
	//var msg = 'success'
	// const {
	// 	data : {msg}
	// } = await instance.post('/addFriend', { params: { username, friendname } })
    //console.log(message);
    return msg;
}

// get my invitation list
const getInvitationList = async (username) =>{
	let invitationList =[{name: 'rdogs14'},
						 {name: 'rdogs15'}]
	// const {
	// 	data : {msg, invitationList}
	// } = await instance.get('/getInvitationList', { params: { username } })
    
    return invitationList;
}

const acceptFriend = async (username, friendname) =>{
	var msg = "success";
	// const {
	// 	data : {msg}
	// } = await instance.post('/acceptFriend', { params: { username, friendname } })
    
    return msg;
}

export { checkEmailExist, checkUserExist, createUser, getFriendList, validateLogin, getFarm, addFriend, getInvitationList, acceptFriend};
