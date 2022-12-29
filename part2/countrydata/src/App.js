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
        <div key={country.name.common} style={{ display: "flex"}}>
          <p  style={{ margin: "0" }}> {country.name.common} </p> <button onClick={handleClick} value={country.name.common} style={{ marginRight: "auto"}}> show </button>
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
    <img src={country.flags.svg} alt='flag' style={{ width: "20%", height: "20%" }} />

    <Weather city={country.capital[0]} latlng={country.capitalInfo.latlng} />
  </>
)

const Weather = ({ city, latlng }) => {
  const [weather, setWeather] = useState('')

  useEffect(() => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?lat=${latlng[0]}&lon=${latlng[1]}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`)
      .then(response => {setWeather(response.data)})
  }, [latlng])

  if (weather === '') {
    return 
  }

  return (
    <>
      <h1>{ city }</h1>
      <p> temperature {weather.main.temp} Celsius</p>
      <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="weather icon" />
      <p>wind {weather.wind.speed} m/s</p>
    </>
  )
}

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