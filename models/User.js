import { Schema, model, Types } from 'mongoose';

const schema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    requierd: true,
  },
  songs: [{ type: Types.ObjectId, ref: 'Song' }]
});

export default model('User', schema);
