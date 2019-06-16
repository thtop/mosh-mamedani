const morgan = require('morgan')
const helmet = require('helmet')
const Joi = require('joi')
const logger = require('./logger')
const express = require('express')
const app = express()

app.use(express.json()) // req.body
app.use(express.urlencoded({ extended: true })) // key=value&key=value
app.use(express.static('public'))
app.use(helmet())
app.use(morgan('tiny'))

app.use(logger)

app.use((req, res, next) => {
    console.log('Autenticating...')
    next()
})

const courses = [
    {id: 1, name: 'course1'},
    {id: 2, name: 'course2'},
    {id: 3, name: 'course3'}
]

// GET
app.get('/', (req, res) => {
    res.send('Hello World!!!')
})

// GET courses
app.get('/api/courses', (req, res) => {
    res.send(courses)
})

// GET course by id
app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id))

    if (!course) {
        return res.status(404).send('The course with the given ID was not found.')
    }

    res.send(course)
})

// POST
app.post('/api/courses', (req, res) => {
    
    const { error } = validateCourse(req.body) // result.error
    if (error) {
        return res.status(400).send(error.details[0].message)
    }

    const course = {
        id: courses.length + 1,
        name: req.body.name
    }

    courses.push(course)
    res.send(courses)
})

// PUT (update)
app.put('/api/courses/:id', (req, res) => {

    const course = courses.find(c => c.id === parseInt(req.params.id))

    if (!course) {
        return res.status(404).send('The course with the given ID was not found.')
    }

    const { error } = validateCourse(req.body) // result.error
    if (error) {
        return res.status(400).send(error.details[0].message)
    }

    course.name = req.body.name
    res.send(course)
})

// DELETE by id
app.delete('/api/courses/:id', (req, res) => {
    // Look up the course
    // Not existing, return 404
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if (!course) {
        return res.status(404).send('The course with the given ID was not found.')
    }

    // Delete
    const index = courses.indexOf(course)
    courses.splice(index, 1)

    // Return the same sourse
    res.send(course)
})

function validateCourse(course) {
    const schema = {
        name: Joi.string().min(3).required()
    }

    return Joi.validate(course, schema)
}


const port = process.env.PORT || 3000
app.listen(3000, () => console.log(`Listening on port ${port}`))