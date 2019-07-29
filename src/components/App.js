import React, { Component } from 'react';
import '../styles/App.css';
import CurrentWeather from './CurrentWeather';
import WeatherForecast from './WeatherForecast';

class App extends Component {
  state = {
    cityName: "", // city name - from the form
    cityNameImproved: "", // city name - from the API
    currentDate: "", // date of downloading data from the API

    currentWeather: {}, // empty object for data with current weather (in the API it's also one object)
    weatherForecast: [], // empty array for data woth weather forecast for the next 5 days

    buttonClicked: false, // it says, if the form with the city name has been submitted
    currentWeatherDownloaded: false, // it says, if data with current weather have already been downloaded
    weatherForecastDownloaded: false, // it says, if data with weather forecast have already been downloaded
    fetchError404: false, // the true value means that there is no data for the city name entered
    firstIndexesSet: false, // it says, if first indexes with weather forecast data have already been set (more info below)

    // The App dispaly current weather and weather forecast for today and the next 4 days, but in the API we have weather forecast for every 3 hours (ex. 0:00, 3:00 etc.). The App will display data for every day at 3:00 PM and 3:00 AM so we have to set first indexed in the array from the API. Note - there is an exception! When we check the weather after 3:00 PM, we don't have data from this hour for that day, so in this case for today the App will display data from 6:00 PM or 9:00 PM.
    firstDayIndex: "", // first index for data from 3:00 PM
    firstDayIndexImproved: "", // first index for data from 3:00 PM - when an exception occurs
    firstNightIndex: "" // first index for data from 3:00 AM
  }

  // array with days' names to display
  daysNames = ["Niedziela", "Poniedz.", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota"]

  //method for downloading data about current weather from external API
  handleFetchCurrentWeather = () => {
    const currentWeatherApi = `https://api.openweathermap.org/data/2.5/weather?q=${this.state.cityName},pl&APPID=695372989472a8618dc8654571d57c8d&units=metric`;

    fetch(currentWeatherApi)
      .then(response => {
        if (response.ok) {
          return response;
        } else if (response.status === 404) {
          this.setState({
            fetchError404: true
          });
        }
        throw Error(response.status);
      })
      .then(response => response.json())
      .then(data => {
        this.setState({
          currentWeather: data,
          currentWeatherDownloaded: true,
          fetchError404: false
        })
      })
      .catch(error => {
        console.log(error);
      });
  }

  // method for downloading data about weather forecast from external API
  handleFetchWeatherForecast = () => {
    const weatherForecastApi = `https://api.openweathermap.org/data/2.5/forecast?q=${this.state.cityName},pl&APPID=695372989472a8618dc8654571d57c8d&units=metric`;

    fetch(weatherForecastApi)
      .then(response => {
        if (response.ok) {
          return response;
        } else if (response.status === 404) {
          this.setState({
            fetchError404: true
          });
        }
        throw Error(response.status);
      })
      .then(response => response.json())
      .then(data => {
        const weatherForecast = data.list;
        const cityNameImproved = data.city.name;
        this.setState({
          cityNameImproved,
          weatherForecast,
          weatherForecastDownloaded: true,
          fetchError404: false
        })
      })
      .catch(error => {
        console.log(error);
      });
  }

  // method for setting first indexes of weather forecast array
  sefFirstIndexes = () => {
    const dataFirstDate = new Date(this.state.weatherForecast[0].dt_txt);
    const dataFistTime = dataFirstDate.getHours();
    const factorNumber = (dataFistTime / 3);

    const firstDayIndex = (5 - factorNumber);
    const firstDayIndexImproved = ((firstDayIndex >= 0) ? firstDayIndex : 0);
    const firstNightIndex = ((9 - factorNumber) % 8);

    const currentDate = new Date();

    this.setState({
      currentDate,
      firstIndexesSet: true,
      firstDayIndex,
      firstDayIndexImproved,
      firstNightIndex
    })
  }

  // method, which changes city name for the value from the input
  handleChangeCityName = (e) => {
    this.setState({
      cityName: e.target.value
    });
  }

  // method called after submitting a form - it calls fetch methods, which will download data from the API
  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({
      buttonClicked: true,
      currentWeatherDownloaded: false,
      weatherForecastDownloaded: false,
      firstIndexesSet: false
    })
    this.handleFetchCurrentWeather();
    this.handleFetchWeatherForecast();
  }

  // method, which checks same boolean values from the state and calls setFirstIndexes method
  componentDidUpdate() {
    const { currentWeatherDownloaded, weatherForecastDownloaded, firstIndexesSet } = this.state;
    if (currentWeatherDownloaded && weatherForecastDownloaded && !firstIndexesSet) {
      this.sefFirstIndexes();
    }
  }

  // component with three parts - form to enter city name, part with current weather and part with weather forecast
  render() {
    return (
      <section id="weatherWidget">
        <form onSubmit={this.handleSubmit}>
          Wpisz nazwę miejscowości:&nbsp;
          <input type="text" value={this.state.cityName} onChange={this.handleChangeCityName} />&nbsp;
          <button>Wyszukaj</button>
        </form>

        <div id="weatherApp">
          {this.state.buttonClicked ? (
            (this.state.currentWeatherDownloaded && this.state.weatherForecastDownloaded && this.state.firstIndexesSet) ? (
              <>
                <h2>{this.state.cityNameImproved}</h2>
                {this.daysNames[this.state.currentDate.getDay()]}, {this.state.currentDate.toLocaleString()}
                <div>
                  <CurrentWeather
                    currentWeather={this.state.currentWeather}
                  />
                  <WeatherForecast
                    weatherForecast={this.state.weatherForecast}
                    firstDayIndex={this.state.firstDayIndex}
                    firstDayIndexImproved={this.state.firstDayIndexImproved}
                    firstNightIndex={this.state.firstNightIndex}
                    daysNames={this.daysNames}
                  />
                </div>
              </>
            ) : (
                this.state.fetchError404 ? <h3>Brak miejscowości w bazie.</h3> : <h3>Ładowanie danych ...</h3>
              )
          ) : <h3>Wpisz nazwę miejscowości i kliknij przycisk.</h3>}
        </div>
      </section>
    );
  }
}

export default App;
