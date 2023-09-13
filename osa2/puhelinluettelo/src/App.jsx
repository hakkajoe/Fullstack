import { useState, useEffect } from 'react'
import personService from './services/persons'
import './index.css'

const BadNotification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="error">
      {message}
    </div>
  )
}

const GoodNotification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="success">
      {message}
    </div>
  )
}

const Filter = ({ newFilter, handleFilterChange }) => {
  return (
    <div>
      filter shown with <input value={newFilter} onChange={handleFilterChange} />
    </div>
  )
}

const PersonForm = ({ newName, newNumber, handleNameChange, handleNumberChange, addName }) => {
  return (
    <form onSubmit={addName}>
      <div>
        name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Person = ({ id, name, number, removePerson }) => {
  const confirmRemove = () => {
    if (window.confirm(`Delete ${name}?`)) {
      removePerson(id, name)
    }
  }

  return (
    <div>
      {name} {number} <button onClick={confirmRemove}>delete</button>
    </div>
  )
}

const Persons = ({ filteredPersons, removePerson }) => {
  return (
    <div>
      {filteredPersons.map((person) => (
        <Person key={person.id} id={person.id} name={person.name} number={person.number} removePerson={removePerson} />
      ))}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)


  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response)
      })
  }, [])

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const addName = event => {
    event.preventDefault()

    const existingPerson = persons.find((person) => person.name === newName)

    if (persons.some((person) => person.number === newNumber)) {
      alert(`${newNumber} is already added to phonebook.`)
      return
    }

    if (existingPerson) {
      const shouldUpdate = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
      if (shouldUpdate) {
        updatePerson(existingPerson, newNumber)
        return
      }
    }

    const personObject = {
      name: newName,
      number: newNumber,
    }
  
    personService
      .create(personObject)
      .then(response => {
        setPersons(persons.concat(response))
        setNewName('')
        setNewNumber('')
        setSuccessMessage(
          `Added '${newName}'`
        )
        setTimeout(() => {
          setSuccessMessage(null)
        }, 2000)
      })
  }

  const updatePerson = (existing, newNumber) => {
    personService
      .update(existing.id, newNumber)
      .then((response) => {
        setPersons(
          persons.map((person) =>
            person.id === existing.id ? { ...person, number: newNumber } : person
          )
        )
        setNewName('')
        setNewNumber('')
        setSuccessMessage(
          `Updated '${existing.name}'`
        )
        setTimeout(() => {
          setSuccessMessage(null)
        }, 2000)
      })
      .catch(error => {
        setErrorMessage(
          `Information of '${existing.name}' has already been removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 3000)
      })
  }

  const removePerson = (id, name) => {

    personService
      .remove(id)
      .then(() => {
        setPersons(persons.filter(person => person.id !== id))
      })
    setSuccessMessage(
      `Removed '${name}'`
    )
    setTimeout(() => {
      setSuccessMessage(null)
    }, 2000)
  }

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(newFilter.toLowerCase())
  )

  return (
    <div>
      <h2>Phonebook</h2>
      <BadNotification message={errorMessage} />
      <GoodNotification message={successMessage} />
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />
      <h3>Add a new</h3>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleNameChange={(event) => setNewName(event.target.value)}
        handleNumberChange={(event) => setNewNumber(event.target.value)}
        addName={addName}
      />
      <h3>Numbers</h3>
      <Persons 
        filteredPersons={filteredPersons}
        removePerson={removePerson}
      />
    </div>
  )
}

export default App