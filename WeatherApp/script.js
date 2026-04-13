const getWheather = async (city) => {
  const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=99f33a89b64a4ee8a61161543261202&q=${city}&aqi=yes`)

  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }
  return await response.json();
}

const iconMap = {
  'sun': 'images/sun-1000.png',
  'PartlyCloud': 'images/PartlyCloud-1003.png',
  'CloudyOvercast': 'images/CloudyOvercast-1006-1009.png',
  'MistFog': 'images/MistFog-1030-1135.png',
  'PatchyRainDrizzle': 'images/PatchyRainDrizzle-1063-1150.png',
  'ModerateHeavyRain': 'images/ModerateHeavyRain1183-1189.png',
  'Thunderstorm': 'images/Thunderstorm1273-1276.png'
}

const updateUI = (city) => {
  getWheather(city)
    .then((data) => {
      // console.log(data);
      document.getElementById('tempC').innerText = data.current.temp_c;
      document.getElementById('windSpeed').innerText = data.current.wind_kph;
      document.getElementById('humidity').innerText = data.current.humidity + '%';
      document.getElementById('realFeel').innerText = data.current.feelslike_c + '\u00B0C';
      document.getElementById('uvIndex').innerText = data.current.uv;
      document.getElementById('pressure').innerText = data.current.pressure_mb + ' mb';
      document.getElementById('windGust').innerText = data.current.gust_kph + ' km/h';
      document.getElementById('visCard').innerText = data.current.vis_km + ' km';
      document.getElementById('cloudCard').innerText = data.current.cloud + '%';
      document.getElementById('precepcard').innerText = data.current.precip_mm + ' mm';

      document.getElementById('currLocation').innerText = city;

      const weatherCode = data.current.condition.code;
      if(weatherCode === 1000)
        document.getElementById('weatherIcn').src = 'images/sun-1000.png'
      else if(weatherCode === 1003)
        document.getElementById('weatherIcn').src = 'images/PartlyCloud-1003.png'
      else if(weatherCode >= 1006 && weatherCode <= 1009)
        document.getElementById('weatherIcn').src = 'images/CloudyOvercast-1006-1009.png'
      else if(weatherCode >= 1030 && weatherCode <= 1035)
        document.getElementById('weatherIcn').src = 'images/MistFog-1030-1135.png'
      else if(weatherCode >= 1063 && weatherCode <= 1150)
        document.getElementById('weatherIcn').src = 'images/PatchyRainDrizzle-1063-1150.png'
      else if(weatherCode >= 1183 && weatherCode <= 1189)
        document.getElementById('weatherIcn').src = 'images/ModerateHeavyRain1183-1189.png'
      else if(weatherCode >= 1273 && weatherCode <= 1276)
        document.getElementById('weatherIcn').src = 'images/Thunderstorm1273-1276.png'

    }).catch((err) => {
      console.log('rejected: ', err.message);
    });
}

updateUI('ahmedabad');

searchBtn.addEventListener('click', () => {
  let search = searchTerm.value;
  if(search.toLowerCase() === 'delhi' || search.toLowerCase() === 'delhi ')
    search = 'Delhi IN';
  updateUI(search);

});