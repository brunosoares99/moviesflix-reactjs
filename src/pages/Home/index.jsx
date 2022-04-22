import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import config from '../../config/config.json';
import api from '../../services/api';

import './home.css'

function Home() {
  const baseImageURL = 'https://image.tmdb.org/t/p/original'
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(()=> {
    async function loadMovies() {
      const response = await api.get("movie/now_playing", {
        params: {
          api_key: config.api_key,
          language: config.language,
          page: 1
        }
      })
      const moviesList = response.data.results.slice(0, 10)
      setMovies(moviesList);
      setLoading(false);

    }

    loadMovies()

  }, [])


  if(loading) {
    return (
      <div className='loading'>
        <h2>Carregando Filmes</h2>
      </div>
    )
  }

  return(
    <div className='container'>
      <div className='list-movies'>
        {movies.map((movie)=> {
          return(
            <article key={movie.id}>
              <strong>{movie.title}</strong>
              <img src={`${baseImageURL}${movie.poster_path}`} alt={movie.title} />
              <Link to={`/movie/${movie.id}`}>Acessar</Link>
            </article>
          )
        })}
      </div>
    </div>
  );
}

export default Home;