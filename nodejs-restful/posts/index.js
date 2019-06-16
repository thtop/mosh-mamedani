const Joi = require('joi')
const express = require('express')
const app = express()

app.use(express.json())

const posts = [
    {id: 1, title: 'posts 1'},
    {id: 2, title: 'posts 2'},
    {id: 3, title: 'posts 3'}
]

// HOME Page
app.get('/', (req, res) => {
    res.send('Hello World!')
})

// Get All Posts
app.get('/api/posts', (req, res) => {
    res.send(posts)
})

// Get Posts By id
app.get('/api/posts/:id', (req, res) => {
    const post = posts.find(post => post.id === parseInt(req.params.id))

    if (!post) {
        return res.status(404).send('The post with the given Id was not found.')
    }
    
    res.send(post)
})

// Add Post
app.post('/api/posts', (req, res) => {
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
app.put('/api/posts/:id', (req, res) => {
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
app.delete('/api/posts/:id', (req, res) => {
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


const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}`))