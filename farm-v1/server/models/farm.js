import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const ActionSchema = Schema(
    {
        type: { type: String, required: true},
        content: { type: String, required: true },
        location: { type: String, required: true}
    }
)

const FarmSchema = Schema(
    {
        ownerName: { type: String },
        actions: [{ type: ActionSchema, required: true }]
    },
    {
        collection: 'Farm'
    }
);

const exportSchema = mongoose.model('Farm', FarmSchema);

export default exportSchema;