

const apikey = window.env.WEATHER_API_KEY;
console.log("API key loaded:", apikey); // ✅ Check this
const citybutton = document.getElementById("getweather");

citybutton.addEventListener("click", function(){
    const city = document.getElementById("city").value;
  const url = `https://api.weatherapi.com/v1/current.json?key=${apikey}&q=${city}`;
  fetch(url)
    .then(res => res.json())
    .then(data => {
      document.getElementById("weatherResult").innerHTML = `
        <h2>${data.location.name}, ${data.location.country}</h2>
        <p>🌡️ ${data.current.temp_f}°F</p>
        <p>${data.current.condition.text}</p>
     
        <img src="${data.current.condition.icon}" alt="Weather icon">
      `;
        })
    .catch(() => {
      document.getElementById("weatherResult").innerHTML = "City not found!";
    });
});

