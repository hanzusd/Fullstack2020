import patientData from '../../data/patients.json';
import { oldPatientEntry } from '../utils';
import { v1 as uuid } from 'uuid';

import { NewPatient, NonSensitivePatientInfo, Patient  } from '../types';
 
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
    ...entry
  };
  patients.push(newPatient);
  return newPatient;
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
  getPatient
};