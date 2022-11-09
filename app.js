import express from 'express';
import path from 'path';
import config from 'config';
import mongoose from 'mongoose';
import authRouter from './routes/auth.routes.js';
import songRouter from './routes/song.routes.js';

const app = express();
app.use(express.json({ extended: true }))
app.use('/api/auth', authRouter);
app.use('/api/song', songRouter);

if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static(path.resolve('client', 'build')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve('client', 'build', 'index.html'));
  })
}

const PORT = process.env.PORT || config.get('port');
async function start() {
  try {
    await mongoose.connect(config.get('mongoUrl'), {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    app.listen(PORT, () => console.log(`app has been started on port ${PORT}.....`));
  } catch (err) {
    console.log('Server error' + err.message);
    process.emit(1);
  }
}

start();
