import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useHttp } from '../hooks/http.hook';

export const CreatePage = () => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  useEffect(() => {
    window.M.updateTextFields();
  }, [])
  const { request } = useHttp();
  const [song, setSong] = useState({});
  const pressHandler = async (event) => {
    if (event.keyCode === 13) { // event.key === 'Enter
      try {
        const data = await request('/api/song/generate', 'POST', { song }, { Authorization: `Bearer ${auth.token}`});
        navigate(`/detail/${data.song._id}`)
      } catch (error) {}
    }
  }
  return (
    <div className='row'>
      <div className='col s8 offset-s2'>
        <div className="input-field">
          <input
            placeholder="Input title song"
            id="title"
            type="text"
            value={song.title}
            onChange={(e) => setSong({ ...song, title: e.target.value })}
            onKeyDown={pressHandler}
          />
          <label htmlFor="title">Write title</label>
          <input
            placeholder="Input author song"
            id="author"
            type="text"
            value={song.author}
            onChange={(e) => setSong({ ...song, author: e.target.value })}
            onKeyDown={pressHandler}
          />
          <label htmlFor="song">Write author</label>
          <input
            placeholder="Input zhanre song"
            id="zhanre"
            type="text"
            value={song.zhanre}
            onChange={(e) => setSong({ ...song, zhanre: e.target.value })}
            onKeyDown={pressHandler}
          />
          <label htmlFor="song">Write zhanre</label>
          <input
            placeholder="Input year song"
            id="year"
            type="text"
            value={song.year}
            onChange={(e) => setSong({ ...song, year: e.target.value })}
            onKeyDown={pressHandler}
          />
          <label htmlFor="song">Write year</label>
        </div>
        <p>After all press enter</p>
      </div>
    </div>
  )
}