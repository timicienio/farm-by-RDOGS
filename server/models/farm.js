const { model, Schema, SchemaTypes } =require('mongoose');

const farmSchema = new Schema({
    farmName: String,
    farmType: String,
    invited: [
        {
            _id: Schema.Types.ObjectId,
            username: String,
            email: String,
            createdAt: String
        }
    ],
    members: [
        {
            _id: Schema.Types.ObjectId,
            username: String,
            email: String,
            createdAt: String
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