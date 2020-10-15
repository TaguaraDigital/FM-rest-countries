const detail = document.getElementById('detail');
const back = document.getElementById('btn-back');

/***** Dark Mode  Begin*****/
const darkModeSwitch = document.getElementById("dark-mode");
let lightMode = (localStorage.getItem("lightMode") === "false") ? false : true

const isDarktMode = () => {
    document.body.classList.add('dark-mode');
    localStorage.setItem("lightMode", "false");
}
const isLightMode = () => {
    document.body.classList.remove('dark-mode');
    localStorage.setItem("lightMode", "true");
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



/***** render detail of de country Begin*****/

// get detail Country
const getDetailCountry = async (country) => {
    const url = `https://restcountries.eu/rest/v2/alpha/${country}`;
    try {
        const results = await fetch (url)
        const data = await results.json();

        console.log(data)

        let languages = '';
        data.languages.forEach(lang => {
            languages += `${lang.name}, `
        })

        let borders = '';
        data.borders.forEach(border => {
            borders += `<button class="btn btn-border" id=${border}>${border}</button>`
        })

        detail.innerHTML = `
            <img class="detail__flag" src=${data.flag} alt="${data.name} flag">
            <div class="detail__info">
                <h2 class="detail__title"> ${data.name}</h2>
                <p class="detail__data"><span class="bold">Native Name: </span> ${data.nativeName} </p>
                <p class="detail__data"><span class="bold">Population: </span> ${numberWithDot(data.population)} </p>
                <p class="detail__data"><span class="bold">Region: </span> ${data.region} </p>
                <p class="detail__data"><span class="bold">Sub Region: </span> ${data.subregion} </p>
                <p class="detail__data"><span class="bold">Capital: </span> ${data.capital} </p>
                <p class="detail__data mt-20"><span class="bold">Top Level Domain: </span> ${data.topLevelDomain} </p>
                <p class="detail__data"><span class="bold">Currencies: </span> ${data.currencies[0].name} </p>
                <p class="detail__data"><span class="bold">Languages: </span> ${languages} </p>
        
                <h3 class="detail__subtitle"> Border Countries: </h3>
        
                <div class="borders btn" id="borders"> ${borders}</div>
            </div>
        `
    } catch (err) {
        console.log ('Ups.. there is an errors :( ', err )
    }
}

getDetailCountry(location.hash.substring(1));

back.addEventListener('click', (e) => {
    location.href = `./` 
})


detail.addEventListener('click', (e) => {
    if(e.target.id !== '') {
        console.log(e.target.id) 
        getDetailCountry(e.target.id);
    } 
})
