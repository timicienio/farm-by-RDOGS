import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const AccountSchema = Schema(
    {
        accountName: { type: String, required: true, unique: true },
        accountHash: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        friends: [{ type: String, required: true }]
    },
    {
        collection: 'Account'
    }
);

const exportSchema = mongoose.model('Account', AccountSchema);

export default exportSchema;