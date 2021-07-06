import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [temp, setTemp] = useState(0);
  const [data, setData] = useState(0);
  const [icon, setIcon] = useState("");
  const [country, setCountry] = useState("");
  const [description, setDescription] = useState("");
  const [main, setMain] = useState("");
  const [name, setName] = useState("");
  const iconurl = `http://openweathermap.org/img/wn/${icon}@4x.png`;

  useEffect(() => {
    window.navigator.geolocation.getCurrentPosition((pos) => {
      const lat = pos.coords.latitude;
      const lon = pos.coords.longitude;
      const ResultData = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_WEATHER_KEY}`;
      fetch(ResultData)
        .then((res) => res.json())
        .then((data) => {
          setTemp(Math.round(data.main.temp - 273.15));
          setCountry(data.sys.country);
          setName(data.name);
          setData(data.cod);
          setIcon(data.weather[0].icon);
          setDescription(data.weather[0].description);
          setMain(data.weather[0].main);
        })
        .catch((err) => console.log(err.message));
    });
  }, []);

  return (
    <>
      {data === 200 ? (
        <div className="App container-fluid">
          <h1 className="text-light mb-5">Weather Application</h1>

          <div class="card shadow text-center bg-primary text-light">
            <div className="overflow">
              <img src={iconurl} class="card-img-top" alt="wether icon" />
            </div>
            <div class="card-body">
              <h3 class="card-title">
                <strong>{main}</strong>
              </h3>
              <p className="card-text">
                Temperature: <strong> {temp}&#176;C </strong> <br />
                Place: <strong>{name}</strong> <br />
                Country: <strong>{country}</strong> <br />
                Description: <strong>{description} </strong>
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="container-fluid">
          <h1>Oops Something went wrong!</h1>
        </div>
      )}
    </>
  );
}

export default App;
