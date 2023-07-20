//today`s card variables:
let today = document.getElementById ("today"),
todayDate = document.getElementById ("today-date"),
cityLocation = document.getElementById ("location"),
todayDegree = document.getElementById ("today-degree"),
todayIcon = document.getElementById ("today-icon"),
description = document.getElementById ("today-description"),
humidty = document.getElementById ("humidty"),
wind = document.getElementById ("wind"),
compass = document.getElementById ("compass"),
searchBar = document.getElementById ("search-bar");


    //Next Days variables:
let nextDay =document.getElementsByClassName("nextDay"),
nextDayIcon =document.getElementsByClassName("nextDay-icon"),
maxDegree =document.getElementsByClassName("max-degree"),
minDegree =document.getElementsByClassName("min-degree"),
nextDayDescription =document.getElementsByClassName("nextDay-description"), 
apiResponse,
responseDate,
currentcity= "alex";

monthName=["Jan","Feb","March","April","May","June","July","Aug","Sept","Oct","Nov","Des"];
 days=[
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
 ];










 async function getWeatherData(){
    apiResponse =await fetch (`https://api.weatherapi.com/v1/forecast.json?key=7d77b96c972b4d119a3151101212704&q=${currentcity}&days=3 `)
    resbonsData =await  apiResponse.json ()
    console.log (resbonsData)
     displayTodayWeather();
     displayNextDayWeather();
}
getWeatherData();

 function displayTodayWeather(){
    let date =new Date ();
    today.innerHTML= days[date.getDay()];
    todayDate.innerHTML= `${date.getDate()}  ${monthName [date.getMonth()] }` ;
    cityLocation.innerHTML = resbonsData.location.name;
    todayDegree.innerHTML= resbonsData.current.temp_c;
   todayIcon.setAttribute("src",`https:${resbonsData.current.condition.icon}`)
   description.innerHTML = resbonsData.current.condition.text;
   humidty.innerHTML = resbonsData.current.humidity;
   wind.innerHTML= resbonsData.current.wind_kph;
   compass.innerHTML= resbonsData.current.wind_dir;
 }

 
 

function displayNextDayWeather(){
   for(let i=0 ;i< nextDay.length; i++ ){
       nextDay[i].innerHTML= days[new Date (resbonsData.forecast.forecastday[i+1].date).getDay()];
       nextDayIcon[i].setAttribute('src',`http:${resbonsData.forecast.forecastday[i+1].day.condition.icon}` )
       maxDegree[i].innerHTML = resbonsData.forecast.forecastday[i+1].day.maxtemp_c;
       minDegree[i].innerHTML = resbonsData.forecast.forecastday[i+1].day.mintemp_c;
       nextDayDescription[i].innerHTML=resbonsData.forecast.forecastday[i+1].day.condition.text;
      }
}

searchBar.addEventListener("keyup",function(){
   currentcity= searchBar.value;
   getWeatherData();
})


