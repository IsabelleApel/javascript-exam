import { fetchTopMovies, fetchSearchedMovies, fetchMovieDetails } from './modules/api.js';
import oData from './data/data.js';
import { createCard, createMovieDetailCard, displayRatings, displayActors } from './components/movieCard.js'; 
import { getElement } from './utils/domUtils.js';
import { renderTrailers } from './modules/caroussel.js';
import { searchListener, handleFavourites, displaymovieDetails } from './modules/eventHandlers.js';    

if(window.location.pathname === '/template/' || window.location.pathname === '/template/index.html') {
    console.log('index.html');
    setupMain();

} else if(window.location.pathname === '/template/favorites.html') {
    console.log('favorites.html');
    setupFavorites();

} else if(window.location.pathname === '/template/movie.html') {
    console.log('movie.html');
    setupMovie();

} else if(window.location.pathname === '/template/search.html') {
    console.log('search.html');
    setupSearch();
}

async function setupMain(){
    await fetchTopMovies();
    setupTrailers();
    setupRecs();
    handleFavourites();
    searchListener();
}

async function setupFavorites(){

}

async function setupMovie(){
    let clickedMovie = JSON.parse(localStorage.getItem('clickedMovie'));
    let movieImdbID = clickedMovie.imdbID;
    let movieDetails = await fetchMovieDetails(movieImdbID);
    console.log(movieDetails);  
    const wrapperRef = getElement('#contentWrapperMovie');
    let card = createMovieDetailCard(movieDetails);
    wrapperRef.appendChild(card);
    displayRatings(movieDetails.Ratings);
    displayActors(movieDetails.Actors);
}

async function setupSearch(){
    let searchedMovie = JSON.parse(localStorage.getItem('searchedMovie'));
    let searchResault = await fetchSearchedMovies(searchedMovie);

    const recsRef = getElement('#cardContainer');
    
    for(let movie of searchResault.Search){  
        console.log(movie);
              
        let card = createCard(movie);
        recsRef.appendChild(card);
        displaymovieDetails(card, movie);
    }
    handleFavourites();
}

function setupRecs(){
    const recsRef = getElement('#cardContainer');

    oData.topMovieList.sort(() => Math.random() -0.5);

    for(let movie of oData.topMovieList){
        let card = createCard(movie);
        recsRef.appendChild(card);
        displaymovieDetails(card, movie)
    }
}

function setupTrailers(){
    oData.topMovieList.sort(() => Math.random() -0.5);

    let fiveTrailers = oData.topMovieList.slice(0, 5);
    for (let i = 0; i < fiveTrailers.length; i++) {
        renderTrailers(fiveTrailers[i], i+1)
    }
    
}

    

