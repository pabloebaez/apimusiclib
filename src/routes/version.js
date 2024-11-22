import express from 'express';

const router = express.Router();

router.get('/version', (req, res) => {
  res.json({ nodeVersion: process.version });
});

export default router;
