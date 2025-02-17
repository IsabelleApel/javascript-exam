import { fetchTopMovies } from './modules/api.js';
import oData from './data/data.js';
import { createCard } from './components/movieCard.js'; 
import { getElement } from './utils/domUtils.js';
import { displaymovieDetails } from './modules/eventHandlers.js'
import { renderTrailers } from './modules/caroussel.js';

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
    setupRecs();
    setupTrailers();
}

async function setupFavorites(){

}

async function setupMovie(movie){
    console.log('hello');
    
}

async function setupSearch(){

}

function setupRecs(){
    const recsRef = getElement('#cardContainer');

    oData.topMovieList.sort(() => Math.random() -0.5);

    for(let movie of oData.topMovieList){
        console.log(movie);
        let card = createCard(movie);
        recsRef.appendChild(card);
        card.addEventListener('click', (event) => {
            event.preventDefault();
            window.location.href = './movie.html';
        });
    }
}

function setupTrailers(){
    oData.topMovieList.sort(() => Math.random() -0.5);

    let fiveTrailers = oData.topMovieList.slice(0, 5);
    console.log(fiveTrailers);
    for (let i = 0; i < fiveTrailers.length; i++) {
        renderTrailers(fiveTrailers[i], i+1)
    }
    
}

    

