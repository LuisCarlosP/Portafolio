const showMenu = (toggleId, navId) => {
    const toggle = document.getElementById(toggleId),
          nav = document.getElementById(navId);
 
    toggle.addEventListener('click', () => {
        nav.classList.toggle('show-menu');
        toggle.classList.toggle('show-icon');
    });

    const dropdownLinks = document.querySelectorAll('.dropdown__menu .dropdown__link');
    dropdownLinks.forEach(link => {
        link.addEventListener('click', () => {
            const language = link.getAttribute('data-language');
            localStorage.setItem('selectedLanguage', language);
            changeLanguage(language);
        });
    });
}

const storedLanguage = localStorage.getItem('selectedLanguage') || "es"; 
changeLanguage(storedLanguage);

function changeLanguage(language) {
    fetch(`languages/${language}.json`)
        .then(response => response.json())
        .then(data => {
            const elementsWithTranslation = document.querySelectorAll('[data-i18n]');
            elementsWithTranslation.forEach(element => {
                const key = element.getAttribute('data-i18n');
                element.textContent = data[key];
            });
        })
        .catch(error => {
            console.error("Error loading translation file:", error);
        });
}

showMenu('nav-toggle','nav-menu');