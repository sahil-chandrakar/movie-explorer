interface MovieItem {
  Poster: string;
  Title: string;
  Year: string;
}
interface OmdbResponse {
  Search?: MovieItem[];
}

const movieBar = document.querySelector(".movie-bar") as HTMLElement;
const searchInput = document.querySelector("#searchInput") as HTMLInputElement;

//showing movie data code started
const getMovieData = async (searchText: string): Promise<void> => {
  try {
    const response = await fetch(
      `https://www.omdbapi.com/?apikey=e9f421&s=${searchText}`
    );
    const data: OmdbResponse = await response.json();
    movieBar.innerHTML = "";

    if (!data.Search) {
      movieBar.innerHTML = "<p>No results found....</p>";
      return;
    }

    data.Search.forEach((element: MovieItem) => {
      displayMovieData(element.Poster, element.Title, element.Year);
    });
  } catch (error) {
    console.log("some error is coming /n", error);
  }
};

// function which display the movie
const displayMovieData = (
  imeUrl: string,
  title: string,
  year: string
): void => {
  movieBar.innerHTML += `
        <div class="card">
            <img src="${imeUrl}">
            <h2>${title}</h2>
            <p>${year}</p>
        </div>
    `;
};

let searchTimer: number;
searchInput.addEventListener("input", (e: Event) => {
  clearTimeout(searchTimer);

  const target = e.target as HTMLInputElement;
  const text = target.value.trim();

  if (text.length > 0) {
    searchTimer = window.setTimeout(() => {
      getMovieData(text);
    }, 500);
  } else {
    getMovieData("you");
  }
});

//function declaration
getMovieData("you");
