import { fetchTopMovies } from './modules/api.js';
import oData from './data/data.js';

if(window.location.pathname === '/' || window.location.pathname === '/index.html') {
    console.log('index.html');

} else if(window.location.pathname === '/favorites.html') {
    console.log('favorites.html');

} else if(window.location.pathname === '/movie.html') {
    console.log('movie.html');

} else if(window.location.pathname === '/search.html') {
    console.log('search.html');

}

await fetchTopMovies();

console.log(oData.topMovieList);
    

