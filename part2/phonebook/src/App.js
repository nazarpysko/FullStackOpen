import { useState, useEffect } from 'react'
import phonebooksService from './services/phonebooks'

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

const Persons = ({ persons, deletePerson }) => (
  persons.map(person => 
    <div key={person.id}>
      <p style={{ display: 'inline-block' }}> {person.name} {person.number}</p> <button onClick={() => deletePerson(person)}> delete </button>
    </div>
  )
)

const Notification = ({ msg }) => {
  const notificationStyle = {
    border: '2px solid green',
    color: 'green'
  }

  if (msg === null) {
    return null
  }

  return <h1 style={notificationStyle}> {msg} </h1>
}

const App = () => {
  const [persons, setPersons] = useState([])  
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [filterName, setNewFilterName] = useState('')
  const [notificationMsg, setNotificationMsg] = useState(null)


  const resetFormInput = () => {
    setNewName('')
    setNewPhone('')
  }

  const addPerson = (event) => {
    event.preventDefault()

    const personToChange = persons.find(p => p.name === newName)

    if (typeof personToChange !== 'undefined') {
      const ok = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
      if (ok) {
        phonebooksService.update({...personToChange, number: newPhone})
        .then(personUpdated => {
          setPersons(persons.map(p => p.id === personToChange.id ? personUpdated : p))
        })
      }

      resetFormInput()
      setNotificationMsg(`Updated sucessfully: ${newName}`)
      setTimeout(() => setNotificationMsg(null), 5000)
      return 
    } 

    phonebooksService.create({name: newName, number: newPhone})
      .then(responseData => {
        setPersons(persons.concat(responseData))
        resetFormInput()
        setNotificationMsg(`Created sucessfully: ${newName}`)
        setTimeout(() => setNotificationMsg(null), 5000)
      })
  }

  const deletePerson = (personToDelete) => {
    const cancelClicked = !window.confirm(`Delete ${personToDelete.name}?`)
    
    if (cancelClicked) {
      return
    }

    phonebooksService.deletePerson(personToDelete.id)
      .then(() => setPersons(persons.filter(p => p.id !== personToDelete.id)))
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
    phonebooksService.getAll()
      .then(personsData => setPersons(personsData))
  }, [])

  const personsToShow = filterName === '' ? persons : persons.filter(person => person.name.toLowerCase().includes(filterName.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification msg={notificationMsg}/>

      <Filter filterName={filterName} handleFilter={handleFilter} />
  
      <h3>Add a new</h3>
      
      <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newPhone={newPhone} handlePhoneChange={handlePhoneChange} />

      <h3>Numbers</h3>

      <Persons persons={personsToShow} deletePerson={deletePerson} />
    </div>
  )
}

export default App