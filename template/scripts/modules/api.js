import oData from '../data/data.js';

export async function fetchTopMovies() {
    try{
        const response = await fetch('https://santosnr6.github.io/Data/favoritemovies.json');
        let movies = await response.json();  
        oData.topMovieList = movies;  
    }catch{
        console.log(error.message); 
    }  
}

export async function fetchSearchedMovies(str){
    try{
        const response = await fetch(`http://www.omdbapi.com/?apikey=cabbb830&s=${str}*`);
        let searchedMovies = await response.json();
        return searchedMovies;
    }catch{
        console.log(error.message); 
    }
}

export async function fetchMovieDetails(imdbID){
    try{
        const response = await fetch(`http://www.omdbapi.com/?apikey=cabbb830&plot=full&i=${imdbID}`);
        let movieDetails = await response.json();
        return movieDetails;
    }catch(error){
        console.log(error.message); 
    }
}