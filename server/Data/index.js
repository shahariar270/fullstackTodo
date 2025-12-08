const { default: mongoose } = require("mongoose");



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
    targetDate: {
        type: String,
        default: () => {
            const date = new Date();
            date.setDate(date.getDate() + 1);
            return date.toISOString().split('T')[0]
        },
    }
},
    {
        timestamps: true
    })

module.exports = mongoose.model('Todos', todoSchema);
