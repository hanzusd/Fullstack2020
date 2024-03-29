import express from 'express';
import cors from 'cors';
import diagnoseRouter from './src/routes/diagnoses';
import patientRouter from './src/routes/patients';
const app = express();

const options: cors.CorsOptions = {
  origin: ["http://localhost:3000"],
};

app.use(cors(options));
app.use(express.json());

const PORT = 3001;

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.use('/api/diagnoses', diagnoseRouter);
app.use('/api/patients', patientRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});