# Farm by RDOGS
Farm by RDOGS is a re-think of social media web application, which aims to create a more organic way for friends and communities to interact.


## Motivation
Post, comments, and reactions are the three most common elements in modern social web applications, and most of the time, it follows some rather 'linear' UI designs such as timelines and post lists. 

Farm by RDOGS attempts to free the elements from these structures, and let the users (or 'farmers') decide where their contents ('plants') should be placed on a 2D grid (a 'farm'). 

We envision that, in this way, not only does the communities have a larger freedom and room for creativity, the interactions and discussions could also 'grow' natually as the clustered posts, comments, and reactions clusters (implying a bigger trend), just like a real farm growing plants. 


*An example of a 'heated' discussion.*

![Image](https://imgur.com/98u9HNE.png)

*An example of creative plants usage.*

![Image](https://i.ibb.co/6nVtpGD/2021-01-21-024207.png)

## Getting Started

1. Clone this repo.
2. `cd` to the repo directory.
3. Run `yarn`.
4. Run `yarn server`, make sure MONGO_URL is provided in `.env` file.
5. Run `yarn start`. The app will start in your default browser.

## Example account
Username: ntuee-wp
Password: 123456

## Features

### Register / Login
Users can register an account with an email address. After logging in, it stays so even if the page refreshes (before the validation expires).

### Me & Friends
Users can add others as friends, this enables them to invite others to collab in a farm.

* Self information
* Friends list
* Friend requests list


### Farms
* Farmers

  Member of the farm, they can visit the farm, and also grow/edit/harvest plants.
  
* Plants: Basic elements of the farm, placed on the grids.
  * Posts: 4x4 plants, include a title and text body.
  * Comments: 2x2 plants, include a text body.
  * Reactions: 1x1 plants, include a single emoji chosen from the emoji picker.

* Tools
Draggable utilities that provides a more flexible UX.
  * Drag: To browse to farm.
  * Grow: Add new plants to farm.
  * Edit: Edit existing plants (only usable for plants grown by the user).
  * Harvest: Delete existing plants (only usable for plants grown by the user).

## Dependencies / Resources
### Frontend 
#### UI
+ [React Bootstrap](https://react-bootstrap.github.io/)
+ [react-draggable](https://github.com/STRML/react-draggable)
+ [react-emoji-render](https://www.npmjs.com/package/react-emoji-render)
+ [emoji-picker-react](https://www.npmjs.com/package/emoji-picker-react)
+ [React Icons](https://react-icons.github.io/react-icons/)
#### Web Services
+ [React Apollo](https://www.npmjs.com/package/react-apollo)
### Backend
+ [mongoDB](https://www.mongodb.com/)
+ [Express](https://expressjs.com/zh-tw/)
+ [GraphQL](https://graphql.org/)
+ [apollo-server](https://github.com/apollographql/apollo-server)
+ [JSON Web Tokens](https://jwt.io/)
+ [bcrypt](https://www.npmjs.com/package/bcrypt)

### Reference
+ [classsed-graphql-mern-apollo](https://github.com/hidjou/classsed-graphql-mern-apollo/tree/master)
+ [109-1-web-deploy-tutorial](https://github.com/TobyChen0106/109-1-web-deploy-tutorial/tree/main/src/route)
## Contributors
* @desk2000 B08705010 陳以潼
  
  frontend, UI.
* @gary1030 B08705008 胡家愷
  
  frontend, web service, deploy.
* @fredred375 B08705012 祝浩文
  
  backend, database, web service.
  
 ## Deploy Link
 + [Farm](https://brave-easley-0f2f0c.netlify.app/)
  *The websocket loses connections sometimes, we suspect it's some issue related to heroku.*
  *The visual cue when growing / moving plants is not able to display for some reason, we suggest the this project be reviewed with this repo*
