import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import './favorites.css'

function Favorites() {
  const [movies, setMovies] = useState([]);

  useEffect(()=> {
    const myFavoritesList = localStorage.getItem('@moviesflix');
    setMovies(JSON.parse(myFavoritesList) || [])
  }, [])

  function handleDeleteMovie(movieId) {
    const areUSure = window.confirm('Você tem certeza que deseja exluir esse filme?')
    if(areUSure) {
      let moviesFilter = movies.filter((movie)=> {
        return movie.id !== movieId
      });
      localStorage.setItem('@moviesflix', JSON.stringify(moviesFilter));
      setMovies(moviesFilter);
      toast.success("Filme removido com sucesso!")
    }
  }

  return(
    <div className='my-movies'>
      <h1>Meus Filmes</h1>

      {movies.length === 0 && <span>Você não possui nenhum filme salvo =(</span>}

      <ul>
        {movies.map((movie)=> {
          return(
            <li key={movie.id}>
              <span>{movie.title}</span>
              <div>
                <Link to={`/movie/${movie.id}`}>Ver detalhes</Link>
                <button onClick={()=> handleDeleteMovie(movie.id)}>Exluir</button>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Favorites;