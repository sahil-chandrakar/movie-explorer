const movieBar = document.querySelector(".movie-bar");
const searchInput = document.querySelector("#searchInput");

//showing movie data code started
const getMovieData = async (searchText) => {
  try {
    const response = await fetch(
      `https://www.omdbapi.com/?apikey=e9f421&s=${searchText}`
    );
    const data = await response.json();
    movieBar.innerHTML = "";

    if (!data.Search) {
      movieBar.innerHTML = "<p>No results found....</p>";
      return;
    }

    data.Search.forEach((element) => {
      displayMovieData(element.Poster, element.Title, element.Year);
    });
  } catch (error) {
    console.log("some error is coming /n", error);
  }
};

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
searchInput.addEventListener("input", (e)=>{
  clearTimeout(searchTimer)

  const text = e.target.value.trim();

  if(text.length > 0){
    searchTimer = setTimeout(()=>{
      getMovieData(text)
    }, 500)
  }
  else{
    getMovieData('you')
  }

})


//function declaration
getMovieData("you");
