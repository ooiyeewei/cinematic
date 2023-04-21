import React, {useState, useEffect, useReducer} from "react";
import "../App.css";
import Header from "./header";
import Movie from "./movie";
import MovieFilter from "./movieFilter/movieFilter";

const MOVIE_API_URL = "https://www.omdbapi.com/?s=man&apikey=4a3b711b"; // you should replace this with yours
const initialState = {
    isLoading: true,
    moviesList: [],
    errorMessage: null
};

const reducer = (state, action) => {
    switch (action.type) {
        case "SEARCH_MOVIES_REQUEST":
            return {
                ...state,
                isLoading: true,
                errorMessage: null
            };
        case "SEARCH_MOVIES_SUCCESS":
            return {
                ...state,
                isLoading: false,
                moviesList: action.payload
            };
        case "SEARCH_MOVIES_FAILURE":
            return {
                ...state,
                isLoading: false,
                errorMessage: action.error
            };
        default:
            return state;
    }
};

const App = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        fetch(MOVIE_API_URL)
            .then(response => response.json())
            .then(jsonResponse => {

                dispatch({
                    type: "SEARCH_MOVIES_SUCCESS",
                    payload: jsonResponse.Search
                });
            });
    }, []);

    const handleSearch = (searchValue) => {
        dispatch({
            type: "SEARCH_MOVIES_REQUEST"
        });

        let searchText = '';

        if (searchValue?.title) {
            searchText += 's=' + searchValue?.title;
        }

        if (searchValue?.type?.value) {
            searchText += '&type=' + searchValue?.type?.value;
        }

        fetch(`https://www.omdbapi.com/?${searchText}&apikey=4a3b711b`)
            .then(response => response.json())
            .then(jsonResponse => {
                if (jsonResponse.Response === "True") {
                    dispatch({
                        type: "SEARCH_MOVIES_SUCCESS",
                        payload: jsonResponse.Search
                    });
                } else {
                    dispatch({
                        type: "SEARCH_MOVIES_FAILURE",
                        error: jsonResponse.Error
                    });
                }
            });
    };

    const { moviesList, errorMessage, isLoading } = state;

    return (
        <div className="App">
            <Header text="CINEMATIC" />
            <MovieFilter handleSearch={handleSearch} />
            <p className="App-intro">Sharing a few of our favourite movies</p>
            <div className="movies">
                {isLoading && !errorMessage ? (
                    <span>loading...</span>
                ) : errorMessage ? (
                    <div className="errorMessage">{errorMessage}</div>
                ) : (
                    moviesList.map((movie, index) => (
                        <Movie key={`${index}-${movie.Title}`} movie={movie} />
                    ))
                )}
            </div>
        </div>
    );
};

export default App;
