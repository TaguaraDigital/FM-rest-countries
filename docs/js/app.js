"use strict";var darkModeSwitch=document.getElementById("dark-mode"),lightMode="true"===localStorage.getItem("lightMode"),isDarktMode=function(){document.body.classList.remove("ligh-mode"),localStorage.setItem("lightMode","false")},isLightMode=function(){localStorage.setItem("lightMode","true"),document.body.classList.add("ligh-mode")};lightMode&&isLightMode(),darkModeSwitch.addEventListener("click",(function(){(lightMode=!lightMode)?isLightMode():isDarktMode()}));