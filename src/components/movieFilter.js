import React, { useState } from "react";

const MovieFilter = (props) => {
    const [filter, setFilter] = useState("");

    const handleFilterChange = (e) => {
        setFilter(e.target.value);
    };

    const handleFilterClear = () => {
        setFilter("");
    };

    const handleFilterSearch = (e) => {
        e.preventDefault();
        props.handleSearch(filter);
        handleFilterClear();
    };

    return (
        <form className="search">
            <input
                value={filter}
                onChange={handleFilterChange}
                type="text"
            />
            <input onClick={handleFilterSearch} type="submit" value="SEARCH" />
        </form>
    );
};

export default MovieFilter;
