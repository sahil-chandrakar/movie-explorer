"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const movieBar = document.querySelector(".movie-bar");
const searchInput = document.querySelector("#searchInput");
//showing movie data code started
const getMovieData = (searchText) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch(`https://www.omdbapi.com/?apikey=e9f421&s=${searchText}`);
        const data = yield response.json();
        movieBar.innerHTML = "";
        if (!data.Search) {
            movieBar.innerHTML = "<p>No results found....</p>";
            return;
        }
        data.Search.forEach((element) => {
            displayMovieData(element.Poster, element.Title, element.Year);
        });
    }
    catch (error) {
        console.log("some error is coming /n", error);
    }
});
// function which display the movie
const displayMovieData = (imeUrl, title, year) => {
    movieBar.innerHTML += `
        <div class="card">
            <img src="${imeUrl}">
            <h2>${title}</h2>
            <p>${year}</p>
        </div>
    `;
};
let searchTimer;
searchInput.addEventListener("input", (e) => {
    clearTimeout(searchTimer);
    const target = e.target;
    const text = target.value.trim();
    if (text.length > 0) {
        searchTimer = window.setTimeout(() => {
            getMovieData(text);
        }, 500);
    }
    else {
        getMovieData("you");
    }
});
//function declaration
getMovieData("you");
