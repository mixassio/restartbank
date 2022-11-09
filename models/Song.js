import { Schema, model, Types } from 'mongoose';

const schema = new Schema({
  author: { type: String, required: true },
  title: { type: String, required: true, unique: true },
  zhanre: { type: String, required: true, unique: true },
  date: { type: Date, default: Date.now },
  year: { type: String, required: true },
  owner: { type: Types.ObjectId, ref: 'User' },
});

export default model('Song', schema);
