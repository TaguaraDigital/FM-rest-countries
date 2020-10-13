const countries = document.getElementById('countries');
const search = document.getElementById('search')
console.log(search)
    
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
