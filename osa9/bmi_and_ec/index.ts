import express from 'express';
import { calculateBmi } from './bmiCalculator';
const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = parseInt(String(req.query.height))
  const weight = parseInt(String(req.query.weight))
  if (isNaN(weight) || isNaN(height)) {
    res.status(400).json({
      error: 'malformatted parameters'
    })
    return
  }
  const bmi = calculateBmi(Number(req.query.height), Number(req.query.weight))
  res.json({
    weight,
    height,
    bmi
  })
})

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});