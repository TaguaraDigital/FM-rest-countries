
/***** Dark Mode  Begin*****/
const darkModeSwitch = document.getElementById("dark-mode");
let lightMode = (localStorage.getItem("lightMode") === "false") ? false : true

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
/***** Dark Mode  End*****/


/***** render detail of de country Begin*****/

const detail = document.getElementById('detail');
const back = document.getElementById('btn-back');
let country = localStorage.getItem('country');
console.log(country)

// get detail Country
const getDetailCountry = async (country) => {
    const url = `https://restcountries.eu/rest/v2/alpha/${country}`;
    try {
        const results = await fetch (url)
        const data = await results.json();

        console.log('Pais: ', country, data)

        let languages = '';
        data.languages.forEach(lang => {
            languages += `${lang.name}, `
        })

        let borders = '';
        data.borders.forEach(border => {
            borders += `<button class="btn">${border}</button>`
        })


        console.log(data.currencies[0].name)
    
        detail.innerHTML = `
            <img class="country__flag" src=${data.flag} alt="${data.name} flag">
            <div class="country__info">
                <h2 class="country__name"> ${data.name}</h2>
                <p class="country__data"><span class="bold">Native Name: </span> ${data.nativeName} </p>
                <p class="country__data"><span class="bold">Population: </span> ${data.population} </p>
                <p class="country__data"><span class="bold">Region: </span> ${data.region} </p>
                <p class="country__data"><span class="bold">Sub Region: </span> ${data.subregion} </p>
                <p class="country__data"><span class="bold">Capital: </span> ${data.capital} </p>
                <p class="country__data"><span class="bold">Top Level Domain: </span> ${data.toplevelDomain} </p>
                <p class="country__data"><span class="bold">Currencies: </span> ${data.currencies[0].name} </p>
                <p class="country__data"><span class="bold">Languages: </span> ${languages} </p>
        
                <h3 class="country__name"> Border Countries: </h3>
        
                <div class="borders"> ${borders}</div>
            </div>
        `
    } catch (err) {
        console.log ('Ups.. there is an errors :( ', err )
    }
}

getDetailCountry(country);

back.addEventListener('click', (e) => {
    location.href = `/` 
})