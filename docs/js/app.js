/***** Select Region Custom Select  Begin *****/
const region = document.getElementById('region')
const select = document.getElementById('select')
const regionSelect = document.getElementById('region-select')
const options = document.getElementById('options')

// select.addEventListener('click', (e) => {
//     options.classList.toggle('show')
// })

// find by region
region.addEventListener('click', (e) => {
    options.classList.toggle('show')
    let url = 'https://restcountries.eu/rest/v2/all';
    
    if(e.target.id !== 'select' && e.target.id !== 'region-select' ){
        
        if (e.target.id === 'all-region'){
            regionSelect.innerHTML = 'Filter by Region'
            document.getElementById('all-region').classList.add('hidden')
        } else{
            document.getElementById('all-region').classList.remove('hidden')
            regionSelect.innerHTML = e.target.innerHTML
            url = `https://restcountries.eu/rest/v2/region/${e.target.id}`
        }
        renderCountries(url)    
    }
    e.preventDefault()
})
/***** Select Region Custom Select End *****/


/***** Dark Mode  Begin*****/
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
/***** Dark Mode  End*****/

/***** Main App Begin*****/
const countries = document.getElementById('countries');
const search = document.getElementById('search')
const searchInput = document.getElementById('search-input')
    

const getCountries = async (userURL = '') => {
    const url = userURL || 'https://restcountries.eu/rest/v2/all';
    try {
        const results = await fetch (url)
        const data = await results.json();
        return data;
    } catch (err) {
        console.log ('Ups.. there is an errors :( ', err )
    }
}

const renderCountries = async (url) => {
    const results = await getCountries(url);

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

        countries.innerHTML = "";
        countries.appendChild(fragment);
    
    } else {
        countries.innerHTML = `<h2>There are no contries for your search</h2>`;
    }


}


const filterByName = (filter) => {
    
    if (filter.length >= 3){
        const countries = `https://restcountries.eu/rest/v2/name/${filter}`
        renderCountries(countries)        
    }
}

searchInput.addEventListener('keyup', (e) => {
    e.preventDefault()
    filterByName(searchInput.value)
})

window.addEventListener ('load', () => {
    const urlBloc = "https://restcountries.eu/rest/v2/regionalbloc/USAN";
    renderCountries(urlBloc)
});