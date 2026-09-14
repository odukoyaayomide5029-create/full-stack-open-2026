import {useState,useEffect} from 'react'
import axios from 'axios'
const apiKey = import.meta.env.VITE_WEATHER_API_KEY



const Display=({value,setValue,country,message,selectedCountry,setSelectedCountry,weather,error})=>{
  
return(
<>

<label >Find Countries:</label>
<input value ={value} onChange={(e)=>{
setValue(e.target.value)
}}/>
{error && <p>{error}</p>}
{message && <p>{message}</p>}
{country.length > 1  ? 
country.map((state,key) => { return <p key={key}>{state.name.common}  <button onClick={()=>{setSelectedCountry(selectedCountry===state?null:state)
 
}}>{selectedCountry===state?'hide':'show'}</button></p> }) :
 country.length === 1 ? country.map((state,key) => { return <div key={key}>
  <h1>{state.name.common}</h1>
  <p>Capital:{state.capital}</p>
   <p>Area:{state.area}</p>
   <ul>{Object.values(state.languages).map(lang => <li key={lang}>{lang}</li>)}</ul>
   <p>
  <img src={state.flags.png} alt={state.flags.alt} width="150" /></p>
  {weather && <div>
  <h1>Weather in {state.capital}</h1>
  <p>Temperature {weather.main.temp}°C  </p>
  <img src="https://openweathermap.org/payload/api/media/file/10d@2x.png"/>
  <p>Wind: {weather.wind.speed} m/s</p>
  </div>}

 </div> }) :
  ''}

  {selectedCountry ? (
  <div>
    <h1>{selectedCountry.name.common}</h1>
    <p>{selectedCountry.capital}</p>
    <p>{selectedCountry.area}</p>
    <img src={selectedCountry.flags.png} alt={selectedCountry.flags.alt} width="150" />
    <ul>
      {Object.values(selectedCountry.languages).map(lang => <li key={lang}>{lang}</li>)}
    </ul>
  </div>
) :''}
</>
)
}




function App() {
  const [value,setValue]= useState('')
const [country,setCountry]= useState([])
const [message,setMessage]=useState(null)
const [selectedCountry, setSelectedCountry] = useState(null)
const [weather,setWeather] = useState(null)
const [error,setError]= useState(null)



useEffect(() => {
  if (value.trim() !== '') {
    axios.get(`https://studies.cs.helsinki.fi/restcountries/api/all`).then((response) => {
      setMessage(null)
      setError(null)
      setSelectedCountry(null)  
       setWeather(null) 
      let newCountry = response.data.filter(item =>
        item.name.common.toLowerCase().includes(value.toLowerCase())
      )
      if (newCountry.length > 10 ) {
        setMessage('Too many matches, specify another filter...')
        setCountry([])
        return
      }

      setCountry(newCountry)

      if (newCountry.length === 1 ) {
        console.log('apiKey is:', apiKey)
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${newCountry[0].capital}&appid=${apiKey}&units=metric`)
          .then((weatherResponse) => {
            console.log(weatherResponse.data)
            setWeather(weatherResponse.data)
          }).catch((error)=>{setError(error.message)})
      }
    }).catch((error)=>{setError(error.message)})
  }
}, [value])



  return (
    <>
    <Display value={value} setValue={setValue}  country={country}  message={message} selectedCountry={selectedCountry} setSelectedCountry={setSelectedCountry} weather={weather} error={error}/> 
    </>
  )
}

export default App
