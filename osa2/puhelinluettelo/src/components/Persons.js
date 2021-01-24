import React from 'react'
import personService from '../services/people'


const Persons = ({ persons, nameFilter, setPersons, setErrorMessage}) => {
    {var things = persons.filter(person => person.name.toLowerCase().includes(nameFilter.toLowerCase())).map(person => 
        <Person key={person.name} person={person} setPersons={setPersons} setErrorMessage={setErrorMessage} />
    )}
    return(things)
}
const Person = ({person, setPersons, setErrorMessage}) => {
    const deleteName = (id) => {
        var result = window.confirm("are you sure you want to delete " + person.name + "?");
        if (result === true) {
         personService
            .exterminate(id)
            .then(() => 
            personService
            .getAll()
            .then(initialP => {
            setErrorMessage({msg: person.name + " has been deleted", error:false})
            setTimeout(() => {
                setErrorMessage(null)
              }, 5000)
            setPersons(initialP)
        })
        ) 
        .catch(error => {
            setErrorMessage({msg: person.name + " has already been removed", error:true})
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
          })
        }
    }
    

    return (
    <div>{person.name} {person.number} <button onClick= {() => deleteName(person.id)}>delete</button> <br></br></div>)
    }


export default Persons