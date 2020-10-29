function handleSubmit(event) {
  event.preventDefault();
  const locationField = document.getElementById('location');
  const dateField = document.getElementById('date');
  const location = locationField.value;
  const date = dateField.value;

  if (location.trim().length === 0) {
    alert('type a city and a country');
    locationField.focus();
    return;
  }

  if (date.trim().length === 0) {
    alert('type a date');
    dateField.focus();
    return;
  }

  const url = 'http://localhost:3000/trip/expectation?location=' + location + '&date=' + date;
  fetch(url).then(function (res) {
    return res.json();
  }).then(function (tripInfo) {
    document.getElementById('full-location').innerHTML = tripInfo.fullLocation;
    document.getElementById('temp-min').innerHTML = tripInfo.tempMin;
    document.getElementById('temp-max').innerHTML = tripInfo.tempMax;
    document.getElementById('weather-description').innerHTML = tripInfo.weatherDesc;
    document.getElementById('weather-icon').src = tripInfo.weatherIcon;
    document.getElementById('location-pic').src = tripInfo.locationPic;
    document.getElementById('second').classList.remove('hidden');
  });
}

export { handleSubmit };
