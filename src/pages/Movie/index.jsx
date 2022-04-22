import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import config from '../../config/config.json';
import './movie.css';
import api from '../../services/api';

import { toast } from 'react-toastify'

function Movie() {
  const { id } = useParams();
  const navigate = useNavigate()
  const baseImageURL = 'https://image.tmdb.org/t/p/original';
  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState(true);
  let [hasMovie, setHasMovie] = useState(false)

  useEffect(()=> {
    const myList = localStorage.getItem('@moviesflix');

    let favoritesMovies = JSON.parse(myList) || [];
    const movieExists = favoritesMovies.some(favoriteMovie => favoriteMovie.id === movie.id)
    setHasMovie(movieExists)
  },[movie])

  useEffect(()=>{
    async function loadMovie() {
      await api.get(`/movie/${id}`, {
        params: {
          api_key: config.api_key,
          language: config.language
        }
      })
      .then((response)=> {
        setMovie(response.data);
        setLoading(false);
      })
      .catch(()=> {
        navigate("/", { replace: true });
        return;
      })
    }
    loadMovie();

  },[navigate, id])

  function saveMovie() {
    const myList = localStorage.getItem('@moviesflix');

    let favoritesMovies = JSON.parse(myList) || [];

    favoritesMovies.push(movie);
    localStorage.setItem("@moviesflix", JSON.stringify(favoritesMovies));
    setHasMovie(true)
    toast.success("Filme salvo com sucesso");
  }

  if(loading) {
    return(
      <div className='movie-info'>
        <h1>Carregando detalhes</h1>
      </div>
    )
  }

  return(
    <div className='movie-info'>
      <h1>{movie.title}</h1>
      <img src={`${baseImageURL}${movie.backdrop_path}`} alt={movie.title} />
      <h3>Sinopse</h3>
      <span>{movie.overview}</span>
      <strong>Avaliação: {movie.vote_average} / 10</strong>

      <div className='area-buttons'>
        {hasMovie && <button>Adicionado</button> }
        {!hasMovie && <button onClick={saveMovie}>Salvar</button> }
        
        <button>
          <a target="blank" rel="external noreferrer" href={`https://youtube.com/results?search_query=${movie.title} Trailer`}>
            Trailer
          </a>
        </button>
      </div>

    </div>
  );
}

export default Movie;