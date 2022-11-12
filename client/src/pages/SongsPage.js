import React, { useContext, useEffect, useState } from 'react';
import { Loader } from '../components/Loader';
import { SongList } from '../components/SongList';
import { AuthContext } from '../context/AuthContext';
import { useHttp } from '../hooks/http.hook';

export const SongPage = () => {
  const [songs, setSongs] = useState([]);
  const [filteredSongs, setFilteredSongs] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [zhanres, setZhanres] = useState([]);
  const [filterAuthors, setFilterAuthors] = useState(null);
  const [filterZhanres, setFilterZhanres] = useState(null);
  const { request, loading } = useHttp();
  const { token } = useContext(AuthContext);

  useEffect(() => {
    window.M.updateTextFields();
  }, [])

  // scrolling
  const [currentPage, setCurrentPage] = useState(1);
  const [fetching, setFetching] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  useEffect(() => {
    const scrollHandler = (e) => {
      if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100
      && songs.length < totalCount && !filterAuthors) {
        setFetching(true);
      }
    }
    document.addEventListener('scroll', scrollHandler);
    return function() {
      document.removeEventListener('scroll', scrollHandler)
    }
  }, [totalCount, songs, filterAuthors]);
  
  // end

  useEffect(() => {
    console.log('boom',songs)
     const newState =  songs
        .filter(song => {
          return filterAuthors ? song.author === filterAuthors : true;
        })
        .filter(song => {
          return filterZhanres ? song.zhanre === filterZhanres : true;
        })
        console.log("🚀 ~ file: SongsPage.js ~ line 49 ~ useEffect ~ newState", newState)
        setFilteredSongs(newState)
     
  }, [filterAuthors, filterZhanres, songs])

  
  useEffect(() => {
    if (fetching) {
      request(`/api/song?limit=50&page=${currentPage}`, 'GET', null, { Authorization: `Bearer ${token}`})
      .then(({ data, countSongs, filters: { authors, zhanres } }) => {
        setSongs([...songs, ...data]);
        setFilteredSongs(songs)
        setAuthors(prevState => Array.from(new Set([...prevState, ...authors])));
        setZhanres(zhanres)
        setCurrentPage(prevState => prevState + 1)
        setTotalCount(countSongs);
      })
      .finally(() => {
        setFetching(false)
      })
    }
  }, [fetching, currentPage, request, songs, token]);

  return (
    <>
      <div className='row'>
        <div className='col s8 offset-s2'>
          <div className="input-field col s12">
            <p>Author</p>
            <select 
              className="browser-default"
              placeholder="authors"
              id="authors"
              type="text"
              value={filterAuthors}
              onChange={(e) => {
                console.log(e.target.value);
                setFilterAuthors(e.target.value)
              }}
            >
              {authors.map(author => {
                return (
                  <option value={author}>{author}</option>
                )
              })}
            </select>
            {/* <label htmlFor="authors">Authors</label> */}
            <a className="waves-effect waves-light btn" onClick={() => setFilterAuthors(null)}>clear author</a>
          </div>

          <div className="input-field col s12">
            <p>Zhanre</p>
            <select
              className="browser-default"
              placeholder="Zhanres"
              id="zhanres"
              type="text"
              value={filterZhanres}
              onChange={(e) => setFilterZhanres(e.target.value)}
            >
              {zhanres.map(zhanre => {
                return (
                  <option value={zhanre}>{zhanre}</option>
                )
              })}
            </select>
            {/* <label htmlFor="zhanres">Zhanres</label> */}
            <a className="waves-effect waves-light btn" onClick={() => setFilterZhanres(null)}>clear zhanre</a>
          </div>
        </div>
      </div>
      <div>
        {<SongList songs={filteredSongs} />}
        {loading && <Loader /> }
      </div>
    </>
  )
}