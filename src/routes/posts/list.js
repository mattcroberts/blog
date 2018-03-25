const express = require('express');
const router = express.Router();
const Post = require('../../models/post');

const get = (req, res, next) => {
    return Post.find()
        .then(posts => {
            res.render('index', { title: 'Matt\'s Blog', posts });
        })
        .catch(err => {
            res.sendStatus(500);
            next(err);
        });
};

router.get('/', get);

module.exports = { get, router };
