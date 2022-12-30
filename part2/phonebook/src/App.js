import { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({filterName, handleFilter}) => (
  <div>
    filter shown with <input value={filterName} onChange={handleFilter}/>
  </div>
)

const PersonForm = ({addPerson, newName, handleNameChange, newPhone, handlePhoneChange}) => (
  <form onSubmit={addPerson}>
    <div>
      name: <input value={newName} onChange={handleNameChange} />
    </div>
    <div>
      number: <input value={newPhone} onChange={handlePhoneChange} />
    </div>
    <div><button type="submit">add</button></div>
  </form>    
)

const Persons = ({persons}) => (
  persons.map(person => 
    <p key={person.id}> {person.name} {person.number}</p>
  )
)

const App = () => {
  const serverAddress = 'http://localhost:3001/persons'

  const [persons, setPersons] = useState([])  
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [filterName, setNewFilterName] = useState('')

  const addPerson = (event) => {
    event.preventDefault()

    const newPerson = {
      name: newName,
      number: newPhone
    }

    if (persons.filter(person => person.name === newName).length > 0) {
      alert(`${newName} is already added to phonebook`)
      return
    } 

    axios
      .post(serverAddress, newPerson)
      .then(response => {
        setPersons(persons.concat(response.data))
        setNewName('')
        setNewPhone('')
      })
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handlePhoneChange = (event) => {
    setNewPhone(event.target.value)
  }

  const handleFilter = (event) => {
    setNewFilterName(event.target.value)
  }

  useEffect(() => {
    axios
      .get(serverAddress)
      .then(response => setPersons(response.data))
  }, [])

  const personsToShow = filterName === '' ? persons : persons.filter(person => person.name.toLowerCase().includes(filterName.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter filterName={filterName} handleFilter={handleFilter} />
  
      <h3>Add a new</h3>
      
      <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newPhone={newPhone} handlePhoneChange={handlePhoneChange} />

      <h3>Numbers</h3>

      <Persons persons={personsToShow} />
    </div>
  )
}

export default App