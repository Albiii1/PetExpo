document.addEventListener('DOMContentLoaded', () => {
    const gallery = document.getElementById('gallery');
    const searchBar = document.getElementById('searchBar');
    const popup = document.getElementById('popup');
    const closePopup = document.getElementById('closePopup');
    const popupImage = document.getElementById('popupImage');
    const popupName = document.getElementById('popupName');
    const popupOrigin = document.getElementById('popupOrigin');
    const popupBreedGroup = document.getElementById('popupBreedGroup');
    const popupSize = document.getElementById('popupSize');
    const popupLifespan = document.getElementById('popupLifespan');
    const popupTemperament = document.getElementById('popupTemperament');
    const popupColors = document.getElementById('popupColors');
    const popupDescription = document.getElementById('popupDescription');

    let animals = [];

    fetch('https://freetestapi.com/api/v1/cats')
        .then(response => response.json())
        .then(data => {
            animals = data;
            displayAnimals(animals);
        });

    function displayAnimals(animals) {
        gallery.innerHTML = '';
        animals.forEach(animal => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <img src="${animal.image}" alt="${animal.name}">
                <h3>${animal.name}</h3>
                <p>${animal.origin}</p>
            `;
            card.addEventListener('click', () => showPopup(animal));
            gallery.appendChild(card);
        });
    }

    function showPopup(animal) {
        popupImage.src = animal.image;
        popupName.textContent = animal.name;
        popupOrigin.textContent = `Origin: ${animal.origin}`;
        popupBreedGroup.textContent = `Breed Group: ${animal.breed_group}`;
        popupSize.textContent = `Size: ${animal.size}`;
        popupLifespan.textContent = `Lifespan: ${animal.lifespan}`;
        popupTemperament.textContent = `Temperament: ${animal.temperament}`;
        popupColors.textContent = `Colors: ${animal.colors.join(', ')}`;
        popupDescription.textContent = animal.description;
        popup.classList.remove('hidden');
    }

    closePopup.addEventListener('click', () => {
        console.log('Close button clicked');
        popup.classList.add('hidden');
    });

    popup.addEventListener('click', (e) => {
        if (e.target === popup) {
            console.log('Popup background clicked');
            popup.classList.add('hidden');
        }
    });

    searchBar.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        fetch(`https://freetestapi.com/api/v1/cats?search=${searchTerm}`)
            .then(response => response.json())
            .then(data => {
                displayAnimals(data);
            });
    });
});

function goHome() {
    window.location.href = 'index.html';
}
