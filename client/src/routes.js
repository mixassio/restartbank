import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthPage } from './pages/AuthPage';
import { CreatePage } from './pages/CreatePage';
import { DetailPage } from './pages/DetailPage';
import { SongPage } from './pages/SongsPage';

export const useRoutes = isAutentificated => {
  if (isAutentificated) {
    return (
      <Routes>
        <Route path="/songs" exact element={<SongPage/>} />
        <Route path="/create" exact element={<CreatePage/>} />
        <Route path="/detail/:id" element={<DetailPage/>} />
        <Route path="*" element={<Navigate replace to="/create" />} />
      </Routes>
    )
  }
  return (
    <Routes>
      <Route path="/" exact element={<AuthPage/>} />
      <Route path="*" element={<Navigate replace to="/" />} />
    </Routes>
  )
}