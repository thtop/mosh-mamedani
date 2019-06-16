const Joi = require('joi')
const posts = require('./routes/posts')
const home = require('./routes/home')
const express = require('express')
const app = express()

app.use(express.json())
app.use('/api/posts', posts)
app.use('/', home)

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}`))