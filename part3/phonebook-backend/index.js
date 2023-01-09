const dotenv = require('dotenv')

dotenv.config()

const express = require('express')
const cors = require('cors')
const Person = require('./models/person')

const app = express()
app.use(express.json())
app.use(cors())
app.use(express.static('build'))

// app.use(morgan('tiny'))
// morgan.token('body', request => JSON.stringify(request.body))
// app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

// let persons = [
//     { 
//       "id": 1,
//       "name": "Arto Hellas", 
//       "number": "040-123456"
//     },
//     { 
//       "id": 2,
//       "name": "Ada Lovelace", 
//       "number": "39-44-5323523"
//     },
//     { 
//       "id": 3,
//       "name": "Dan Abramov", 
//       "number": "12-43-234345"
//     },
//     { 
//       "id": 4,
//       "name": "Mary Poppendieck", 
//       "number": "39-23-6423122"
//     }
// ]

app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => 
        response.json(persons)
    )
})

app.get('/api/persons/:id', (request, response, next) => {
    const id = Number(request.params.id)

    Person.findById(request.params.id)
        .then(person => {
            if (person) {
                response.json(person)
            } else {
                response.statusMessage = `Not found any person with id ${id}`
                response.status(404).end()        
            }
        })
        .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
    const id = Number()
    Person.findByIdAndRemove(request.params.id)
        .then(result => {
            if (result) {
                response.status(204).end()
            } else {
                response.status(404).end()
            }
        })
        .catch(error => next(error))
})

app.get('/info', (request, response) => {
    Person.countDocuments({}, function(err, count) {
        response.send(`
            <p> Phonebook has info for ${count} people </p>
            <p>${new Date()}</p>
        `)
    });
})

app.post('/api/persons', (request, response, next) => {
    const body = request.body
    
    if (!body || !body.name || !body.number) {
        return response.status(400).json({
            error: 'body content missing'
        })
    }

    Person.find({ name: body.name }).then(persons => {
        if (persons.length !== 0) {
            return response.status(400).json({
                error: 'name must be unique'
            })
        }  
    })

    const person = new Person({
        name: body.name,
        number: body.number
    })
    
    person.save().then(savedPerson => 
        response.json(savedPerson)    
    )
})

app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body

    if (!body || !body.name || !body.number) {
        return response.status(400).json({
            error: 'body content missing'
        })
    }

    const person = {
        name: body.name,
        number: body.number
    }

    Person.findByIdAndUpdate(request.params.id, person, { new: true })
        .then(updatedPerson => response.json(updatedPerson)) 
        .catch(error => {
            next(error)
        })
})

const errorHandler = (error, request, response, next) => {
    console.log(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformated id' })
    } 

    next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`);
})