import patientData from '../../data/patients.json';

import { PatientEntry, NonSensitivePatientInfo  } from '../types';
 
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

const addPatient = () => {
  return null;
};

export default {
  getPatients,
  getNonSensitivePatientInfo,
  addPatient
};