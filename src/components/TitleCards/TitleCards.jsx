import React, { useEffect, useRef, useState } from 'react'
import './TitleCards.css'
import { Link } from 'react-router-dom';
//import cards_data from '../../assets/cards/Cards_data'


const TitleCards = ({title,category}) => {

  const [apiData,setApiData] = useState([]);
  const cardsRef = useRef();

  const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NjQzOGEwMTA1ODFiZTFjNTBkNzA0Yzk5ZjhlZGZjNiIsIm5iZiI6MTc0NzE2MDE3Ni45NTEsInN1YiI6IjY4MjM4YzcwNjg3MzZhMjM4MzRiNGQzZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.upOXjqDGT_54DRELkaw2bMcmtLK7aK5wdNcMQZAlNYM'
  }
};


  const handleWheel =(event)=>{
       event.preventDefault();
       cardsRef.current.scrollLeft +=event.deltaY;
  }


  useEffect(()=>{
    
  fetch(`https://api.themoviedb.org/3/movie/${category?category :"now_playing"}?language=en-US&page=1`, options)
  .then(res => res.json())
  .then(res => setApiData(res.results))
  .catch(err => console.error(err));
 
     cardsRef.current.addEventListener('wheel',handleWheel)
  },[])


  return (
    <div className='title-card'>
      <h3>{title? title : "Popular on Netflix"}</h3>

      <div className='card-list' ref={cardsRef}>
        {apiData.map((card,index)=>{
        return <Link to={`/player/${card.id}`} className='card' key={index}>
          <img src={`https://image.tmdb.org/t/p/w500`
            +card.backdrop_path} alt="" />
          <p>{card.original_title}</p>
        </Link>
        })}
      </div>
    </div>
  )
}

export default TitleCards
