import { useEffect, useState } from "react"
import axios from 'axios'

const Filter = ({ filterName, handleFilter }) => (
  <div> 
    find countries <input value={filterName} onChange={handleFilter} /> 
  </div>
)

const Info = ({ countries, handleClick }) => {
  const nCountries = countries.length
  if (nCountries === 0) {
    return <p> No matches found </p>
  } else if (nCountries > 10) {
    return <p> Too many matches, specify another filter </p>
  } else if (nCountries > 1) {
    return (
      countries.map(country => 
        <div key={country.name.common}>
          <p> {country.name.common} </p> <button onClick={handleClick} value={country.name.common}> show </button>
        </div>
      )
    )
  } 

  return <Country country={countries[0]} /> 
}

const Country = ({ country }) => (
  <>
    <h1> { country.name.common } </h1>
    <p> capital { country.capital.map(capital => capital) }</p>
    <p> area { country.area }</p>
    <h2>languages:</h2>
    <ul>
      {Object.values(country.languages).map(lan => <li key={lan}>{lan}</li>)}
    </ul>
    <img src={country.flags.svg} alt='flag' style={{ width: "30%", height: "30%" }} />
  </>
)

const App = () => {
  const [countries, setCountries] = useState([])
  const [filterName, setFilterName] = useState('')
  const handleFilter = (event) => {
    setFilterName(event.target.value)
  }

  const handleClick = (event) => {
    event.preventDefault()

    setFilterName(event.target.value)
  }
  
  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => setCountries(response.data))
  }, [])

  const countriesToShow = countries.filter(country => country.name.common.toLowerCase().includes(filterName.toLowerCase()))

  return (
    <div>
      <Filter filterName={filterName} handleFilter={handleFilter}/>
      <Info countries={countriesToShow} handleClick={handleClick} />
    </div>
  )
}

export default App