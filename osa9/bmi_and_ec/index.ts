import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = parseInt(String(req.query.height));
  const weight = parseInt(String(req.query.weight));
  if (isNaN(weight) || isNaN(height)) {
    res.status(400).json({
      error: 'malformatted parameters'
    });
    return;
  }
  const bmi = calculateBmi(Number(req.query.height), Number(req.query.weight));
  res.json({
    weight,
    height,
    bmi
  });
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { exercises, goal } = req.body;

  
  if ( !exercises || !goal ) {
    return res.status(400).send({ error: 'parameters missing'});
  }

  if(!(Array.isArray(exercises)) || isNaN(Number(goal))) {
    return res.status(400).send({ error: 'malformatted parameters' });
  }
  for (let i = 0; i < exercises.length; i++) {
    if(isNaN(Number(exercises[i]))) {
      return res.status(400).send({ error: 'malformatted parameters' });
    }
  }  
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const answer = calculateExercises(exercises, goal);
  return res.send(answer);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});