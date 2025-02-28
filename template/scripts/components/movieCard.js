import { getElement, createElement, addClass, removeClass } from '../utils/domUtils.js' 

export function createCard(movie){
    const cardRef = createElement('article');
    addClass(cardRef, 'card');
    const cardTemp =`
    <a class="card__link heart-aim" href="">
        <div class="card-top">
            <img class="card-top__img" src="" 
            alt="movie-poster for ${movie.Title}">
            <span class="card-top__heart"><i class="fa-regular fa-heart"></i></span>
        </div>
        <div class="card-bottom">
            <h3 class="card-bottom__title">${movie.Title}</h3>
            <p class="movie-id d-none">${movie.imdbID}</p>
        </div>
    </a>
    `;

  cardRef.innerHTML = cardTemp;
  const imgRef = cardRef.querySelector('.card-top__img');
  displayMoviePoster(movie).then(moviePoster =>{
    imgRef.src = moviePoster;
  })
  checkFavourites(cardRef, movie.imdbID);
  return cardRef;
}

export function createMovieDetailCard(movie){
    const cardRef = getElement('#movieInformation')
    const cardTemp = `
    <div class="movie-information__left">
        <img src="" alt="Poster for ${movie.Title}" class="movie-information__img">
    </div>
    <div class="movie-information__right heart-aim">
        <h3 class="movie-information__title">${movie.Title}</h3>
        <p class="movie-id d-none">${movie.imdbID}</p>
        <div class="movie-information__year-heart">
        <p>${movie.Year}</p>
        <span><i class="fa-regular fa-heart"></i></span>
        </div>
        <span style="color: #F5C518" class="movie-information__rating" id="movieRating">
        </span>
        <p class="movie-information__blurb">${movie.Plot}</p>
        <ul class="movie-information__actors" id="actorsList">
        </ul>
    </div>
    `;

    cardRef.innerHTML = cardTemp;
    const imgRef = cardRef.querySelector('.movie-information__img');
    displayMoviePoster(movie).then(moviePoster =>{
      imgRef.src = moviePoster;
    })
    checkFavourites(cardRef, movie.imdbID);
  return cardRef;
}

function checkFavourites(card, imdbID){
    const heartRef = card.querySelector('.fa-heart');
    let favourites = JSON.parse(localStorage.getItem('favourites')) || [];
        if(favourites.includes(imdbID)){
            addClass(heartRef, 'fa-solid');
            removeClass(heartRef, 'fa-regular');
        }  
}

async function displayMoviePoster(movie){
    const moviePoster = await checkPoster(movie);
    return moviePoster;
}

async function checkPoster(movie) {
    try {
        const response = await fetch(movie.Poster);
        if(!response.ok || movie.Poster === 'N/A') {
            throw new Error('Image does not exist');
        }
        return movie.Poster;
    } catch (error) {
        console.log(error.message);
        return './res/icons/missing-poster.svg';
    }
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





