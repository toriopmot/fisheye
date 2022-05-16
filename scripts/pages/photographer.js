

async function getPhotographers() {
    await fetch("../../data/photographers.json")
        .then((res) => res.json())
        .then((data) => (photographers = data.photographers));

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
}

// ************** AFFICHER MEDIA ******************** //


async function getMedia() {
    await fetch("../../data/photographers.json")
        .then((res) => res.json())
        .then((data) => (media = data.media));
        // console.log(media)
    return ({
        media: [...media]
    })
}


////////////////////// Ajouter retrievephotographermedia ///////////////////////////////////////

async function retrievePhotographerPhotos() {
    let { media } = await getMedia();
    // console.log(media);
    const array = [];
    media.forEach((e) => {
        if (e.photographerId == userId) {
            media = e;
            array.push(e);
        }
    });
    return array;
}


//////////////////////////Trier le tableau//////////////////////////////////////////


// async function sort(type, array) {
//     if(type == "pop") {
//         console.log('Je doit trier par popularité')
//         let popArray = array.sort(function (a, b) {
//             return a.likes - b.likes;
//         });
//         return popArray;
//     } else if(type == "time") {
//         console.log('je dois trier par date')
//         let timeArray = array.sort(function(a, b) {
//             return new Date(a.ys, a.ms-1) - new Date(b.ys, b.ms-1);
//         });
//         return timeArray;
        
//     } else if(type == 'alpha') {
//         console.log('je dois trier par titre')
//         let titleArray = array.sort(function(a,b){
//             return a.title.localeCompare(b.title);
//         })
//         return titleArray;
//     } else {
//         console.log('erreur de tri')
//     }
// }

async function sort(type, array) {
    
    if(type == "pop") {
        console.log('Je doit trier par popularité')
        let popArray = array.sort(function (a, b) {
            return a.likes - b.likes;
        });
        return popArray;
    } else if(type == "time") {
        console.log('je dois trier par date')
        let timeArray = array.sort(function(a, b) {
            return new Date(a.ys, a.ms-1) - new Date(b.ys, b.ms-1);
        });
        return timeArray;
        
    } else if(type == 'alpha') {
        console.log('je dois trier par titre')
        let titleArray = array.sort(function(a,b){
            return a.title.localeCompare(b.title);
        })
        return titleArray;
    } else {
        console.log('erreur de tri')
    }
}


function removeMedia() {
    let e = document.querySelector(".photographer-media")
    e.innerHTML = ""
}



/////////////////Afficher les photos//////////////////////



async function displayPhotographerMedia() {
    removeMedia();
    let media = await retrievePhotographerPhotos();
    let type = document.getElementById("select").value;
    console.log(type)
    if(type) {
        media = await sort(type, media);
    }
    for(let e of media) {
        if(e.image) {
            const divMedia = document.createElement("div")
            const img = document.createElement("img");
            const infoMedia = document.createElement("div")
            const title = document.createElement("p");
            const divLikes = document.createElement("div")
            const likes = document.createElement("span");
            const heart = document.createElement("i");
            const mediaSection = document.querySelector(".photographer-media");
            divMedia.setAttribute("class", "div-media");
            infoMedia.setAttribute("class", "info-media");
            img.setAttribute("src", `./assets/photographers/images/${e.image}`);
            img.setAttribute("style", "cursor: pointer")
            img.setAttribute("onclick", "displayModal()")
            title.textContent = `${e.title}`;
            likes.textContent = `${e.likes}`;
            heart.setAttribute("class", "fa-solid fa-heart");
            mediaSection.appendChild(divMedia)
            divMedia.appendChild(img);
            divMedia.appendChild(infoMedia)
            infoMedia.appendChild(title);
            infoMedia.appendChild(divLikes)
            divLikes.appendChild(likes);
            divLikes.appendChild(heart);
        } else {
            const divMedia = document.createElement("div")
            const video = document.createElement("video");
            const infoMedia = document.createElement("div")
            const title = document.createElement("p");
            const divLikes = document.createElement("div")
            const likes = document.createElement("span");
            const heart = document.createElement("i");
            const source = document.createElement("source")
            const mediaSection = document.querySelector(".photographer-media");
            divMedia.setAttribute("class", "div-media");
            infoMedia.setAttribute("class", "info-media");
            source.setAttribute("src", `./assets/photographers/images/${e.video}`);
            video.setAttribute("controls", "true")
            title.textContent = `${e.title}`;
            likes.textContent = `${e.likes}`;
            heart.setAttribute("class", "fa-solid fa-heart");
            video.appendChild(source);
            mediaSection.appendChild(divMedia)
            divMedia.appendChild(video) ;
            divMedia.appendChild(infoMedia)
            infoMedia.appendChild(title);
            infoMedia.appendChild(divLikes)
            divLikes.appendChild(likes);
            divLikes.appendChild(heart);
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
            // console.log(media)
        }
    });

    displayPhotographerHeader();
    displayPhotographerMedia();
    getMedia()

}
init();
