const { model, Schema, SchemaType } =require('mongoose');
const { schema } = require('./User');

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
            _id: Schema.Types.ObjectId,
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
            _id: Schema.Types.ObjectId,
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