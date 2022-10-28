"use strict";
const movieReview = JSON.parse(localStorage.getItem("review"));
const movieTitle1 = JSON.parse(localStorage.getItem("movieTitle"));
console.log(movieTitle1);

const KEY_API = "AIzaSyCjCLhQv6LNN9B0CCT4oB92tb4-bJsYwrY";
const newUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${movieTitle1}&type=video&key=${KEY_API}`;



// console.log(movieReview);
const main = document.querySelector("#main2");
const lastEl = movieReview.slice(-1);
const topPart = document.querySelector(".top-part");

fetch(newUrl).then(el=> el.json()).then(data=> {
    console.log(data.items[0].id.videoId);
    const tmp = `
    <iframe width="949" height="534" src="https://www.youtube.com/embed/${data.items[0].id.videoId}" title="${movieTitle} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    `

    topPart.innerHTML+=tmp;
})


for (let i of lastEl) {
    const div = document.createElement("div");
    div.classList.add("review-movie")
    div.innerHTML = i;
    main.appendChild(div);
}

const movieTitle = document.querySelector(".movie-title");


const comment = document.querySelector(".com");
const sendBtn = document.querySelector(".send");
const comText = document.querySelector(".comment-text");
const comContainer = document.querySelector(".com-container");

sendBtn.addEventListener("click", function(){
    const txt = comment.value;
    const com = `
        <div class="all-com">
            <div class="com-left">
                <img src="img/com.png" alt="">
            </div>
            <div class="com-right">
                <span class="comment-text">${txt}</span>
            </div>
        </div>
    `
    comContainer.innerHTML += com;
    comment.value = "";
})


