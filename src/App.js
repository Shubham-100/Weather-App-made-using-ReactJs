import React, {useCallback, useState} from "react";
import axios from 'axios';
import './style.css'

export default function App() {

  const [city, setCity] = useState("");
  const [data, setData] = useState({});

  const getWeather=useCallback(async (ev) => {
      if (ev.key === "Enter") {
        setCity(ev.target.value);
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${ev.target.value}&units=metric&APPID=3971b6237f1acdcf5a1d29126fae0342`;
        const response = await axios.get(url);
        setData(response.data);
        console.log(response.data);
      }
  }, [data, setData, setCity])

  let d = new Date();
  d.setDate(d.getUTCDate());
  d.setHours(d.getUTCHours() + ((data.timezone)/3600));
  d.setMinutes(d.getUTCMinutes() + ((data.timezone)%60));
  d.setSeconds(d.getUTCSeconds() + ((data.timezone)%3600));

  return (
    <React.Fragment>
      <div className="app">
        <div className="city-input">
          <input type='text' placeholder='Get Weather...' className="inp" align='center' onKeyPress={getWeather}></input>
        </div>
        
        {(typeof data.main != "undefined") ? (
        <div>
        <div className="weather-info">
            <div className="loc">{data.sys.name}</div>
            <div className="date">{d.toLocaleString('en-IN')}</div>   
            <div className="temp">{(data.main.temp)}°C</div>
            
            <div className="type">{data.weather[0].main}</div>
            <div className="wind">Winds: {data.wind.speed}km/h</div>
            
        </div>
        </div>
        ) : ('')}
             
      </div>
    </React.Fragment>
  );
  
}
