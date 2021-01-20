# Farm by RDOGS
Farm by RDOGS is a re-think of social media web application, which aims to create a more organic way for friends and communities to interact.


## Motivation
Post, comments, and reactions are the three most common elements in modern social web applications, and most of the time, it follows some rather 'linear' UI designs such as timelines and post lists. 

Farm by RDOGS attempts to free the elements from these structures, and let the users (or 'farmers') decide where their contents ('plants') should be placed on a 2D grid (a 'farm'). 

We envision that, in this way, not only does the communities have a larger freedom and room for creativity, the interactions and discussions could also 'grow' natually as the clustered posts, comments, and reactions clusters (implying a bigger trend), just like a real farm growing plants. 

![Image](https://imgur.com/98u9HNE.png)

*An example of a 'heated' discussion.*

## Features

### Register/Login
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

* Toolboxes
Draggable utilities that provides a more flexible UX.

## Getting Started

1. Clone this repo.
2. `cd` to the repo directory.
3. Run `yarn`.
4. Run `yarn server`, make sure MONGO_URL is provided in `.env` file.
5. Run `yarn start`. The app will start in your default browser.

