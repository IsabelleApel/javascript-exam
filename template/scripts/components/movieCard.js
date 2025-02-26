import {getElement, createElement, addClass} from '../utils/domUtils.js' 

export function createCard(movie){
    const cardRef = createElement('article');
    addClass(cardRef, 'card');
    const cardTemp =`
    <a class="popular__link" href="">
        <div class="card-top">
            <img class="card-top__img" src="${checkPoster(movie)}" 
            alt="movie-poster for ${movie.Title}">
            <span class="card-top__heart"><i class="fa-regular fa-heart"></i></span>
        </div>
        <div class="card-bottom">
            <h3 class="card-bottom__title">${movie.Title}</h3>
        </div>
    </a>
    `;

  cardRef.innerHTML = cardTemp;

  return cardRef;
}

function checkPoster(movie){
    if(movie.Poster === 'N/A'){
        return './res/icons/missing-poster.svg';
    } else{
        return movie.Poster;
    }
}

async function checkImageExists(url) {
    try {
        const response = await fetch(url, { method: "HEAD" });
        console.log('image', response);
        if(!response.ok) {
            throw new Error('Image does not exist');
        }
        return response.ok;
    } catch (error) {
        console.log(error.message);
        return false;
    }
}




export function createMovieDetailCard(movie){
    const cardRef = getElement('#movieInformation')
    const cardTemp = `
    <div class="movie-information__left">
        <img src="${checkPoster(movie)}" alt="Poster for ${movie.Title}" class="movie-information__img">
    </div>
    <div class="movie-information__right">
        <h2 class="movie-information__title">${movie.Title}</h2>
        <P class="movie-information__year">${movie.Year}</P>
        <span style="color: #F5C518" class="movie-information__rating" id="movieRating">
        </span>
        <p class="movie-information__blurb">${movie.Plot}</p>
        <ul class="movie-information__actors" id="actorsList">
        </ul>
    </div>
    `;

    cardRef.innerHTML = cardTemp;

  return cardRef;
}

export function displayRatings(ratings){
    for(let rating of ratings){
        const ratingRef = getElement('#movieRating');
        if(rating.Source === 'Internet Movie Database'){
            const ratingIconRef = createElement('i');
            addClass(ratingIconRef, "fa-brands");
            addClass(ratingIconRef, "fa-imdb");
            addClass(ratingIconRef, "fa-2x");
            const ratingTextRef = createElement('p');
            addClass(ratingTextRef, 'movie-information__rating-text')
            ratingTextRef.textContent = rating.Value;
            ratingRef.appendChild(ratingIconRef);
            ratingRef.appendChild(ratingTextRef);
        }
        return ratingRef
    } 
}

export function displayActors(actors){
    const actorArr = actors.split(",");
    const listRef = getElement('#actorsList')
    for(let actor of actorArr){
        const listItemRef = createElement('li');
        listItemRef.textContent = actor;
        listRef.appendChild(listItemRef);
    }
    return listRef
}





