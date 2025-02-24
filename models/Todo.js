const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    day: {
        type: String,
        required: true,
        enum: ['pzt', 'sal', 'car', 'per', 'cum', 'cts', 'paz'] // İzin verilen günler
    },
    completed: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Todo', todoSchema); 