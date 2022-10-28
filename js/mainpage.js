"use strict"

// localStorage.clear()

const popularLink = document.querySelector(".popular");
const kidLink = document.querySelector(".kids");
const drama = document.querySelector(".drama");
const mainMovieContainer = document.querySelector("#main");

const API_KEY = "api_key=2263815fb012ff3af28c7f62dc94e644";
const BASE_URL = 'https://api.themoviedb.org/3';
const POPULAR_API_URL = BASE_URL + "/discover/movie?sort_by=popularity.desc&" + API_KEY;
const imageUrl = 'https://image.tmdb.org/t/p/w500';
const tags = document.querySelector(".tags");

const movieReview = JSON.parse(localStorage.getItem("review")) || [];

const movieArr = []
let searchMovie = []

popularLink.addEventListener("click", function() {
    kidLink.classList.remove("active");
    popularLink.classList.add("active");
    drama.classList.remove("active");
    mainMovieContainer.innerHTML = "";
    fetch(POPULAR_API_URL).then(el=> el.json()).then(data=> {
        showMovies(data.results)
        searchMovie = data.results;
    })
})

kidLink.addEventListener("click", function() {
    kidLink.classList.add("active");
    popularLink.classList.remove("active");
    drama.classList.remove("active");
    mainMovieContainer.innerHTML = "";
    fetch(BASE_URL + "/discover/movie?primary_release_date.gte=2014-09-15&primary_release_date.lte=2014-10-22&" + API_KEY).then(el=> el.json()).then(data=> {
        showMovies(data.results)
        searchMovie = data.results;
    })
})

drama.addEventListener("click", function() {
    drama.classList.add("active");
    kidLink.classList.remove("active");
    popularLink.classList.remove("active");
    mainMovieContainer.innerHTML = "";
    fetch(BASE_URL + "/discover/movie?with_genres=35&with_cast=23659&sort_by=revenue.desc&" + API_KEY).then(el=> el.json()).then(data=> {
        showMovies(data.results)
        searchMovie = data.results;
    })
})


popularMovies(POPULAR_API_URL);

function popularMovies(url) {
    fetch(url).then(el=> el.json()).then(data=> {
        showMovies(data.results)
        searchMovie = data.results;
    })
}

function showMovies(data) {
    main.innerHTML = ""
    data.forEach(movie => {
      movieArr.push(movie)
      const {title, poster_path, vote_average, overview, id} = movie
      const movieHtmlEl = `
      <div class="movie" data-id=${id}>
      <img src="${imageUrl + poster_path}" alt="${title}">
          <div class="movie-info">
            <h3 class="movie-title">${title}</h3>
            <span class="">${vote_average}</span>
            <div class="overview">
            ${overview}
          </div>
          </div>
          <div class="favorite">
            <i class="fa-solid fa-heart favorite-font"></i>
          <div>
      </div>
      `
      
      main.insertAdjacentHTML("beforeend", movieHtmlEl);
    });
  
    const movies = document.querySelectorAll(".movie");
    for (let i = 0 ; i < movies.length; i++) {
      movies[i].addEventListener("click", function() {
        const selectedMovie = movieArr.find(function(movie) {
          return movie.id == movies[i].dataset.id;
        })
        movieReview.push(movies[i].innerHTML);
        localStorage.setItem("review", JSON.stringify(movieReview));
        localStorage.setItem("movieTitle", JSON.stringify(selectedMovie.title));
        window.location.href = "movie-review.html";
      })
    }
}