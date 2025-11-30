import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import transcriptionRoutes from './routes/transcription';
import cors from "cors"

dotenv.config();
const app = express();
app.use(express.json());

app.use(cors({
  origin: "*",
  methods: ["GET", "POST"]
}));

app.use('/transcription', transcriptionRoutes);

mongoose.connect(process.env.MONGO_URI || '')
  .then(()=> console.log('DB connected'));

app.listen(process.env.PORT, ()=> console.log('Server running'));
