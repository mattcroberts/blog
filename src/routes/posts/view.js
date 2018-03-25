const express = require('express');
const router = express.Router();
const Post = require('../../models/post');

const get = (req, res, next) => {
    return Post.findOne({ _id: req.params.postId })
        .then(post => {
            res.render('post', { post });
        })
        .catch(err => {
            res.sendStatus(500);
            next(err);
        });
};
router.get('/:postId', get);

module.exports = { get, router };
