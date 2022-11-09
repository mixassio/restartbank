import React from "react";
import { Link } from "react-router-dom";

export const SongList = ({ songs }) => {
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>№</th>
            <th>Исполнитель</th>
            <th>Песня</th>
            <th>Жанр</th>
            <th>Год</th>
          </tr>
        </thead>

        <tbody>
          {songs.map((song, index) => {
            return (
              <tr key={song._id}>
                <td>{index + 1}</td>
                <td>{song.author}</td>
                <td>{song.title}</td>
                <td>{song.zhanre}</td>
                <td>{song.year}</td>
                <td>
                  <Link to={`/detail/${song._id}`}>open</Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  )
}