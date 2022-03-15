import React, { useState, useEffect } from 'react'
import personService from '../services/people'

const PersonForm = ({persons, setPersons, setErrorMessage}) => {
    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber ] = useState('')

    useEffect(() => {
        personService
          .getAll()
          .then(initialP => {
            setPersons(initialP)
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
        const nameObject = {
          name: newName,
          number: newNumber
        }
        
        var similar = persons.filter(function(person) {
          return person.name === newName
        })
        if (similar.length === 1) {
          var result = window.confirm(newName + " is already in the phonebook are you sure you want to change their number");
          if (result === true) {
            personService
            .replace(similar[0].id, nameObject)
            .then(() => personService
              .getAll()
              .then(initialP => {
                setPersons(initialP)
                setErrorMessage({msg:newName + ' number was changed', error:false})
                setTimeout(() => {
                  setErrorMessage(null)
                }, 5000)
                setNewName('')
                setNewNumber('')
              }))
              .catch(error => {
                setErrorMessage({msg:error.response.data.error, error:true})
                console.log(error.response.data)
              })
            }
        } else {
        personService
          .create(nameObject)
          .then(returnedPerson => {
            setPersons(persons.concat(returnedPerson))
            setErrorMessage({msg:newName + " was added", error: false})
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
            setNewName('')
            setNewNumber('')
          })
          .catch(error => {
            setErrorMessage({msg:error.response.data.error, error:true})
            console.log(error.response.data)
          })
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