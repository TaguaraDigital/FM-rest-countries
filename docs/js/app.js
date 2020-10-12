"use strict";var _interopRequireDefault=require("@babel/runtime/helpers/interopRequireDefault"),_regenerator=_interopRequireDefault(require("@babel/runtime/regenerator")),_asyncToGenerator2=_interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator")),darkModeSwitch=document.getElementById("dark-mode"),lightMode="true"===localStorage.getItem("lightMode"),isDarktMode=function(){document.body.classList.remove("ligh-mode"),localStorage.setItem("lightMode","false")},isLightMode=function(){localStorage.setItem("lightMode","true"),document.body.classList.add("ligh-mode")};lightMode&&isLightMode(),darkModeSwitch.addEventListener("click",(function(){(lightMode=!lightMode)?isLightMode():isDarktMode()}));var countries=document.getElementById("countries"),URL="https://restcountries.eu/rest/v2/all",getCountries=function(){var e=(0,_asyncToGenerator2.default)(_regenerator.default.mark((function e(){var t,r;return _regenerator.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,fetch(URL);case 3:return t=e.sent,e.next=6,t.json();case 6:return r=e.sent,e.abrupt("return",r);case 10:e.prev=10,e.t0=e.catch(0),console.log("Ups.. there is an errors :( ",e.t0);case 13:case"end":return e.stop()}}),e,null,[[0,10]])})));return function(){return e.apply(this,arguments)}}(),renderCountries=function(){var e=(0,_asyncToGenerator2.default)(_regenerator.default.mark((function e(){var t,r;return _regenerator.default.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,getCountries();case 2:(t=e.sent)?(r=document.createDocumentFragment(),t.forEach((function(e){var t=document.createElement("article");t.classList.add("country"),t.innerHTML='\n                <img class="country__flag" src='.concat(e.flag,' alt="').concat(e.name,' - flag">\n                <div class="country__info">\n                    <h3 class="country__name">').concat(e.name,'</h3>\n                    <p class="country__population"><span class="bold">Populations:</span>').concat(e.population,' </p>\n                    <p class="country__region"><span class="bold">Region:</span>').concat(e.region,' </p>\n                    <p class="country__capital"><span class="bold">Capital:</span> ').concat(e.capital,"</p>\n                </div>\n            "),r.appendChild(t)})),countries.appendChild(r)):countries.innerHTML="<h2>There are no contries for your search</h2>";case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();window.addEventListener("load",renderCountries);