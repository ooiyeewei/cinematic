import React, { useState } from "react";
import Select from 'react-select';
import './movieFilter.css';

const initialFilter = {
    title: '',
    type: '',
};

const constMovieType = [
    { value: 'movie', label: 'Movie' },
    { value: 'series', label: 'Series' },
];

const MovieFilter = (props) => {
    const [filter, setFilter] = useState(initialFilter);

    const handleFilterChange = (e) => {
        const {value, name} = e.target || {};
        setFilter({
            ...filter,
            [name]: value
        });
    };

    const handleSelectChange = (e) => {
        setFilter({
            ...filter,
            type: e
        });
    };

    const handleFilterClear = () => {
        setFilter(initialFilter);
    };

    const handleFilterSearch = (e) => {
        e.preventDefault();
        props.handleSearch(filter);
        handleFilterClear();
    };

    return (
        <form className="search">
            <input
                className={'search-input'}
                value={filter.title}
                onChange={handleFilterChange}
                type="text"
                name={'title'}
            />
        <br/>
            <Select
                className={'search-select'}
                placeholder={"Movie Type"}
                options={constMovieType}
                isClearable={true}
                isSearchable={false}
                name={"type"}
                onChange={handleSelectChange}
                value={filter.type}
            />
            <input className={'submit-button'} onClick={handleFilterSearch} type="submit" value="SEARCH" />
        </form>
    );
};

export default MovieFilter;
