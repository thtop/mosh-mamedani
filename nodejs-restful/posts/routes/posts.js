const express = require('express')
const router = express.Router()

const posts = [
    {id: 1, title: 'posts 1'},
    {id: 2, title: 'posts 2'},
    {id: 3, title: 'posts 3'}
]

// Get All Posts
router.get('/', (req, res) => {
    res.send(posts)
})

// Get Posts By id
router.get('/:id', (req, res) => {
    const post = posts.find(post => post.id === parseInt(req.params.id))

    if (!post) {
        return res.status(404).send('The post with the given Id was not found.')
    }
    
    res.send(post)
})

// Add Post
router.post('/', (req, res) => {
    const { error } = validatePost(req.body)

    console.log(error)

    if (error) {
        return res.status(400).send(error.details[0].message)
    }

    const post = {
        id: posts.length + 1,
        title: req.body.title
    }

    posts.push(post)
    res.send(posts)

})

// Edit Post
router.put('/:id', (req, res) => {
    const post = posts.find(post => post.id === parseInt(req.params.id))

    if (!post) {
        return res.status(400).send('The post with the given Id was not found.')
    }

    const { error } = validatePost(req.body)
    if (error) {
        return res.status(400).send(error.details[0].message)
    }

    post.title = req.body.title
    res.send(post)
})

// Delete Post by id
router.delete('/:id', (req, res) => {
    const post = posts.find(post => post.id === parseInt(req.params.id))

    if (!post) {
        return res.status(404).send('The post with the given Id was not found.')
    }

    const index = posts.indexOf(post)
    posts.splice(index, 1)

    res.send(post)
})


function validatePost(post) {
    const schema = {
        title: Joi.string().min(3).required()
    }

    return Joi.validate(post, schema)
}

module.exports = router