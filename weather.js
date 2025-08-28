

const apikey = window.env.WEATHER_API_KEY;
// const apikey = 
console.log("API key loaded:", apikey); // ✅ Check this
const citybutton = document.getElementById("getweather");
const d = new Date();
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const days = ["Sunday", "Monday", "Tuesday", "Wednesday","Thursday","Friday", "Saturday"]

 const conditionCategory = (code) => {
          if (code === 1000) return 'Sunny';
          if (code === 1003) return 'PartlySunny';
          if ([1003, 1006, 1009].includes(code)) return 'Cloudy';            // partly / overcast
          if ([1063, 1183, 1189, 1195].includes(code)) return 'Rainy';
          if ([1273, 1276].includes(code)) return 'Stormy';
          if ([1066, 1210, 1225].includes(code)) return 'Snowy';
          return 'Cloudy'; // fallback
};

citybutton.addEventListener("click", function(){
    const city = document.getElementById("city").value;
  const url = `https://api.weatherapi.com/v1/forecast.json?key=${apikey}&q=${city}&days=1`;
  fetch(url)
    .then(res => res.json())
    .then(data => {
      
      document.getElementById("citystate").innerHTML = `
        ${data.location.name}, ${data.location.region}, 
 
      `;
      document.getElementById("country").innerHTML = 
       `
         ${data.location.country}
 
      `;
      document.getElementById("date").innerHTML = 
       `${days[d.getDay()]}, ${months[d.getMonth()]} ${d.getDate()} `
 
      ;
      document.getElementById("condition").innerHTML = 
       ` ${data.current.condition.text} `
 
      ;
      document.getElementById("temp").innerHTML = 
       ` ${data.current.temp_f}°F`
 
      ;
      document.getElementById("uv").textContent = 
       `UV: ${data.current.uv}`
 
      ;
      document.getElementById("high").textContent =
       `High: ${data.forecast.forecastday[0].day.maxtemp_f}°F`
 
      ;
      document.getElementById("low").textContent =
       `Low: ${data.forecast.forecastday[0].day.mintemp_f}°F`
 
      ;
      document.getElementById("rain").textContent =
       `Chance of rain today: ${data.forecast.forecastday[0].day.daily_chance_of_rain}%`
      
      ;
        const code = data.current.condition.code;
  const category = conditionCategory(code);

  if (category === "Cloudy") {
    document.getElementById("icon").src = "images/cloudy.png";
  } else if (category === "Sunny") {
    document.getElementById("icon").src = "images/sunny.png";
  } else if (category === "Rainy") {
    document.getElementById("icon").src = "images/rainy.png";
  } else if (category === "Snowy") {
    document.getElementById("icon").src = "images/snowy.png";
  } else if (category === "PartlySunny") {
    document.getElementById("icon").src = "images/partlysunny.png";
  } else {
    document.getElementById("icon").src = "images/stormy.png"; 
  }
 
      ;
        })
    .catch(() => {
      document.getElementById("weatherResult").innerHTML = "City not found!";
    });
});



