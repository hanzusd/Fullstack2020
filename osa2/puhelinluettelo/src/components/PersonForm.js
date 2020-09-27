import React, { useState, useEffect } from 'react'
import axios from 'axios'

const PersonForm = ({persons, setPersons}) => {
    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber ] = useState('')

    useEffect(() => {
        axios
          .get('http://localhost:3001/persons')
          .then(response => {
            setPersons(response.data)
          })
      }, [])

    
     const handleNameChange = (event) => {
        setNewName(event.target.value)
      }
    
      const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
      }
    
      const addName = (event) => {
        event.preventDefault()
        
        var similar = persons.filter(function(person) {
          return person.name === newName
        })
        if (similar.length === 1) {
          window.alert(`${newName} is already added to phonebook`)
        } else {
        const nameObject = {
          name: newName,
          number: newNumber,
          id: newName,
        }
        setPersons(persons.concat(nameObject))
        setNewName('')
        setNewNumber('')
        }
      }
     
      return (
    <form onSubmit={addName}>
          name: 
          <input 
            value={newName}
            onChange={handleNameChange}
           /> 
          <div>number: 
          <input 
            value={newNumber}
            onChange={handleNumberChange}/></div>
          <button type="submit">save</button>
        </form>
      )
}

export default PersonForm