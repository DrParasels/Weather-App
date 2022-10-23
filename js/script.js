// let url = `https://api.openweathermap.org/data/2.5/forecast?q=moscow&appid=${key}&units=metric`

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
  targets = document.querySelectorAll(".switch"),
  activeTab = 0,
  old = 0,
  width = [],
  dur = 0.4,
  animation,
  info = {
    city: "Moscow",
    temp: "+25",
    icon: "broken clouds",
  },
  weekArr = {};

let articles = [];
articles.push(forecastDay, forecastWeek);

let getWeather = () => {
  hourList.innerHTML = "";
  forecastWeek.innerHTML = "";
  let cityValue = cityRef.value;
  //If input field is empty
  if (cityValue.length === 0) {
    result.innerHTML = `<h3 class="msg">Введите название города</h3>`;
    // forecastWeek.innerHTML = `<h3 class="msg">Город не найден</h3>`;
  }
  //If input field is NOT empty
  else {
    let url1 = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${key}&units=metric&lang=ru`;
    let url2 = `https://api.openweathermap.org/data/2.5/forecast?q=${cityValue}&appid=${key}&units=metric&lang=ru`;
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
        forecastWeek.innerHTML = `<h3 class="msg">Город не найден</h3>`;
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
        console.log(hoursArr);
        const list = document.querySelectorAll(".day__list-item");
        list.forEach((item, index) =>
          item.addEventListener("click", () =>
            showDetals(index, hoursArr, list)
          )
        );
        const showDetals = function (ind, hoursArr, list) {
          list[ind].style.backgroundColor = "#4475ef";
          list.forEach((item, index) => {
            if (index !== ind) {
              item.style.backgroundColor = "var(--transp-white-2)";
            }
          });
          let city = document.querySelector(".day__city").textContent;
          result.innerHTML = `<div class="day-box">
                <div class="day__city">${city}</div>
                <div class="day__data">${getUserTime(0)}</div>
                <div class="day__temp">+${Math.round(
                  hoursArr[ind].main.temp
                )}&#176</div>
                <div class="day__descr">${
                  hoursArr[ind].weather[0].description
                }</div>
                </div>
                <div class="day__cloudCover"><img src="../images/icons/${getImage(
                  hoursArr[ind].weather[0].icon
                )}.png" alt=""></div>`;
          humidityValue.textContent = hoursArr[ind].main.humidity + " %";
          windValue.textContent = Math.round(hoursArr[ind].wind.speed) + " м/с";
          pressureValue.textContent =
            Math.round(hoursArr[ind].main.pressure * 0.74) + " мм рт.ст";
        };

        const abc = weekArr.filter(
          (item) => item.dt_txt.includes("12:00:00") == true
        );
        if (abc.length === 5) {
          abc.splice(-1, 1);
        }
        console.log(abc);
        abc.forEach((element, index) => {
          let idx = weekArr.indexOf(element);
          console.log(weekArr[idx + 2]);
          forecastWeek.innerHTML += `
        <div class="week__list-item">
        <div class="week__item-short">
        <span class="week__date">${getUserTimeWeek(
          abc[index].dt_txt.split(" ")[0]
        )}</span>
          <span class="week__temp">+${Math.round(element.main.temp)}&#176</span>
          <img src="../images/icons/${getImage(
            element.weather[0].icon
          )}.png" alt=""></div>
          <div class="week__item-full">
          <ul class="week__item-full-list">
          <li class="week__full-item">
          <span class="week__date">${getDataWeek2(weekArr[idx].dt_txt)}</span>
          <div class="week__full-inner">
            <span class="week__temp">+${Math.round(
              weekArr[idx].main.temp
            )}&#176</span>
            <img src="../images/icons/${getImage(
              weekArr[idx].weather[0].icon
            )}.png" alt="">
            </div>
          </li>
          <li class="week__full-item">
          <span class="week__date">${getDataWeek2(weekArr[idx].dt_txt)}</span>
          <div class="week__full-inner">
            <span class="week__temp">+${Math.round(
              weekArr[idx].main.temp
            )}&#176</span>
            <img src="../images/icons/${getImage(
              weekArr[idx].weather[0].icon
            )}.png" alt="">
            </div>
          </li>
          <li class="week__full-item">
          <span class="week__date">${getDataWeek2(
            weekArr[idx + 2].dt_txt
          )}</span>
          <div class="week__full-inner">
            <span class="week__temp">+${Math.round(
              weekArr[idx + 2].main.temp
            )}&#176</span>
            <img src="../images/icons/${getImage(
              weekArr[idx + 2].weather[0].icon
            )}.png" alt="">
            </div>
            </li>
          <li class="week__full-item">
          <span class="week__date">${getDataWeek2(
            weekArr[idx + 4].dt_txt
          )}</span>
          <div class="week__full-inner">
            <span class="week__temp">+${Math.round(
              weekArr[idx + 4].main.temp
            )}&#176</span>
            <img src="../images/icons/${getImage(
              weekArr[idx + 4].weather[0].icon
            )}.png" alt="">
            </div>
          </li>
          </ul>
          </div>
          </div>`;
        });

        const listWeek = document.querySelectorAll(".week__item-short");
        listWeek.forEach((item, index) =>
          item.addEventListener("click", function () {
            const parent = item.parentNode;

            if (parent.classList.contains("active")) {
              parent.classList.remove("active");
            } else {
              document
                .querySelectorAll(".week__list-item")
                .forEach((child) => child.classList.remove("active"));
              parent.classList.add("active");
            }
          })
        );

        for (let i = 0; i < targets.length; i++) {
          targets[i].index = i;
          width.push(articles[i].offsetWidth); // get height of each article
          TweenMax.set(articles[i], { top: 0, x: -width[i] - 3 }); // push all articles up out of view
          TweenMax.set(targets[0], { backgroundColor: "#4475ef" });
          TweenMax.set(targets[1], {
            backgroundColor: "rgba(255, 255, 255, 0.1)",
          });
          targets[i].addEventListener("click", doSwipe);
        }
        TweenMax.set(articles[0], { x: 0 });
        TweenMax.set(".forecast", { height: articles[0].offsetHeight });
      });
  }
};

function doSwipe() {
  // check if clicked target is new and if the timeline is currently active
  if (this.index != activeTab) {
    //if there's an animation in-progress, jump to the end immediately so there aren't weird overlaps.
    if (animation && animation.isActive()) {
      animation.progress(1);
    }
    animation = new TimelineMax();
    old = activeTab;
    activeTab = this.index;
    // animate bubble slider to clicked target

    // change text color on old and new tab targets
    animation.to(
      targets[old],
      dur,
      {
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        ease: Linear.easeNone,
      },
      0
    );
    animation.to(
      targets[activeTab],
      dur,
      {
        backgroundColor: "#4475ef",
        ease: Linear.easeNone,
      },
      0
    );
    // slide current article down out of view and then set it to starting position at top
    animation.to(articles[old], dur, { x: width[old], ease: Linear.ease }, 0);
    animation.set(articles[old], { x: -width[old] - 3 });
    // resize article block to accommodate new content
    // animation.to(".article-block", dur, { width: heights[activeTab] });
    // slide in new article
    animation.to(articles[activeTab], 0.6, { x: 0, ease: Linear.ease }, 0);
  }
}

searchBtn.addEventListener("click", getWeather);
window.addEventListener("load", getWeather);

function getUserTime(item) {
  let t = new Date(item);
  if (item === 0) {
    t = new Date();
  }
  let d = days[t.getDay()];
  let D = t.getDate();
  let m = mounth[t.getMonth()];
  return `${d}, ${D} ${m}`;
}

function getUserTimeWeek(item) {
  let t = new Date(item);
  let d = days[t.getDay()];
  let D = t.getDate();
  let m = mounth[t.getMonth()];
  return `<span>${d}</span><span> ${D}, ${m}</span>`;
}

const getDataWeek2 = function (item) {
  let a = item.split(" ");
  let t = new Date(a[0]);
  let d = daysShort[t.getDay()];
  let D = t.getDate();
  return `${d}, ${D} ${a[1].slice(0, -3)}`;
};
