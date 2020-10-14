const region = document.getElementById('region')
const select = document.getElementById('select')
const regionSelect = document.getElementById('region-select')
const options = document.getElementById('options')
const detail = document.getElementById('detail')
const countries = document.getElementById('countries');
const search = document.getElementById('search')
const searchInput = document.getElementById('search-input')

/***** Dark Mode  Begin*****/
const darkModeSwitch = document.getElementById("dark-mode");
let lightMode = (localStorage.getItem("lightMode") === "false") ? false : true

const isDarktMode = () => {
    document.body.classList.add('dark-mode');
    localStorage.setItem("lightMode", "false");
}
const isLightMode = () => {
    localStorage.setItem("lightMode", "true");
    document.body.classList.remove('dark-mode');
}

if(lightMode){isLightMode()} 

darkModeSwitch.addEventListener("click", () => {
    lightMode = !lightMode
    lightMode ? isLightMode() : isDarktMode();
})
/***** Dark Mode  End*****/


/***** Format numbers Begin*****/
const numberWithDot = (number) => new Intl.NumberFormat('es-Es').format(number);  
/***** Format numbers End*****/


/***** Main App Begin*****/

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

    if (results.length > 0 ) {

        const fragment = document.createDocumentFragment()

        results.forEach(country => {
            
            const article = document.createElement('article');
            article.classList.add('country');
            article.id = country.alpha3Code;
            article.innerHTML = `
                <img class="country__flag" src=${country.flag} alt="${country.name} - flag">
                <div class="country__info">
                    <h3 class="country__name">${country.name}</h3>
                    <p class="country__data"><span class="bold">Populations: </span>${numberWithDot(country.population)} </p>
                    <p class="country__data"><span class="bold">Region: </span>${country.region} </p>
                    <p class="country__data"><span class="bold">Capital: </span> ${country.capital}</p>
                </div>
            `
            fragment.appendChild(article) 
        })

        countries.innerHTML = "";
        countries.appendChild(fragment);
    
    } else {
        countries.innerHTML = `<h2 class="search__error">There are no countries for your search of "${searchInput.value}"</h2>`;
    }
}

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



// filter search by name
const filterByName = (filter) => {
    if (filter.length >= 3){
        const url = `https://restcountries.eu/rest/v2/name/${filter}`
        renderCountries(url)        
    }
}

searchInput.addEventListener('keyup', (e) => {
    e.preventDefault()
    filterByName(searchInput.value)
})

// On load, look for the same countries shown in the challenge
window.addEventListener ('load', () => {
    const url = 'https://restcountries.eu/rest/v2/alpha?codes=de;us;br;is;af;ax;al;dz';
    renderCountries(url)
});

// click on one country, look for details
countries.addEventListener('click', (e) => {
    e.preventDefault();
    // location.href = `detail.html/:?${e.target.parentElement.id}`;
    localStorage.setItem("country", e.target.parentElement.id);
    location.href = `./detail.html#${e.target.parentElement.id}`;
 })