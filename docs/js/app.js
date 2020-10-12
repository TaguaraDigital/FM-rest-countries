const countries = document.getElementById('countries');
const URL = 'https://restcountries.eu/rest/v2/all'

const getCountries = async () => {
    try {
        const results = await fetch (URL)
        const data = await results.json();
        return data;
    } catch (err) {
        console.log ('Ups.. there is an errors :( ', err )
    }
}

const renderCountries = async () => {
    const results = await getCountries();

    if (results) {

        const fragment = document.createDocumentFragment()
        results.forEach(country => {
            
            const article = document.createElement('article');
            article.classList.add('country');
            article.innerHTML = `
                <img class="country__flag" src=${country.flag} alt="${country.name} - flag">
                <div class="country__info">
                    <h3 class="country__name">${country.name}</h3>
                    <p class="country__population"><span class="bold">Populations:</span>${country.population} </p>
                    <p class="country__region"><span class="bold">Region:</span>${country.region} </p>
                    <p class="country__capital"><span class="bold">Capital:</span> ${country.capital}</p>
                </div>
            `
            fragment.appendChild(article) 
        })

        countries.appendChild(fragment);
    
    } else {
        countries.innerHTML = `<h2>There are no contries for your search</h2>`;
    }


}

window.addEventListener ('load', renderCountries);

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

const select = document.getElementById('select')
const regionSelect = document.getElementById('region-select')
const options = document.getElementById('options')

select.addEventListener('click', (e) => {
    options.classList.toggle('show')
})

options.addEventListener('click', (e) => {
    regionSelect.innerHTML = e.target.innerHTML
    options.classList.toggle('show')
 })