// import axios from 'axios'
// const instance = axios.create ({ baseURL: 'http://localhost:4000' });

// //to check whether the email has been registered
// //if existing, return "email has been registered!", else return "not exist" 
// const checkEmailExist = async (email) => {
// 	const {msg: msg} = await instance.get('/chechEmailExist', {email: email});
// 	return msg;
// }

// //to check whether the user exists
// //if existing, return "User exists", else return "not exist" 
// const checkUserExist = async (email) => {
// 	const {msg: msg} = await instance.get('/chechUserExist', {email: email});
// 	return msg;
// }

// // create a user
// const createUser = async (email, name, hashValue) => {
//     await instance.post('/createUser', {email: email, name: name, hashValue: hashValue});
// }

// // get friend list
// const getFriendList = async () =>{
//     const {
// 		data : {message, friendList}
// 	} = await instance.get('/getFriendList')
// 	return friendList;
// }

// export default {checkEmailExist, checkUserExist, createUser, getFriendList};
