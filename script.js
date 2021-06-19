const apikey = "3265874a2c77ae4a04bb96236a642d2f";
const url = (city) => `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");


async function getWeatherByLocation(city) {
    const resp = await fetch(url(city), {origin: "cors"});
    const respData = await resp.json();

    console.log(respData);

    addWeatherToPage(respData);
}

function addWeatherToPage(data) {
    const temp = KtoC(data.main.temp);

    const weather = document.createElement("div");
    weather.classList.add("weather");

    weather.innerHTML = `
        <h1>${temp}°C</h1>
        <h4><img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" />${data.weather[0].main}
        </h4>        
    `;

    main.innerHTML = "";

    main.appendChild(weather);
    
}

function KtoC(K) {
    return (K - 273.15).toFixed(0);
}

form.addEventListener("submit", (e)=>{
    e.preventDefault();

    const city = search.value;

    if (city) {
        getWeatherByLocation(city);
    }
})