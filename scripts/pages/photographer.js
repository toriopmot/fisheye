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
        photographersSection.append(userCard);
    });
};

const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get("id");


let indexNumber = 0

function displayPhotographerHeader() {
    indexNumber += 1

    const afficherNom = document.querySelector("#photograph-name");
    const afficherLoc = document.querySelector("#photograph-city");
    const afficherTagline = document.querySelector("#photograph-tagline");
    const afficherPhoto = document.querySelector("#photograph-img");

    const infoPhotographe = document.createElement("div");
    infoPhotographe.setAttribute("tabindex", `${indexNumber += 1}`)
    infoPhotographe.setAttribute("class", "info-photographer");
    infoPhotographe.appendChild(afficherNom);
    infoPhotographe.appendChild(afficherLoc);
    infoPhotographe.appendChild(afficherTagline);

    const contactBlock = document.createElement("div");
    contactBlock.setAttribute("tabindex", `${indexNumber += 1}`)
    contactBlock.setAttribute("class", "contact-container");
    const contact_button = document.querySelector(".contact_button");
    contactBlock.appendChild(contact_button);

    const imgBlock = document.createElement("div");
    imgBlock.setAttribute("tabindex", `${indexNumber += 1}`)
    imgBlock.setAttribute("class", "img-photographer");
    imgBlock.appendChild(afficherPhoto);
    
    const photographHeader = document.querySelector(".photograph-header");
    photographHeader.appendChild(infoPhotographe);
    photographHeader.appendChild(contactBlock);
    photographHeader.appendChild(imgBlock);
    
    afficherNom.textContent = photographer.name;
    afficherLoc.textContent = `${photographer.city}, ${photographer.country}`;
    afficherTagline.textContent = photographer.tagline;
    afficherPhoto.setAttribute("src", `assets/photographers/${photographer.portrait}`);
    afficherPhoto.setAttribute("alt", photographer.name);
    afficherPhoto.setAttribute("style", "width: 200px")
}

// ************** AFFICHER MEDIA ******************** //


async function getMedia() {
    await fetch("../../data/photographers.json")
        .then((res) => res.json())
        .then((data) => (media = data.media));
        console.log(media)
    return ({
        media: [...media]
    })
}


// function mediaFactory(data) {
//     const { id, photographerId, title, image, likes, date, price } = data;

//     const picture = `./assets/photographers/${image}`;
    
//     function displayPhotographerMedia() {
//         const mediaSection = document.querySelector(".photographer-media");

//         const img = document.createElement("img");
//         img.setAttribute("src", picture)
//         mediaSection.appendChild(img)

        

//         return { mediaSection }
//     }
//     return { displayPhotographerMedia }
// }

async function displayPhotographerMedia() {

    
    


    const {media} = await getMedia();
    for(let e of media) {
        if(e.photographerId == userId) {
            const img = document.createElement("img");
            const mediaSection = document.querySelector(".photographer-media");
            img.setAttribute("src", `./assets/photographers/images/${e.image}`);
            img.setAttribute("style", "width: 200px")
            mediaSection.appendChild(img)
        } else if(e.photographerId == userId) {
            const video = document.createElement("iframe");
            const mediaSection = document.querySelector(".photographer-media");
            video.setAttribute("src", `./assets/photographers/images/${e.video}`);
            video.setAttribute("style", "width: 200px")
            mediaSection.appendChild(video)
        }
    }

}




async function init() {
    ({ photographers } = await getPhotographers());

    photographers.forEach((photographerItem) => {
        if (photographerItem.id == userId) {
            photographer = photographerItem;
            // console.log(photographer)
        }
    });

    ({ media } = await getMedia());

    media.forEach((mediaItem) => {
        if (mediaItem.photographerId == userId) {
            media = mediaItem;
            console.log(media)
        }
    });

    displayPhotographerHeader();
    displayPhotographerMedia();
    getMedia()

}
init();
