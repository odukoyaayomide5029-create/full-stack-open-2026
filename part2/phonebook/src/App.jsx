import { useState, useEffect } from 'react'
//  import axios from 'axios'
import './index.css'

import noteService from './services/persons.js'
import { Filter } from './components/Filter.jsx'
import { Notification } from './components/Notification.jsx'
import { PersonForm } from './components/PersonForm.jsx'
import { Persons } from './components/Persons.jsx'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filtering, setFiltering] = useState('')
  const [message, setMessage] = useState(null)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    noteService.getAll().then(person => {
      setPersons(person)
    })
  }, [])

  const remove = (id) => {
    const person = persons.find(p => p.id === id)
    if (window.confirm(`Delete ${person.name}`)) {
      setIsError(false)
    noteService.remove(id)
        .then(() => {
          setPersons(persons.filter((note) => { return note.id !== id }))
           setMessage(`Information of ${person.name} has been deleted`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)

        })
        .catch(() => {
          setIsError(true)
          setMessage(`Information of ${person.name} has already been removed from server`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
          setPersons(persons.filter((note) => { return note.id !== id }))
        })
    }
  }

  const updateNumber = (existingPerson) => {
    if (existingPerson) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        let newPerson = { ...existingPerson, number: newNumber }
        noteService.update(newPerson.id, newPerson).then(response => {
          setIsError(false)
           setPersons(persons.map((person) => { return person.id === existingPerson.id ? response : person }))
          setMessage(`Number of ${newPerson.name} updated`)
           setTimeout(() => {
            setMessage(null)
          }, 5000)
        }).catch(()=>{
        setIsError(true)
          setMessage(`Information of ${newPerson.name} has already been removed from server`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
           setPersons(persons.filter((note) => { return note.id !== existingPerson.id }))
        }

        )
      }
      setNewName('')
      setNewNumber('')
    }
  }

  const updateClick = (event) => {
    event.preventDefault()

    if (newName.trim() === '' || newNumber.trim() === '') { return }
    const existingPerson = persons.find(person => { return person.name == newName })
    if (existingPerson) {
      updateNumber(existingPerson)
    }
    else {
      const newObject = { name: newName, number: newNumber }

      if (persons.some((person) => { return person.name === newName })) {
        alert(`${newObject.name} is already added to Phone book`)
        return
      }
      noteService.create(newObject).then(response => { 
        setIsError(false)
        setPersons([...persons, response]) 
          setMessage(`Added ${newObject.name}`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)

      })
    
      setNewName('')
      setNewNumber('')
    }
  }

  const personsToShow = persons.filter((person) => {
    return person.name.toLowerCase().includes(filtering.toLowerCase())
  })

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={message} isError={isError} />
      <Filter filtering={filtering} setFiltering={setFiltering} />

      <h1>Add a new</h1>
      <PersonForm newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} updateClick={updateClick} />

      <h1>Persons</h1>
      <Persons personsToShow={personsToShow} remove={remove} />
    </div>
  )
}

export default App