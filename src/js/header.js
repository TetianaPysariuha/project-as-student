const headerButtonCollection = document.querySelectorAll(".navbar__menu-button");
const navbarMenu = document.querySelector('.navbar__menu');

headerButtonCollection.forEach(elem => {
    elem.addEventListener('click', (event) => {
        headerButtonCollection.forEach(element => element.classList.toggle('display-none'));
        if(navbarMenu.style.display) {
            navbarMenu.style.display = '';
        } else {
            navbarMenu.style.display  = 'flex';
        }});
    });

document.body.addEventListener('click', (event) => {
    if(event.target.parentNode === document.querySelector('.button--open')) {
        return;
    };
    if (navbarMenu.style.display) {
        navbarMenu.style.display  = '';
        headerButtonCollection.forEach(element => element.classList.toggle('display-none'));
    } else {
        return;
    };
});