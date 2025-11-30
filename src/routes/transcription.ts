import { Router } from 'express';
import Transcription from '../models/Transcription';

const router = Router();

router.post('/', async (req, res)=>{
  const { audioUrl } = req.body;
  const transcription = "mock text";
  const saved = await Transcription.create({ audioUrl, transcription });
  res.status(201).json({ id: saved._id });
});


router.get('/', async (req, res)=>{
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  const data = await Transcription.find({createdAt : {$gt : thirtyDaysAgo}});
  res.status(200).json({ data: data });
});


export default router;
