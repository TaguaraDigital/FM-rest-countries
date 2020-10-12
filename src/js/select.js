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