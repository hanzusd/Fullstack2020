import React, { useState } from 'react'

const Person = (props) => {
  return (
  <div>{props.person.name} {props.person.number}<br></br><br></br></div>)
}

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas',
      number: '040-1231244'}
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('') 

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
    <div>
      <h2>Phonebook</h2>
        <div>
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
        </div>
        <form>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => 
          <Person key={person.name} person={person} />
      )}
    </div>
  )

}

export default App