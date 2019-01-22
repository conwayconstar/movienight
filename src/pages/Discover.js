import React, { Component } from 'react';
import axios from '../helpers/axios';
import Movie from '../components/Movie';

class Discover extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: [],
      search: '',
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
    this.queryMovies();
  }

  handleInputChange(e) {
    const { target } = e;
    const { value } = target;
    this.setState(
      {
        search: value,
      },
    );

    this.queryMovies(value);
  }

  queryMovies(search = '') {
    axios.get(search.length > 2 ? `search/movie?query=${search}` : 'discover/movie?sort_by=popularity.desc')
      .then((res) => {
        const { results } = res.data;
        this.setState(
          {
            movies: [...results],
          },
        );
      });
  }

  render() {
    const { movies, search } = this.state;
    return (
      <div className="container mt-5">

        <div className="row mb-4">
          <div className="col-md-6 mr-auto ml-auto text-center">
            <h1>Search for a film</h1>


            <input
              type="text"
              className="form-control"
              name="search"
              id="search"
              onChange={this.handleInputChange}
              value={search}
              placeholder="Search"
            />
          </div>
        </div>

        { movies.length
          ? (
            <div className="row">
              {movies.map(movie => (<Movie movie={movie} key={movie.id} />))}
            </div>
          )
          : (<h3 className="text-center">We could not find any movies with your search query</h3>)
          }
      </div>
    );
  }
}

export default Discover;
