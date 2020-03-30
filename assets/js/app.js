// moviedb API 

const API_KEY = "6e2ada5e7a89936a72e31d5485a9dc84";
const IMAGE_URL = "https://image.tmdb.org/t/p/w500";

const url = "https://api.themoviedb.org/3/search/movie?api_key=6e2ada5e7a89936a72e31d5485a9dc84";


const buttonElement = document.querySelector('#searchbtn');
const inputElement = document.querySelector('#inputValue');
const movieResults = document.querySelector('#movieresults');


/* <div class="movie">
<section class="section">
    <img src="" alt="">
    <img src="" alt="">
</section>
<div class="content">
    <p id="content-close">x</p>
</div>
</div> */

function movieSection(movies){      
    return movies.map((movie) => {
        // only returns if poster_path is NOT null
        if (movie.poster_path){
            return `<img src=${IMAGE_URL + movie.poster_path} data-movie-id=${movie.id}/>`;
        }
    })
}

function movieResultContainer(movies){
    const movieElement = document.createElement('div');
    movieElement.setAttribute('class', 'movie');

    const movieTemplate = `
    <section class="section">
    ${movieSection(movies)}
    </section>
    <div class="content">
    <p id="content-close">x</p>
    </div>
    `;

    movieElement.innerHTML = movieTemplate;
    return movieElement;
}

function renderMovieResults(data){
    // clears the results everytime new query is made
    movieResults.innerHTML = "";

    const movies = data.results;
    console.log(movies);
    const movieBlock = movieResultContainer(movies);
    movieResults.appendChild(movieBlock);
    console.log(data);
}

buttonElement.onclick = function(event) {
    console.log("button has been clicked");
    const value = inputElement.value;
    
    const searchUrl = url + '&query=' + value;
    
    fetch(searchUrl)
        // convert what returns into JSON
        .then((res) => res.json())
        // data is object and data.results returns array
        .then(renderMovieResults) 
        // if error
        .catch((error) => {
            console.log(error);
        });

    inputElement.value = ""; 
    console.log(value)
}





