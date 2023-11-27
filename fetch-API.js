let buttonOpen = document.querySelector('.btn-open');
let buttonApi = document.querySelector('.btn-api');
let inputOpen = document.querySelector('.inputOpen');
let inputApi = document.querySelector('.inputApi');
let cityOpen = document.querySelector('.city-open');
let tempOpen = document.querySelector('.temp-open');
let feelOpen = document.querySelector('.feel-open');
let cityApi = document.querySelector('.city-open');
let tempApi = document.querySelector('.temp-open');
let feelApi = document.querySelector('.feel-open');
let inputDream = document.querySelector('.inputDream');
let buttonDream = document.querySelector('.btn-dream')

let tempUp = 0;

buttonDream.addEventListener('click', function() {
    tempUp = inputDream.value;
})

buttonOpen.addEventListener('click', function() {
fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inputOpen.value}&units=metric&appid=b5393e979ce8fef443d695c2124eece5`)
    .then((data) => { 
        return data.json();})
    .then((data) => {
        console.log(data);
        cityOpen.innerHTML = `${inputOpen.value}`;
        tempOpen.innerHTML = `Current temp = ${data.main.temp + Number(tempUp)}ºC`;
        feelOpen.innerHTML = `Feels like = ${data.main.feels_like + Number(tempUp)}ºC`;
    })
    .catch(error => {console.log(error);})
});

buttonApi.addEventListener('click', function() {
    fetch(`http://api.weatherapi.com/v1/current.json?key=1ba124c1851e401e9db94404232711&q=${inputApi.value}&aqi=no`)
    .then((data) => {
        return data.json();
    })
    .then((data) => {
        console.log(data);
        cityApi.innerText = `${inputApi.value}`;
        tempApi.innerHTML = `Current temp = ${data.current.temp_c + Number(tempUp)}ºC`;
        feelApi.innerHTML = `Feels like = ${data.current.feelslike_c + Number(tempUp)}ºC`
    })
})
