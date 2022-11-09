import React from "react";

export const SongCard = ({ song }) => {
  return (
    <>
      <h2>Song</h2>
      <p>author: <strong>{song.author}</strong></p>
      <p>title: <strong>{song.title}</strong></p>
      <p>zhanre: <strong>{song.zhanre}</strong></p>
      <p>year: <strong>{song.year}</strong></p>
      <p>date upload: <strong>{new Date(song.date).toLocaleDateString()}</strong></p>
    </>
  )
};