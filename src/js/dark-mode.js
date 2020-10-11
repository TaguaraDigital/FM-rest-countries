const darkModeSwitch = document.getElementById("dark-mode");
let lightMode = (localStorage.getItem("lightMode") === "true") ? true : false

const isDarktMode = () => {
   document.body.classList.remove('ligh-mode');
   localStorage.setItem("lightMode", "false");
}
const isLightMode = () => {
   localStorage.setItem("lightMode", "true");
   document.body.classList.add('ligh-mode');
}

if(lightMode){
   isLightMode() 
} 

darkModeSwitch.addEventListener("click", () => {
   lightMode = !lightMode
   lightMode ? isLightMode() : isDarktMode();
})