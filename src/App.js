import './App.css';
import axios from 'axios';
import React, { useState } from 'react';


function Card(props) {
  return (
    <div className='Card'>
      <h1>{props.day}</h1>
      <img alt='' src={props.source}></img>
      <h1>{props.high}°F/{props.low}°F</h1>
    </div>
  )
}


function App() {

  const [dayOne, newDayOne] = useState({
    temp: {
      max: '', min: ''
    }
  })

  const [dayTwo, newDayTwo] = useState({
    temp: {
      max: '', min: ''
    }
  })

  const [dayThree, newDayThree] = useState({
    temp: {
      max: '', min: ''
    }
  })

  const [dayfour, newDayFour] = useState({
    temp: {
      max: '', min: ''
    }
  })


  const [dayFive, newdayFive] = useState({
    temp: {
      max: '', min: ''
    }
  })

  const [daySix, newDaySix] = useState({
    temp: {
      max: '', min: ''
    }
  })

  const [daySeven, newDaySeven] = useState({
    temp: {
      max: '', min: ''
    }
  })



  const [format_address, newFormat_address] = useState('')
  const [currentTime, newCurrentTime] = useState()
  const [currentDesc, newCurrentDesc] = useState()
  const [currentTemp, newCurrentTemp] = useState()


  function convertTime(time) {
    let unix_timestamp = time
    var date = new Date(unix_timestamp * 1000);
    var hours = date.getHours();
    var minutes = "0" + date.getMinutes();
    var formattedTime = hours + ':' + minutes.substr(-2);
    var a = new Date(unix_timestamp * 1000);
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var dayOfWeek = days[a.getDay()]
    return {
      day: dayOfWeek, time: formattedTime
    }
  }



  function goBack() {
    document.getElementById("front").style.display = 'flex'
    document.getElementById("givenData").style.display = 'none'
  }


  function send() {
    document.getElementById("front").style.display = 'none'
    document.getElementById("givenData").style.display = 'grid'
    axios.post('https://calm-harbor-33572.herokuapp.com/sendData', {
      Address: document.getElementById('address').value
    }
    )
      .then(function (response) {
        newDayOne(response.data.second.daily[1])
        newDayTwo(response.data.second.daily[2])
        newDayThree(response.data.second.daily[3])
        newDayFour(response.data.second.daily[4])
        newdayFive(response.data.second.daily[5])
        newDaySix(response.data.second.daily[6])
        newDaySeven(response.data.second.daily[7])
        newFormat_address(response.data.first)
        newCurrentTime((convertTime(response.data.second.current.dt).time))
        newCurrentDesc(response.data.second.current.weather[0].description)
        console.log(response.data)
        newCurrentTemp(response.data.second.current.temp)

      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <div className="App">
      <div id='front' className='search'>
        <input id='address' type='text' placeholder='Address'></input>
        <button id='getButton' onClick={() => send()}></button>
      </div>
      <div id='givenData' className='data'>
        <button id='backButton' onClick={() => goBack()}></button>
        <div id='Current'>
          <div id='currentGrid'>
            <h1 id='currentTemp'>{currentTemp}°F</h1>
            <div id='currentIcon'></div>
          </div>
          <p id='currentLocation'>{format_address}</p>
          <h1 id='currentTime'>{currentTime} </h1>
          <h1 id='currentDescription'>{currentDesc}</h1>
        </div>
        <div className='forcast'>
          <Card day={(convertTime(dayOne.dt)).day} high={dayOne.temp.max} low={dayOne.temp.min} />
          <Card day={(convertTime(dayTwo.dt)).day} high={dayTwo.temp.max} low={dayTwo.temp.min} />
          <Card day={(convertTime(dayThree.dt)).day} high={dayThree.temp.max} low={dayThree.temp.min} />
          <Card day={(convertTime(dayfour.dt)).day} high={dayfour.temp.max} low={dayfour.temp.min} />
          <Card day={(convertTime(dayFive.dt)).day} high={dayFive.temp.max} low={dayFive.temp.min} />
          <Card day={(convertTime(daySix.dt)).day} high={daySix.temp.max} low={daySix.temp.min} />
          <Card day={(convertTime(daySeven.dt)).day} high={daySeven.temp.max} low={daySeven.temp.min} />
        </div>
      </div>
    </div>
  );
}

export default App;
