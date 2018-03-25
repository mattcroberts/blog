const mongoose = require('mongoose');

const Post = new mongoose.Schema({
    title: { type: String, required: true },
    body: { type: String, required: true },
    creationDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Post', Post);
