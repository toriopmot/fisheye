
///////////////RECUPERATION DES DONNEES DANS LE FICHIER JSON //////////////////////////

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

/////////////////AFFICHER LES DONNEES SUR LA PAGE D'ACCUEIL//////////////////////

    async function displayData(photographers) {
        const photographersSection = document.querySelector(".photographer_section");

        photographers.forEach((photographer) => {
            const photographerModel = photographerFactory(photographer);
            const userCardDOM = photographerModel.getUserCardDOM();
            photographersSection.appendChild(userCardDOM);
        });
    };


//////////////////////FONCTION INIT///////////////////////////

    async function init() {
        const { photographers } = await getPhotographers();
        displayData(photographers);
    };
    
    init();
    