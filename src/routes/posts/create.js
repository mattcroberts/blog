const express = require('express');
const router = express.Router();
const Post = require('../../models/post');

const get = (req, res, next) => {
    res.render('create');
};

const post = (req, res, next) => {
    const post = new Post({
        title: req.body.title,
        body: req.body.body
    });

    return post
        .save()
        .then(createdPost => {
            res.redirect(createdPost.id);
        })
        .catch(err => {
            res.sendStatus(500);
            next(err);
        });
};

router.get('/', get);

router.post('/', post);

module.exports = { get, post, router };
