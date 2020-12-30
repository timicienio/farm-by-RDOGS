const { model, Schema } = require('mongoose');

const userSchema = new Schema({
    username: String,
    passwordHash: String,
    email: String,
    invitations: [
        {
            _id: Schema.Types.ObjectId,
            username: String,
            email: String,
            createdAt: String
        }
    ],
    friends: [
        {
            _id: Schema.Types.ObjectId,
            username: String,
            email: String,
            createdAt: String
        }
    ],
    createdAt: String
});

module.exports = model('User', userSchema);