import mongoose from "mongoose";


const todoSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        default: '',
    },
    isComplete: {
        type: Boolean,
        default: false
    },
},
    {
        timestamps: s
    })

module.exports = mongoose.model('Todos', todoSchema);
