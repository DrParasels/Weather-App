// let url = `https://api.openweathermap.org/data/2.5/forecast?q=moscow&appid=${key}&units=metric`

let result = document.querySelector(".result"),
  searchBtn = document.querySelector(".search-btn"),
  cityRef = document.getElementById("city"),
  resultWeek = document.querySelector(".result-week"),
  info = {
    city: "Moscow",
    temp: "+25",
    icon: "broken clouds",
  },
  weekArr = {};

let getWeather = () => {
  resultWeek.innerHTML = "";
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
        console.log(data);
        const {
          name: city,
          main: { temp },
          weather: {
            0: { icon },
          },
        } = data;

        info = { ...info, temp, city, icon };
        console.log(info);
        result.innerHTML = `<div class="text-info"><div class="city">${city}</div>
        <div class="data__time">${getUserTime(0)}</div>
        <div class="temp">+${Math.round(temp)}&#176</div></div>
        <div class="cloudCover"><img src="../images/icons/${getImage(
          icon
        )}.png" alt=""></div>`;
      })
      //If city name is NOT valid
      .catch(() => {
        result.innerHTML = `<h3 class="msg">City not found</h3>`;
      });

    fetch(url2)
      .then((resp) => resp.json())
      //If city name is valid
      .then((data) => {
        console.log(data);
        weekArr = data.list;
        console.log(weekArr);
        const abc = weekArr.filter(
          (item) => item.dt_txt.includes("12:00:00") == true
        );
        console.log(abc);
        abc.forEach((element) => {
          resultWeek.innerHTML += `
        <div class="first-day"><img src="../images/icons/${getImage(
          element.weather[0].icon
        )}.png" alt="">+${Math.round(element.main.temp)}&#176</div>`;
        });
      });
  }
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
    case "11d":
      return "11";
    case "11n":
      return "11";
    case "13d":
      return "13";
    case "13n":
      return "13";
    case "50d":
      return "13";
    case "50n":
      return "50";
    default:
      return "50";
  }
};

searchBtn.addEventListener("click", getWeather);
window.addEventListener("load", getWeather);

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

function getUserTime(a) {
  let t = new Date();
  let d = days[t.getDay() + a];
  let D = t.getDate() + a;
  let m = mounth[t.getMonth()];
  return `${d}, ${D} ${m}`;
}
