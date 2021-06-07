let searchInput = document.getElementById("searchInput");
let date = new Date();
let res;
let today;
let second;
let third;

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];


searchInput.addEventListener("keyup", function () {
    search(searchInput.value);
})


async function search(val) {
    await searchWeather(val);
    displayToday();
    displaySecond();
    displayThird();
}

async function searchWeather(a) {
    let t = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=660bc92ff2194b29852141653210105&q=${a}&days=3&aqi=no&alerts=no`);
    res = await t.json();
    today = res.current;
    second = res.forecast.forecastday[1];
    third = res.forecast.forecastday[2];
    console.log(today)
}
var dayOne=days[date.getDay()];
function displayToday() {
    document.getElementById("todayWeather").innerHTML =
        `
    <div class="head d-flex justify-content-between py-2 px-3">
    <span>${dayOne}</span>
    <span>${date.getDate()}  ${monthNames[date.getMonth()]}</span>
</div>
<div class="todayCont d-flex flex-column py-3 px-3">
    <h3>${res.location.name}</h3>
    <span class=" fa-4x font-weight-bold text-white">${today.temp_c}<sup>o</sup>C <img
            src="https://${today.condition.icon}" alt="" width=90> </span>
    <span class="py-3 main-color">${today.condition.text}</span>
    <div class="py-4">
        <span class="px-2"><img class="px-1" src="images/icon-umberella.png" alt="">${res.forecast.forecastday[0].day.avghumidity} %</span>
        <span class="px-2"><img class="px-1" src="images/icon-wind.png" alt="">${today.wind_kph} km/h</span>
        <span class="px-2"><img class="px-1" src="images/icon-compass.png" alt="">${today.wind_dir}</span>
    </div>
</div>
    `
}
var dayTwo;
dayTwo = ((date.getDay() + 1) == 7) ? days[0] :  days[date.getDay() + 1];

function displaySecond() {
    document.getElementById("secondDay").innerHTML =
        `
    <div class="head d-flex justify-content-between py-2 px-3">
    <span>${dayTwo}</span>
    <span>${date.getDate() + 1}  ${monthNames[date.getMonth()]}</span>
</div>
<div class="d-flex flex-column justify-content-center align-items-center" id="second">
    <span><img class="pt-5 pb-3" src="https://${second.day.condition.icon}"
            alt=""></span>
    <h3 class="text-white font-weight-bold">${second.day.maxtemp_c}<sup> o</sup>C </h3>
    <h5>${second.day.mintemp_c}<sup> o</sup></h5>
    <span class="main-color py-4">${second.day.condition.text}</span>
</div>
    `
}
var dayThree;
dayThree = ((date.getDay() + 2) == 7) ? days[0] : ((date.getDay() + 2) == 8) ? days[1] : days[date.getDay() + 2];

function displayThird() {
    document.getElementById("thirdDay").innerHTML = `
         <div class="head d-flex justify-content-between py-2 px-3">
             <span>${dayThree}</span>
             <span>${date.getDate() + 2}  ${monthNames[date.getMonth()]}</span>
         </div>
         <div class="d-flex flex-column justify-content-center align-items-center" id="second">
             <span><img class="pt-5 pb-3" src="https://${third.day.condition.icon}"
                    alt=""></span>
             <h3 class="text-white font-weight-bold">${third.day.maxtemp_c}<sup> o</sup>C </h3>
             <h5>${third.day.mintemp_c}<sup> o</sup></h5>
             <span class="main-color py-4">${third.day.condition.text}</span>
         </div>
`
}


search("cairo");

