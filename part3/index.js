const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.static('dist'))

let data=[
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]
app.use(express.json())
morgan.token('body', (request) => {
  if (request.method === 'POST') {
    return JSON.stringify(request.body)
  }

  return ''
})
app.use(morgan(':method :url :status :body'))

app.get('/', (req, res) => {
  res.status(200).send('Server is running');
});
app.get('/api/persons',(request,response)=>{
response.send(data)
})
app.get('/api/persons/:id',(request,response)=>{
  let id=request.params.id
  let item=data.filter(item=>item.id=== id)
response.json(item)
})
app.post('/api/persons',(request,response)=>{
   const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'name or number is missing'
    })
  }

  
  const nameExists = data.some(person => person.name === body.name)

  if (nameExists) {
    return response.status(400).json({
      error: 'name must be unique'
    })
  }



    let dataItem = {
    id: String(Math.floor(Math.random() * 1000000)),
    name: body.name,
   number:body.number
  } 
  console.log(dataItem)
  data = data.concat(dataItem)

  response.json(dataItem)
})
app.get('/info',(request,response)=>{
response.send(` <p>Phonebook has info for ${data.length} people</p>
    <p>${new Date()}</p>`)
})

app.delete('/api/persons/:id',(request,response)=>{
const id = request.params.id
data= data.filter(item=>item.id !== id)
 response.status(204).end()
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
