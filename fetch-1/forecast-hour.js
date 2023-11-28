let buttonOpen = document.querySelector(".btn-open");
let inputOpen = document.querySelector(".inputOpen");
let cityOpen = document.querySelector(".city-open");
let tempOpen = document.querySelector(".temp-open");
let feelOpen = document.querySelector(".feel-open");

buttonOpen.addEventListener("click", function () {
  fetch(
    `http://api.weatherapi.com/v1/forecast.json?key=1ba124c1851e401e9db94404232711&q=${inputOpen.value}&aqi=no`
  )
    .then((data) => {
      return data.json();
    })
    .then((data) => {
      // console.log(data);
      cityOpen.innerText = `${inputOpen.value}`;
      tempOpen.innerText = ``;
      const hour = data.forecast.forecastday[0].hour.map((hour) => {
        tempOpen.innerText += ` At ${hour.time} will be ${hour.temp_c}ºC
            `;
      });
      // console.log(hour);
    });
});
