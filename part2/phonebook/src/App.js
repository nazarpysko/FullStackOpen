import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', phone: '040-1234567'}
  ])  
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [filterName, setNewFilterName] = useState('')

  const addPerson = (event) => {
    event.preventDefault()

    if (persons.filter(person => person.name === newName).length > 0) {
      alert(`${newName} is already added to phonebook`)
      return
    } 

    setPersons(persons.concat({name: newName, phone: newPhone}))
    setNewName('')
    setNewPhone('')
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

  const personsToShow = filterName === '' ? persons : persons.filter(person => person.name.toLowerCase().includes(filterName.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      
      <div>
        filter shown with <input value={filterName} onChange={handleFilter}/>
      </div>

      <h2>add a new</h2>

      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newPhone} onChange={handlePhoneChange} />
        </div>
        <div><button type="submit">add</button></div>
      </form>
      
      <h2>Numbers</h2>
      {personsToShow.map(person => 
        <p key={person.name}> {person.name} {person.phone}</p>
      )}
    </div>
  )
}

export default App