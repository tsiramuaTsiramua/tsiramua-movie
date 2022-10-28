"use strict";

class User {
    constructor(username, password) {
        this.username = username
        this.password = password
    }
}

const user = JSON.parse(localStorage.getItem("user")) || []
const overlay = document.querySelector(".overlay");
const sidebar = document.querySelector(".sidebar");
const sidebarIconTexts = document.querySelectorAll(".sidebar-span");
const sidebarRegisterBtn = document.querySelector(".sidebar-register-btn");
const sidebarLogInBtn = document.querySelector(".sidebar-log-in-btn");
const registerForm = document.querySelector(".register-form");
const logInForm = document.querySelector(".log-in-form");
const remover = document.querySelectorAll(".remover");
const regUsername = document.querySelector(".reg-username")
const regEmail = document.querySelector(".reg-email")
const regPassword = document.querySelector(".reg-password")
const regRepeatPassword = document.querySelector(".reg-repeat-password")
const registrationBtn = document.querySelector(".reg-btn")
const allRegistrationInp = document.querySelectorAll(".reg-inp")
const logInBtn = document.querySelector(".log-in-btn")
const logInUsernameInp = document.querySelector(".log-in-username")
const logInPasswordInp = document.querySelector(".log-in-password")
const allLogInInp = document.querySelectorAll(".log-in-inp")
const sidebarUser = document.querySelector(".sidebar-user")
const sidebarUserName = document.querySelector(".user-name")
const sidebarRegister = document.querySelector(".sidebar-register")
const sidebarLogin = document.querySelector(".sidebar-log-in")
const sidebarLogOut = document.querySelector(".sidebar-log-out")
const hamburger = document.querySelector(".hamburger-content")
const navSearch = document.querySelector(".nav-search-input")
const searchIcon = document.querySelector(".search-icon")
const navLogo = document.querySelector(".nav-logo")
const navLinks = document.querySelector(".nav-links");



sidebar.addEventListener("mouseover", function() {
    sidebar.style.width = "200px";
    sidebarRegisterBtn.style.width = "150px";
    sidebarLogInBtn.style.width = "150px";
    for (const i of sidebarIconTexts) {
        i.style.display = "block";
    }
})

sidebar.addEventListener("mouseout", function() {
    sidebar.style.width = "90px"
    sidebarRegisterBtn.style.width = "70px"
    sidebarLogInBtn.style.width = "70px"
    for (const i of sidebarIconTexts) {
        i.style.display = "none"
    }
})

overlay.addEventListener("click", function() {
    registerForm.classList.add("hidden");
    logInForm.classList.add("hidden");
    overlay.classList.add("hidden");
})

sidebarRegisterBtn.addEventListener("click", function() {
    registerForm.classList.remove("hidden");
    overlay.classList.remove("hidden");
})

sidebarLogInBtn.addEventListener("click", function() {
  logInForm.classList.remove("hidden");
  overlay.classList.remove("hidden");
})

for (const i of remover) {
  i.addEventListener("click", function(){
    if (this.parentNode.classList.contains("remove-register-form")) {
      registerForm.classList.add("hidden");
      overlay.classList.add("hidden");
    } else {
      logInForm.classList.add("hidden");
      overlay.classList.add("hidden");
    }
  })
}

registrationBtn.addEventListener("click", function() {
  const userIn = user.findIndex(i=> i.username === regUsername.value)
  if (userIn === -1) {
      if (regUsername.value.length >= 4) {
          if (regPassword.value.length >= 8 && regPassword.value.length >= 8) {
              if (regPassword.value === regRepeatPassword.value) {
                  const obj = new User(regUsername.value, regPassword.value)
                  user.push(obj)
                  localStorage.setItem("user", JSON.stringify(user))
                  registerForm.classList.add("hidden")
                  overlay.classList.add("hidden");
              } else {
                  regPassword.style.borderColor = "red"
                  regRepeatPassword.style.borderColor = "red"
              }
          } else {
              regPassword.style.borderColor = "red"
              regRepeatPassword.style.borderColor = "red"
          }
      } else {
          regUsername.style.borderColor = "red"
      }
  } else {
      for (const i of allRegistrationInp) {
          i.style.borderColor = "red"
      }
  }
  
  for (const i of allRegistrationInp) {
      i.value = ""
  }
})

logInBtn.addEventListener("click", function() {
  console.log(user)
  for (const i of user) {
      if (i.username === logInUsernameInp.value) {
          if (i.password === logInPasswordInp.value) {
              sidebarUser.style.display = "block"
              sidebarUserName.textContent = `${i.username}`
              sidebarRegister.style.display = "none"
              sidebarLogin.style.display = "none"
              logInForm.classList.add("hidden")
              sidebarLogOut.style.display = "block"
              overlay.classList.add("hidden");
              for (const i of allLogInInp) {
                i.value = ""
                i.style.borderColor = "#777"
              }
          } else {
              logInPasswordInp.style.borderColor = "red"
          }
      } else {
          logInUsernameInp.style.borderColor = "red"
      }
  }
  for (const i of allLogInInp) {
      i.value = ""
  }
})

sidebarLogOut.addEventListener("click", function() {
  sidebarUser.style.display = "none"
  sidebarRegister.style.display = "block"
  sidebarLogin.style.display = "block"
  sidebarLogOut.style.display = "none"
})

let counter = 1
hamburger.addEventListener("click", ()=> {
    navLinks.style.display = "block";
  counter++
  if (counter % 2 == 0) {
    navLinks.style.display = "block";
  } else {
    navLinks.style.display = "none"
}
})

function baseMovie (){
  for (let movie of movieArr) {
    const {title, poster_path, vote_average, overview} = movie
    const movieEl = document.createElement("div")
    movieEl.classList.add("movie")
    movieEl.innerHTML = `
    <img src="${imageUrl + poster_path}" alt="${title}">
        <div class="movie-info">
          <h3>${title}</h3>
          <span class="">${vote_average}</span>
          <div class="overview">
          ${overview}
        </div>
        </div>
        <div class="favorite">
        <i class="fa-solid fa-heart favorite-font"></i>
        <div>
    `
    main.appendChild(movieEl)
  }
}

navSearch.addEventListener("keyup", function() {
  const filterMovie = searchMovie.filter(movie=> movie.title.toLowerCase().slice(0, navSearch.value.length) === navSearch.value.toLowerCase().slice(0, navSearch.value.length));
  main.style.justifyContent = "space-around";
  main.style.flexWrap = "wrap";
  main.innerHTML = "";
  showMovies(filterMovie);
})

navLogo.addEventListener("click", function() {
  navSearch.value = "";
  getMovies(API_URL)
})