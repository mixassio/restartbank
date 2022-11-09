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
    const songs = await Song.find({ owner: req.user.userId });
    return res.json(songs);
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
