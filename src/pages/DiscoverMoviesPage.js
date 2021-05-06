import { useState } from "react";
import axios from "axios";
import MovieItem from "../components/MovieItem";

export default function DiscoverMoviesPage() {
  ////Add a state variable to record the search text.
  const [searchText, set_searchText] = useState("");
  console.log("searchText:", searchText);

  //Add a new state variable to record the search state.
  const [state, setState] = useState({ status: "idle" });
  console.log("state:", state);

  //Implement the search function in the movies discovery component.
  const search = async () => {
    if (searchText === "") {
      setState({ status: "idle" });
      return;
    }
    setState({ status: "searching" });

    console.log("Search movies for:", searchText);

    // Best practice: encode the string so that special characters
    //  like '&' and '?' don't accidentally mess up the URL
    const queryParam = encodeURIComponent(searchText);

    // Option B: use the `axios` library like we did on Tuesday
    // $ npm install axios
    // My API Key 9a0a3f81
    //OMDb API "s" Movie title to search for.
    const response = await axios.get(
      `https://omdbapi.com/?apikey=9a0a3f81&s=${queryParam}`
    );
    console.log("Success!", response.data.Search);
    setState({ status: "done", data: response.data.Search });
  };
  //to render on page
  return (
    <div>
      <h1>Discover some movies!</h1>
      <p>
        <input
          value={searchText}
          onChange={(e) => set_searchText(e.target.value)}
        />
        <button onClick={search}>Search</button>
      </p>
      {state.status === "idle" && (
        <p>Type in a search term and click "Search" to start...</p>
      )}
      {state.status === "searching" && <p>Searching...</p>}
      {state.status === "done" && (
        <div>
          <h2>Search results</h2>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              margin: "0 -10px",
            }}
          >
            {state.data.map((movie) => (
              <MovieItem key={movie.imdbID} movie={movie} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
