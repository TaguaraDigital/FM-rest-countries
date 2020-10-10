/*-----------------------------------------------------------------------
   Menu de la aplicacion
   Control animacion toggle menu
------------------------------------------------------------------------*/

const toggleMenu = document.getElementById('toggle-menu');
const mainNav = document.getElementById('main-nav');
const navList = document.getElementById('nav__list');
const navItems = document.querySelectorAll('.nav__item');
const navLenght = navItems.length;
// console.log('toggle-->  ', toggleMenu,'mainNav-->  ', mainNav, 'navList-->  ', navList, 'navItems-->  ', navItems, 'Cant. Links  ', navLenght );

let menuOpen = false;

toggleMenu.addEventListener('click', () =>{

   console.log('click ', toggleMenu );
   
   mainNav.classList.toggle('main-nav--show');
   toggleMenu.classList.toggle('toggle-menu--open');
   menuOpen ? menuOpen = false : menuOpen = true;
})