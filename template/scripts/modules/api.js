import oData from '../data/data.js';

export async function fetchTopMovies() {
    const response = await fetch('https://santosnr6.github.io/Data/favoritemovies.json');
    let movies = await response.json();  
    oData.topMovieList = movies;    
}

export async function fetchSearchedMovies(str){
    const response = await fetch(`http://www.omdbapi.com/?apikey=cabbb830&s=${str}*`);
    let searchedMovies = await response.json();
    return searchedMovies;
}