

const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/phonebook')

const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.static('dist'))

// let data=[
//     { 
//       "id": "1",
//       "name": "Arto Hellas", 
//       "number": "040-123456"
//     },
//     { 
//       "id": "2",
//       "name": "Ada Lovelace", 
//       "number": "39-44-5323523"
//     },
//     { 
//       "id": "3",
//       "name": "Dan Abramov", 
//       "number": "12-43-234345"
//     },
//     { 
//       "id": "4",
//       "name": "Mary Poppendieck", 
//       "number": "39-23-6423122"
//     }
// ]
app.use(express.json())
morgan.token('body', (request) => {
  if (request.method === 'POST') {
    return JSON.stringify(request.body)
  }

  return ''
})
app.use(morgan(':method :url :status :body'))

app.get('/', (req, res,) => {
  res.status(200).send('Server is running');
});
app.get('/api/persons',(request,response,next)=>{
Person.find({}).then(persons => {
    response.json(persons)
  }).catch(error => next(error))
})
app.get('/api/persons/:id',(request,response,next)=>{
   Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))

})
app.post('/api/persons',(request,response,next)=>{
   const body = request.body
   



const person = new Person({
    name: body.name,
    number:body.number
  })
  person.save().then(savedPerson=>{return response.json(savedPerson)}).catch(error => next(error))

})
app.get('/info',(request,response)=>{
response.send(` <p>Phonebook has info for ${Person.length} people</p>
    <p>${new Date()}</p>`)
})

app.delete('/api/persons/:id',(request,response)=>{
  Person.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end()
    }).catch(error => next(error))
}

)
app.put('/api/persons/:id', (request, response) => {
  const { name, number } = request.body

  Person.findByIdAndUpdate(
    request.params.id,
    { name, number },
    { new: true }
  )
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => {
      console.log(error)
      response.status(400).json({ error: 'malformed id or update failed' })
    })
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({
      error: 'malformatted id'
    })
  }
  else if (error.name === 'ValidationError') {
    return response.status(400).json({
      error: error.message
    })
  }


  next(error)
}

app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
