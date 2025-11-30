import mongoose from 'mongoose';

const TransSchema = new mongoose.Schema({
  audioUrl: String,
  transcription: String,
  source: { type: String, default: 'mock' },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Transcription', TransSchema);
