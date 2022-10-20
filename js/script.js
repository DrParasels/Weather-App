// let url = `https://api.openweathermap.org/data/2.5/forecast?q=moscow&appid=${key}&units=metric`
const days = [
  "Воскресенье",
  "Понедельник",
  "Вторник",
  "Среда",
  "Четверг",
  "Пятница",
  "Суббота",
];
const mounth = [
  "Января",
  "Февраля",
  "Марта",
  "Апреля",
  "Мая",
  "Июня",
  "Июля",
  "Августа",
  "Сентября",
  "Октября",
  "Ноября",
  "Декабря",
];

const daysShort = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];
const mounthShort = [
  "Янв",
  "Фев",
  "Март",
  "Апр",
  "Мая",
  "Июня",
  "Июля",
  "Авг",
  "Сент",
  "Окт",
  "Нояб",
  "Дек",
];

let result = document.querySelector(".day__result"),
  searchBtn = document.querySelector(".search-btn"),
  cityRef = document.getElementById("city"),
  hourList = document.querySelector(".day__hour-list"),
  humidityValue = document.querySelector(".result__humidity-value"),
  windValue = document.querySelector(".result__wind-value"),
  pressureValue = document.querySelector(".result__pressure-value"),
  switchDay = document.querySelector(".day-btn"),
  switchWeek = document.querySelector(".week-btn"),
  forecastDay = document.querySelector(".forecast__day"),
  forecastWeek = document.querySelector(".forecast__week"),
  weatherWeek = document.querySelector(".forecast__week");
(info = {
  city: "Moscow",
  temp: "+25",
  icon: "broken clouds",
}),
  (weekArr = {});

let getWeather = () => {
  hourList.innerHTML = "";
  let cityValue = cityRef.value;
  //If input field is empty
  if (cityValue.length === 0) {
    result.innerHTML = `<h3 class="msg">Please enter a city name</h3>`;
  }
  //If input field is NOT empty
  else {
    let url1 = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${key}&units=metric&lang=ru`;
    let url2 = `https://api.openweathermap.org/data/2.5/forecast?q=${cityValue}&appid=${key}&units=metric`;
    //Clear the input field
    cityRef.value = "";
    fetch(url1)
      .then((resp) => resp.json())
      //If city name is valid
      .then((data) => {
        const {
          name: city,
          main: { temp, humidity, pressure },
          wind: { speed },
          weather: {
            0: { icon, description },
          },
        } = data;

        info = { ...info, temp, city, icon };
        console.log(info);
        result.innerHTML = `<div class="day-box">
        <div class="day__city">${city}</div>
        <div class="day__data">${getUserTime(0)}</div>
        <div class="day__temp">+${Math.round(temp)}&#176</div>
        <div class="day__descr">${description}</div>
        </div>
        <div class="day__cloudCover"><img src="../images/icons/${getImage(
          icon
        )}.png" alt=""></div>`;
        humidityValue.textContent = humidity + " %";
        windValue.textContent = Math.round(speed) + " м/с";
        pressureValue.textContent = Math.round(pressure * 0.74) + " мм рт.ст";
      })
      //If city name is NOT valid
      .catch(() => {
        result.innerHTML = `<h3 class="msg">Город не найден</h3>`;
      });

    fetch(url2)
      .then((resp) => resp.json())
      //If city name is valid
      .then((data) => {
        weekArr = data.list;
        const hoursArr = weekArr.slice(0, 7);

        hoursArr.forEach((element, index) => {
          hourList.innerHTML += `
        <div class="day__list-item">
          <span>${getDataWeek2(hoursArr[index].dt_txt)}</span>
          <img src="../images/icons/${getImage(
            element.weather[0].icon
          )}.png" alt="">
            <div class="info">
              <span class="day__item-temp">+${Math.round(
                element.main.temp
              )}&#176</span>
            </div>
          </div>`;
        });

        const abc = weekArr.filter(
          (item) => item.dt_txt.includes("12:00:00") == true
        );
        abc.forEach((element, index) => {
          weatherWeek.innerHTML += `
        <div class="week__list-item">
        <span class="week__date">${getDataWeek(abc[index].dt_txt)}</span>
          <span class="week__temp">+${Math.round(element.main.temp)}&#176</span>
          <img src="../images/icons/${getImage(
            element.weather[0].icon
          )}.png" alt=""></div>`;
        });
        switchDay.addEventListener("click", toggleFunc);
        switchWeek.addEventListener("click", toggleFunc2);
      });
  }
};

const toggleFunc = function () {
  forecastWeek.style.display = "none";
  forecastDay.style.display = "block";
};

const toggleFunc2 = function () {
  forecastDay.style.display = "none";
  forecastWeek.style.display = "block";
};

const getImage = (cloudCover) => {
  switch (cloudCover) {
    case "03d":
      return "03";
    case "03n":
      return "03";
    case "04d":
      return "04";
    case "04n":
      return "04";
    case "09d":
      return "09";
    case "09n":
      return "09";
    case "09d":
      return "09";
    case "11d":
      return "11";
    case "11n":
      return "11";
    case "13d":
      return "13";
    case "13n":
      return "13";
    case "50d":
      return "50";
    case "50n":
      return "50";
    default:
      return cloudCover;
  }
};

searchBtn.addEventListener("click", getWeather);
window.addEventListener("load", getWeather);

function getUserTime() {
  let t = new Date();
  let d = days[t.getDay()];
  let D = t.getDate();
  let m = mounth[t.getMonth()];
  return `${d}, ${D} ${m}`;
}

const getDataWeek = function (item) {
  let a = item.split(" ")[0];
  let t = new Date(a);
  let d = days[t.getDay()];
  let D = t.getDate();
  let m = mounth[t.getMonth()];
  return `${d}, ${D} ${m}`;
};

const getDataWeek2 = function (item) {
  let a = item.split(" ");
  let t = new Date(a[0]);
  let d = daysShort[t.getDay()];
  let D = t.getDate();
  return `${d}, ${D} ${a[1].slice(0, -3)}`;
};
