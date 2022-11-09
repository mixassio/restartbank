import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Loader } from '../components/Loader';
import { SongList } from '../components/SongList';
import { AuthContext } from '../context/AuthContext';
import { useHttp } from '../hooks/http.hook';

export const SongPage = () => {
  const [songs, setSongs] = useState([]);
  const { request, loading } = useHttp();
  const { token } = useContext(AuthContext);
  const fetchSongs = useCallback(async () => {
    try {
      const data = await request('/api/song', 'GET', null, { Authorization: `Bearer ${token}`})
      setSongs(data);
    } catch (error) {}
  }, [token, request]);
  useEffect(() => {
    fetchSongs();
  }, [fetchSongs]);
  if (loading) {
    return <Loader />
  }
  return (
    <>
     {!loading && <SongList songs={songs} />}
    </>
  )
}