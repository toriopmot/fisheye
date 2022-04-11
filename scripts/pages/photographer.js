//Mettre le code JavaScript lié à la page photographer.html


async function getPhotographers() {
    // Penser à remplacer par les données récupérées dans le json

    await fetch("../../data/photographers.json")
        .then((res) => res.json())
        .then((data) => (photographers = data.photographers));

    // et bien retourner le tableau photographers seulement une fois
    return ({
        photographers: [...photographers]
    })
}

async function displayData(photographers) {
    const photographersSection = document.querySelector(".photograph-header");

    photographers.forEach((photographer) => {
        const photographerModel = photographerFactory(photographer);
        const userCard = photographerModel.getUserCard();
        photographersSection.appendChild(userCard);
    });
};

async function init() {
    // Récupère les datas des photographes
    const { photographers } = await getPhotographers();
    displayData(photographers);
};

init();


function photographerFactory(data) {
    const { name, portrait, city, country, tagline, price, id } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCard() {

        const headerNameElement = document.querySelector("#photograph-name");
        const headerCityElement = document.querySelector("#photograph-city");
        const headerTaglineElement = document.querySelector("#photograph-tagline");
        const headerImgElement = document.querySelector("#photograph-img");

        headerNameElement.textContent = name;
        headerCityElement.textContent = city + ", " + country;
        headerTaglineElement.textContent = tagline;
        headerImgElement.setAttribute("src", picture);
        
        return (data);
    }
    return { name, picture, getUserCard }
}