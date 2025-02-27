import { getElement, getElements, addClass, removeClass } from "../utils/domUtils.js";
import oData from '../data/data.js';
import { createCard } from "../components/movieCard.js";

export async function displaymovieDetails(card, movie){
    card.addEventListener('click', (event) => {
        event.preventDefault();
        window.location.href = './movie.html';
        localStorage.setItem('clickedMovie', JSON.stringify(movie))
    });
}

export function searchListener(){
    const inputRef = getElement('#searchInput')
    inputRef.addEventListener('input', (event) => {
        event.preventDefault();
        localStorage.setItem('searchedMovie', JSON.stringify(inputRef.value))

    })
    
    getElement('#searchForm').addEventListener('submit', (event) =>{
        event.preventDefault();
        window.location.href = `/template/search.html`;
        
    })
}

export function handleFavourites(){
    const heartRefs = getElements('.fa-heart');
    let favourites = JSON.parse(localStorage.getItem('favourites')) || [];
    
    for(let heartRef of heartRefs){ 
        const card = heartRef.closest('.card__link');
        const imdbElem = card.querySelector('.movie-id');
        const imdbID = imdbElem.textContent;
        

        heartRef.addEventListener('click', (event) => {
            event.preventDefault();
            event.stopPropagation(); 
            if(!favourites.includes(imdbID)){
                favourites.push(imdbID);
                addClass(heartRef, 'fa-solid');
                removeClass(heartRef, 'fa-regular')
            } else{
                favourites = favourites.filter(id => id !== imdbID);
                addClass(heartRef, 'fa-regular');
                removeClass(heartRef, 'fa-solid')
            }
           localStorage.setItem('favourites', JSON.stringify(favourites)); 
        })
    }
    
}

