function photographerFactory(data) {
    const { name, portrait, city, country, tagline, price, id } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;

        /* */
        const click = document.createElement ( 'a' );
        const loc = document.createElement ('p');
        const citation = document.createElement ('p');
        const prix = document.createElement ('p');

        click.href = "./photographer.html?id=" + id;
        click.style.textDecoration = "none"
        click.setAttribute("id", id);
        click.setAttribute("aria-label", name)
        loc.setAttribute("class", "loc");
        citation.setAttribute("class", "citation");
        prix.setAttribute("class", "prix");
        loc.textContent = city + ", " + country;
        citation.textContent = tagline;
        prix.textContent = price + "€/jour";
        
    
        /* */
        article.appendChild(click)

        click.appendChild(img);
        click.appendChild(h2);

        /* */
        article.appendChild(loc);
        article.appendChild(citation);
        article.appendChild(prix);
        /* */
        
        return (article);
    }
    return { name, picture, getUserCardDOM }
}