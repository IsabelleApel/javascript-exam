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
    
    for(let heartRef of heartRefs){
        
        heartRef.addEventListener('click', (event) => {
            event.preventDefault();
            event.stopPropagation();
            
            if(heartRef.classList.contains('fa-regular')){
                addClass(heartRef, 'fa-solid');
                removeClass(heartRef, 'fa-regular')
            } else{
                addClass(heartRef, 'fa-regular');
                removeClass(heartRef, 'fa-solid')
            }
            
        })
    }
    
}

