const { model, Schema } =require('mongoose');

const farmSchema = new Schema({
    farmName: String,
    farmType: String,
    members: [
        {
            username: String,
            email: String,
            joinedAt: String
        }
    ],
    chunks: [
        {
            coordinates: 
            {
                x: Number,
                y: Number
            },
            createdAt: String
        }
    ],
    plants: [
        {
            plantType: String,
            title: String,//only for type === 'Post
            body: String,
            author: String,
            chunkCoordinates:
            {
                x: Number,
                y: Number
            },
            plantCoordinates: 
            {
                x: Number,
                y: Number
            },
            createdAt: String
        }
    ],
    createdAt: String
});

module.exports = model('Farm', farmSchema);