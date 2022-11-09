import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Loader } from '../components/Loader';
import { SongCard } from '../components/SongCard';
import { AuthContext } from '../context/AuthContext';
import { useHttp } from '../hooks/http.hook';

export const DetailPage = () => {
  const { token } = useContext(AuthContext);
  const { request, loading } = useHttp();
  const [song, setSong] = useState(null);
  const songId = useParams().id;
  const getSong = useCallback(async () => {
    try {
      const data = await request(`/api/song/${songId}`, 'GET', null, { Authorization: `Bearer ${token}`});
      setSong(data);
    } catch (error) {}
  }, [token, songId, request]);
  useEffect(() => {
    getSong()
  }, [getSong]);
  if (loading) {
    return <Loader />
  }
  return (
    <>
     { !loading && song && <SongCard song={song} />}
    </>
  )
}