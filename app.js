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


  if (temperatura > 10) {
    document.getElementById("imgchnge").src = "climatropical.jpg";

  } else {
    document.getElementById("imgchnge").src = "climaFrio.jpg";
  }
}

const formulario = document.getElementById('buscar');
const contBusqueda = document.getElementById('busqueda');
formulario.addEventListener('submit', Ubicaccion, true);



async function search(query) {
  try {
    const response = await fetch(`${URLBASE}q=${query}&appid=${APIKEY}&lang=es`);
    const data = await response.json();
    city.textContent = `${data.name}, ${data.sys.country}`;
    temp.textContent = Math.floor(`${data.main.temp}` - 273.15);

    if (Math.floor > 10) {
      document.getElementById("imgchnge").src = "climatropical.jpg";

    } else {
      document.getElementById("imgchnge").src = "climaFrio.jpg";
    }

  } catch (err) {
    console.log(err);
    alert('Uff no seh pudo joven vuelva a intetarlo');
  }
}

function Ubicaccion(event) {
  event.preventDefault();
  search(contBusqueda.value);
}

navigator.geolocation.getCurrentPosition(position => {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  getWather(lat, lon);
});