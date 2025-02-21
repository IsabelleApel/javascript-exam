import {getElement, createElement, addClass} from '../utils/domUtils.js' 

export function createCard(movie){
    const cardRef = createElement('article');
    addClass(cardRef, 'card');
    const cardTemp =`
    <a class="popular__link" href="">
        <div class="card-top">
            <img class="card-top__img" src="${movie.Poster || './res/icons/missing-poster.svg'}" 
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



