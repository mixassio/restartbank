import { Router } from 'express';
import Song from '../models/Song.js';
import auth from '../middleware/auth.middleware.js';


const songRouter = Router();

songRouter.post('/generate', auth, async (req, res) => {
  try {
    const { song } = req.body;
    const newSong = new Song({ ...song, owner: req.user.userId });
    const data = await newSong.save();
    res.status(201).json({ song: data });
  } catch (err) {
    res.status(500).json({ message: `Somethig went wrong, try again: ${err}` });
  }
});

songRouter.get('/', auth, async (req, res) => {
  try {
    const params = req.params;
    const query = req.query;
    // const songs = await Song.find({ owner: req.user.userId });
    const songs = await Song.find().limit(query.limit).skip(query.limit * query.page);
    const countSongs = await Song.count();
    const authors = Array.from(new Set(songs.map(s => s.author)))
    const zhanres = Array.from(new Set(songs.map(s => s.zhanre)));
    return res.json({ data: songs, countSongs, filters: { authors, zhanres }});
  } catch (err) {
    res.status(500).json({ message: 'Somethig went wrong, try again' });
  }
});

songRouter.get('/:id', auth, async (req, res) => {
  try {
    const song = await Song.findById(req.params.id);
    res.json(song);
  } catch (err) {
    res.status(500).json({ message: 'Somethig went wrong, try again' });
  }
});

export default songRouter;
