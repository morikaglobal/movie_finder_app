// moviedb API 
const API_KEY = "6e2ada5e7a89936a72e31d5485a9dc84";
const IMAGE_URL = "https://image.tmdb.org/t/p/w500";

const url = "https://api.themoviedb.org/3/search/movie?api_key=6e2ada5e7a89936a72e31d5485a9dc84";


const buttonElement = document.querySelector('#searchbtn');
const inputElement = document.querySelector('#inputValue');
const movieResults = document.querySelector('#movieresults');
const errorMessage = document.querySelector('#errormsg');

function movieSection(movies){    
    const section = document.createElement('section');
    section.classList = "section";
      
    movies.map((movie) => {
        // only returns if poster_path is NOT null
        if (movie.poster_path){
            const img = document.createElement("img");
            img.src = IMAGE_URL + movie.poster_path;
            img["data-movie-id"] = IMAGE_URL + movie.poster_path;

            section.appendChild(img);
        }
    })
    return section;
}

function movieResultContainer(movies){
    const movieElement = document.createElement('div');
    movieElement.setAttribute('class', 'movie');

    // const movieTemplate = `
    // <section class="section">
    // ${movieSection(movies)}
    // </section>`;

    const section = movieSection(movies);

    movieElement.appendChild(section);
    return movieElement;
}

function renderMovieResults(data){
    // clears the results everytime new query is made
    movieResults.innerHTML = "";

    const movies = data.results;
    console.log(movies);
    if (Object.entries(movies).length === 0){
        console.log("empty result");
        errorMessage.innerHTML = "Error: Please enter a valid letter or word for search";
    }
    const movieBlock = movieResultContainer(movies);
    movieResults.appendChild(movieBlock);
    console.log(data);
}

buttonElement.onclick = function(event) {
    console.log("button has been clicked");
    const value = inputElement.value;
    if (value === ""){
        console.log("nothing typed.");
        // display error msg here
        errorMessage.innerHTML = "Error: Please enter a word for search";
        movieResults.innerHTML = "";
    } else {
        errorMessage.innerHTML = "";
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
}





