const APIKEY = '8e00bd00303260408cd26ce4da1ce6e2';

const URLBASE = 'https://api.openweathermap.org/data/2.5/weather?';




async function request(url) {

  return fetch(url).then(data => data.json());



}



async function getWather(lat, lon) {


  url = `${URLBASE}lat=${lat}&lon=${lon}&appid=${APIKEY}`;
  const weather = await request(url);
  console.log(weather);
  updateDom(weather.name, weather.main.temp);




}



async function getWatherByCity(city) {

  const url = URLBASE + `q=${ city }&appid=${ APIKEY }`;
  const weather = await request(url);
  updateDom(weather.name, weather.main.temp);

}


function updateDom(city, temp) {
  const cityElement = document.getElementById('city');
  const tempElement = document.getElementById('temp');


  cityElement.textContent = ` ${city}`;
  tempElement.textContent = Math.floor(` ${temp}` - 273.15);

  let temperatura = temp - 273.15;


  if (temperatura > 15) {
    document.getElementById("imgchnge").src = "climatropical.jpg";

  } else {
    document.getElementById("imgchnge").src = "climaFrio.jpg";
  }
}


const searchform = document.getElementById('buscar');
const searchbox = document.getElementById('busqueda');
searchform.addEventListener('submit', onSubmit, true);

function onSubmit(event) {
  event.preventDefault();
  // search(searchbox.value);

  console.log ('esta buscando')
}



navigator.geolocation.getCurrentPosition(position => {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  getWather(lat, lon);
});