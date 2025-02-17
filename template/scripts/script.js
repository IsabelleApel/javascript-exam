import { fetchTopMovies } from './modules/api.js';
import oData from './data/data.js';
import { createCard } from './components/movieCard.js'; 
import { getElement } from './utils/domUtils.js';
import { displaymovieDetails } from './modules/eventHandlers.js'

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
    setupRecs();
}

async function setupFavorites(){

}

async function setupMovie(){

}

async function setupSearch(){

}

async function setupRecs(){
    await fetchTopMovies();
    
    const recsRef = getElement('#cardContainer');

    oData.topMovieList.sort(() => Math.random() -0.5);

    for(let movie of oData.topMovieList){   
        let card = createCard(movie);
        recsRef.appendChild(card);
    }
}

    

