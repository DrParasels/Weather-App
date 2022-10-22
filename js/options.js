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
