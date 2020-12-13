import requestRoute from './request'

const wrap = fn => (...args) => fn(...args).catch(args[2])

function main(app) {
  app.get('/api/checkEmailExist', wrap(requestRoute.CheckEmailExist))
  app.get('/api/checkUserExist', wrap(requestRoute.CheckUserExist))
  app.get('/api/getFriendList', wrap(requestRoute.GetFriendList))
  app.post('/api/createUser', wrap(requestRoute.CreateUser))
}

export default main
