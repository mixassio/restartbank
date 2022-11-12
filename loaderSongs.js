import {faker} from '@faker-js/faker';
import mongoose from 'mongoose';
import config from 'config';
import Song from './models/Song.js';

const songs = [];
for (let i = 0; i < 50; i++) {
  const author = faker.name.fullName({ sex: faker.name.sex() });
  for (let j = 0; j < 70; j++) {
    const zhanre = faker.music.genre();
    const title = faker.music.songName();
    const year = faker.date.between('1973-01-01T00:00:00.000Z', '2020-01-01T00:00:00.000Z').getFullYear();
    songs.push({ author, title, zhanre, year, owner: null })
  }
}
console.log(songs)

async function load() {
  try {
    await mongoose.connect(config.get('mongoUrl'), {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    
    for (const song of songs) {
      const newSong = new Song(song);
      await newSong.save();
    }
    await mongoose.disconnect()
    console.log('done')
  } catch (err) {
    console.log('Server error' + err.message);
    process.emit(1);
  }
}

load();