const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

// Get Posts

router.get('/', async (req, res) => {
    const posts = await loadPostsCollection();
    res.send(await posts.find({}).toArray());
});

// Add Post

router.post('/', async (req, res) => {
    const posts = await loadPostsCollection();
    console.log('test');
    await posts.insertOne({
        text: req.body.text,
        createdAt: new Date()
    });
    res.status(201).send();
});

// Delete Post
router.delete('/:id', async (req, res) => {
    const posts = await loadPostsCollection();
    console.log('test');
    console.log(req.params.id);
    await posts.deleteOne({'_id': new mongodb.ObjectID(req.params.id)});
    res.status(200).send();
});


async function loadPostsCollection() {
    // const client = await mongodb.MongoClient.connect('mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false');
    const client = await mongodb.MongoClient.connect('mongodb://spdf:cl.spdf@144.202.126.128:27017/?authSource=vue_express&readPreference=primary&appname=MongoDB%20Compass&ssl=false', {useUnifiedTopology: true});
    return client.db('vue_express').collection('mymachine');
}


module.exports = router;