import express from 'express';
import patientService from '../services/patientService';
import { toNewPatientEntry, toNewEntry } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  const info = patientService.getNonSensitivePatientInfo();
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  res.send(info);
});

router.post('/', (req, res) => {
  try{
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const newPatientEntry = toNewPatientEntry(req.body);

    const addedPatient = patientService.addPatient(newPatientEntry);
    res.json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage); 
  }
});

router.get('/:id', (req, res) => {
  const patient = patientService.getPatient(req.params.id);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  res.send(patient);
});


router.post('/:id/entries', (req, res) => {
  try{
    const newEntry = toNewEntry(req.body);

    const newEntrySent = patientService.addEntry(req.params.id, newEntry);
    res.status(200).send(newEntrySent);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage); 
  }
});

export default router;