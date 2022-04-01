    // async function getPhotographers() {
    //     // Penser à remplacer par les données récupérées dans le json
        
    //      async function getPhotographers() {
    //     // Penser à remplacer par les données récupérées dans le json
    //     let jsonPhotographers = ('../../data/photographers.json')
    //     fetch(jsonPhotographers)
    //         .then(res => console.log(res))
    //         .then(res2 => console.log(res2.photographers))
    //         .catch(error => console.log(error));
    //     console.log(jsonPhotographers)
    //     // et bien retourner le tableau photographers seulement une fois
    //     return ({
    //         jsonPhotographers: [...jsonPhotographers]})
    // }

    // async function getPhotographers() {
    //     fetch('../../data/photographers.json')
    //         .then(res => res.json())   
    //         .then(data => {
    //             let allPhotographers = data.photographers
    //             // console.log(a)
    //             allPhotographers.forEach(e => {
    //                 console.log(e)
    //             });
    //         })
    //         .catch(error => console.log(error));
    // }

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

    //     const photographers = [
    //         {
    //             "name": "Ma data test",
    //             "id": 1,
    //             "city": "Paris",
    //             "country": "France",
    //             "tagline": "Ceci est ma data test",
    //             "price": 400,
    //             "portrait": "account.png"
    //         },
    //         {
    //             "name": "Autre data test",
    //             "id": 2,
    //             "city": "Londres",
    //             "country": "UK",
    //             "tagline": "Ceci est ma data test 2",
    //             "price": 500,
    //             "portrait": "account.png"
    //         },
    //     ]
    //     // et bien retourner le tableau photographers seulement une fois
    //     return ({
    //         photographers: [...photographers, ...photographers, ...photographers]})
    // }

    async function displayData(photographers) {
        const photographersSection = document.querySelector(".photographer_section");

        photographers.forEach((photographer) => {
            const photographerModel = photographerFactory(photographer);
            const userCardDOM = photographerModel.getUserCardDOM();
            photographersSection.appendChild(userCardDOM);
        });
    };

    async function init() {
        // Récupère les datas des photographes
        const { photographers } = await getPhotographers();
        displayData(photographers);
    };
    
    init();
    