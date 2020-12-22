import React, {useState} from 'react'

const useChunk = ({coor, plants}) => {
	const [plants, setPlants] = useState(plants.map(({type, title, body, localCoor, authorUsername, createdAt, author})=>{
		type: type
		localCoor: localCoor
		title: title
		body: body
		
	})
}