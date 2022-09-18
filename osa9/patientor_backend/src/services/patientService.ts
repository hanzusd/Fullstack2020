import patientData from '../../data/patients.json';
import { v1 as uuid } from 'uuid';

import { PatientEntry, NewPatientEntry, NonSensitivePatientInfo  } from '../types';
 
const patients: Array<PatientEntry> = patientData;

const getPatients = (): Array<PatientEntry> => {
  return patients;
};

const getNonSensitivePatientInfo = (): NonSensitivePatientInfo[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const addPatient = ( entry: NewPatientEntry ):PatientEntry => {
  const id = uuid();
  const newPatientEntry = {
    id: id,
    ...entry
  };
  patients.push(newPatientEntry);
  return newPatientEntry;
};

export default {
  getPatients,
  getNonSensitivePatientInfo,
  addPatient
};