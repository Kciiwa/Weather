const input = document.querySelector(".input");
const autocomplete = document.querySelector(".autocomplete");
const resultWeather = document.querySelector(".result-weather");

// async function getWeather() {
//     const response = await fetch('http://api.weatherapi.com/v1/current.json?key=7feebbae522d4366b72141747240904&q=Saint-Petersburg');
//     const weather = await response.json();
//     console.log(weather);
// }

let timer;

input.addEventListener("input", async function (event) {
  let enteredCity = event.target.value.trim();

  if (enteredCity === "") {
    autocomplete.insertAdjacentHTML("");
    clearTimeout(timer);
    return;
  }

  clearTimeout(timer);
  timer = setTimeout(async function () {
    try {
      const response = await fetch(
        `http://api.weatherapi.com/v1/current.json?key=7feebbae522d4366b72141747240904&q=${enteredCity}`
      );
      if (!response.ok) {
        throw new Error("Ошибка получения данных");
      }
      const data = await response.json();
      const weather = data.current;
      showWeather(data);
      console.log(weather);
    } catch (error) {
      console.error(error, "ощибка");
    }
  }, 500);
});

function showWeather(data) {
  console.log(data.current.feelslike_c);
  const item = document.createElement("div");
  item.classList.add("current-weather");
  item.innerHTML = `
        <div>Погода в ${data.location.name}: ${data.current.feelslike_c}</div>
    `;
  resultWeather.appendChild(item);
  input.value = "";
}

// getWeather();
