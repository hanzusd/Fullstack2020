import patientData from '../../data/patients';
import { oldPatientEntry } from '../utils';
import { v1 as uuid } from 'uuid';

import { Entry, NewPatient, NonSensitivePatientInfo, Patient  } from '../types';
 
const patients: Array<Patient> = patientData.map(patient => oldPatientEntry(patient));

const getPatients = (): Array<Patient> => {
  return patients;
};

const getNonSensitivePatientInfo = (): NonSensitivePatientInfo[] => {
  return patients.map(({ id, name, dateOfBirth, occupation, gender, entries }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
    entries
  }));
};

const addPatient = ( entry: NewPatient ):Patient => {
  const id = uuid();
  const newPatient = {
    id: id,
    entries: [],
    ...entry
  };
  patients.push(newPatient);
  return newPatient;
};

const addEntry = ( patientId: string, entry:Entry ) => {
  let patient:Patient | undefined;
  for (const p of patients) {
    if (p.id === patientId) {
      patient = p;
      break;
    }
  }
  if (!patient) {
    throw new Error('Patient not found!');
  }
  patient.entries.push(entry);
  return entry;
};

const getPatient = ( id: string ): Patient => {
  for (let i = 0; i< patients.length; i++) {
    if(patients[i].id === id) {
      return patients[i];
    }
  }
  return patients[0];
};

export default {
  getPatients,
  getNonSensitivePatientInfo,
  addPatient,
  getPatient,
  addEntry
};