const mongoose = require('mongoose');
const User = require('./user');

// Later i will add more features like starring entries, adding tags, and others
const diarySchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required!']
    },
    description: {
        type: String,
        required: [true, 'Description is required!']
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true });

const Diary = mongoose.model('Diary', diarySchema);

module.exports = Diary;