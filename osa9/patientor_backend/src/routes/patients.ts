import express from 'express';
import patientService from '../services/patientService';

const router = express.Router();

router.get('/', (_req, res) => {
  const info = patientService.getNonSensitivePatientInfo();
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  res.send(info);
});

router.post('/', (_req, res) => {
  res.send('Saving a patient!');
});

export default router;