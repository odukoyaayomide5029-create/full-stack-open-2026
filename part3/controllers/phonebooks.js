const phonebookRouter = require('express').Router()
const Person = require('../models/phonebook')
phonebookRouter.get('/',(request,response,next)=>{
Person.find({}).then(persons => {
    response.json(persons)
  }).catch(error => next(error))
})
phonebookRouter.get('/:id',(request,response,next)=>{
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
phonebookRouter.post('/',(request,response,next)=>{
   const body = request.body
   



const person = new Person({
    name: body.name,
    number:body.number
  })
  person.save().then(savedPerson=>{return response.json(savedPerson)}).catch(error => next(error))

})
phonebookRouter.get('/info',(request,response)=>{
response.send(` <p>Phonebook has info for ${Person.length} people</p>
    <p>${new Date()}</p>`)
})

phonebookRouter.delete('/:id',(request,response,next)=>{
  Person.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end()
    }).catch(error => next(error))
}

)
phonebookRouter.put('/:id', (request, response) => {
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
module.exports = phonebookRouter