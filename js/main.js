const elems = document.querySelectorAll('.laya-please');
const layer2 = document.querySelector('.layer-2');
const layer3 = document.querySelector('.layer-3');
const layer4 = document.querySelector('.layer-4');
const layer5 = document.querySelector('.layer-5');
const layer6 = document.querySelector('.layer-6');
const layer7 = document.querySelector('.layer-7');
const layer8 = document.querySelector('.layer-8');


setTimeout(function () {
    elems.forEach(function (elem, index) {
        elem.style.animation = "none";
    });
}, 1500);



document.body.addEventListener('mousemove', function (e) {
    if (!e.currentTarget.dataset.triggered) {
        elems.forEach(function (elem, index) {
            if (elem.getAttribute('style')) {
                elem.style.transition = "all .5s";
                elem.style.transform = "none";
            }
        });
    }
    e.currentTarget.dataset.triggered = true;
    
    let width = window.innerWidth / 2;
    let mouseMoved2 = ((width - e.pageX) / 50);
    let mouseMoved3 = ((width - e.pageX) / 40);
    let mouseMoved4 = ((width - e.pageX) / 30);
    let mouseMoved5 = ((width - e.pageX) / 20);
    let mouseMoved6 = ((width - e.pageX) / 10);
    let mouseMoved7 = ((width - e.pageX) / 5);

    layer3.style.transform = "translateX(" + mouseMoved2 + "px)";
    layer4.style.transform = "translateX(" + mouseMoved3 + "px)";
    layer5.style.transform = "translateX(" + mouseMoved4 + "px)";
    layer6.style.transform = "translateX(" + mouseMoved5 + "px)";
    layer7.style.transform = "translateX(" + mouseMoved6 + "px)";
    layer8.style.transform = "translateX(" + mouseMoved7 + "px)";
});

document.body.addEventListener('mouseleave', function (e) {
    elems.forEach(function (elem, index) {
        elem.style.transition = "all .5s";
        elem.style.transform = "none";
    });
});

document.body.addEventListener('mouseenter', function (e) {
    elems.forEach(function (elem, index) {
        setTimeout(function () {
            elem.style.transition = "none";
        }, 500);
    });
});
//Today's Card Variables:
let today = document.getElementById("today"),
    todayDate = document.getElementById("today-date"),
    cityLocation = document.getElementById("location"),
    todayDegree = document.getElementById("today-degree"),
    todayIcon = document.getElementById("today-icon"),
    description = document.getElementById("today-description"),
    humidty = document.getElementById("humidty"),
    wind = document.getElementById("wind"),
    compass = document.getElementById("compass"),
    searchBar = document.getElementById("search-bar"),
    currentCity = "Cairo",
    apiResponse,
    responseData,
    date = new Date(),
    weekDays = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
    monthName = ['Jan','Feb','March','April','May','June','July','Aug','Sept','Oct','Nov','Dec'];

//Next Days Variables:
let nextDay = document.getElementsByClassName("nextDay"),
    afterNextDay = document.getElementsByClassName("afterNextDay"),
    nextDate = document.getElementsByClassName("nextDate"),
    nextDayIcon = document.getElementsByClassName("nextDay-icon"),
    maxDegree = document.getElementsByClassName("max-degree"),
    minDegree = document.getElementsByClassName("min-degree"),
    nextDayDescription = document.getElementsByClassName("nextDay-description");
	//Get Data from API:
async function getWeatherData() {
    apiResponse = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=848e4c9efef048e494f100521210205&q=${currentCity}&days=3&aqi=no&alerts=no`);
    responseData = await apiResponse.json();
    console.log(responseData);
    displayTodayWeather();
    displayNextDaysWeather();
};
//Display Today's Data:
function displayTodayWeather() {

    let dateApi = responseData.forecast.forecastday[0].date;
    let date_components = dateApi.split("-");
    let current_day = date_components[2];

    today.innerHTML = weekDays[date.getDay()];
    todayDate.innerText = `${current_day} ${monthName[date.getMonth()]}`;
    cityLocation.innerHTML = responseData.location.name;
    todayDegree.innerHTML = Math.round(responseData.current.temp_c);
    todayIcon.setAttribute("src", `https:${responseData.current.condition.icon}`);
    description.innerHTML = responseData.current.condition.text;
    humidty.innerHTML = responseData.current.humidity;
    wind.innerHTML = responseData.current.wind_kph;
    compass.innerText =responseData.current.wind_dir
};

//Next Day - Name Function;
function getNextDays(nextDateApi) {

	let d = new Date(nextDateApi);
	return d && weekDays[d.getDay()];
 };
 
 //Next Day - Month Function;
 function getNextDayMonth(nextDateApi) {
 
	 let m = new Date(nextDateApi);
	 return m && monthName[m.getMonth()];
  };
 
 //Display Next Days Data:
 function displayNextDaysWeather() {
	 for(let i = 0;  i < nextDay.length; i++)
	 {   
		 let nextDateApi = responseData.forecast.forecastday[i+1].date;
		 let nextDate_components = nextDateApi.split("-");
		 let next_day = nextDate_components[2];
 
		 nextDay[i].innerHTML = getNextDays(nextDateApi);
		 nextDate[i].innerHTML = `${next_day} ${getNextDayMonth(nextDateApi)}`;
		 nextDayIcon[i].setAttribute("src", `https:${responseData.forecast.forecastday[i+1].day.condition.icon}`);
		 maxDegree[i].innerHTML = Math.round(responseData.forecast.forecastday[i+1].day.maxtemp_c);
		 minDegree[i].innerHTML = Math.round(responseData.forecast.forecastday[i+1].day.mintemp_c);
		 nextDayDescription[i].innerHTML= responseData.forecast.forecastday[i+1].day.condition.text;
		 
	 }
 };
 
 //Live Search City Function:
 searchBar.addEventListener("keyup", function() {
	 currentCity = searchBar.value;
	 getWeatherData();
 });
 
 //Onload Calling Function:
 getWeatherData();
 
 
 //Submit Subscribe LightBox:
 let subscribeBtn = document.getElementById("subscribeBtn"),
	 closeBtn = document.getElementById("closeBtn"),
	 submitLighBox = document.getElementById("submit-lighBox"),
	 emailInput = document.getElementById("emailInput"),
	 emailInputAlert = document.getElementById("emailInputAlert");
 
 
 subscribeBtn.addEventListener("click", function() {
	 if(validateEmail() == true) {
		 
		 submitLighBox.style.display = "flex";
	 }
	 else {
		 subscribeBtn.disabled = true;
	 }
 });
 
 closeBtn.addEventListener("click", function() {
	 submitLighBox.style.display = "none";
	 emailInput.value = "";
 });
 $(window).scroll(function(){
    let current=$(window).scrollTop();
    if(current>300){
        $(".navbar").css({"backgroundColor":"rgba(12, 11, 9, 0.6)", "transition":"all 0.5s"})

    }
    else{
        $(".navbar").css("background","transparent")
    }
})