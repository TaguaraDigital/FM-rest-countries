/***** Select Region Custom Select  Begin *****/
const region = document.getElementById('region')
const select = document.getElementById('select')
const regionSelect = document.getElementById('region-select')
const options = document.getElementById('options')
const detail = document.getElementById('detail')

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
                    <p class="country__data"><span class="bold">Populations: </span>${country.population} </p>
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



// search by name
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

// click on one country find details
countries.addEventListener('click', (e) => {
    e.preventDefault();
    detail.classList.remove('hidden')
    getDetailCountry(e.target.parentElement.id)
})