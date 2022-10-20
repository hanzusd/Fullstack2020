import { NewPatient, Gender, Patient, Entry, BaseEntry, HospitalEntry, OccupationalHealthcareEntry, Diagnosis, HealthCheckEntry, HealthCheckRating } from './types';
import { v1 as uuid } from 'uuid';

type Fields = { name: unknown, dateOfBirth: unknown, ssn: unknown, gender: unknown, occupation: unknown };
type Fields2 = { id: unknown, name: unknown, dateOfBirth: unknown, ssn: unknown, gender: unknown, occupation: unknown, entries: unknown };

export const toNewPatientEntry = ( {name, dateOfBirth, ssn, gender, occupation}: Fields ): NewPatient => {
  const newPatient: NewPatient = {
    name: parseName(name),
    dateOfBirth: parseDate(dateOfBirth),
    ssn: parseSsn(ssn),
    gender: parseGender(gender),
    occupation: parseOccupation(occupation)
  };
  return newPatient;
};

export const oldPatientEntry = ( {id, name, dateOfBirth, ssn, gender, occupation, entries}: Fields2 ): Patient => {
  const oldPatient: Patient = {
    id: parseId(id),
    name: parseName(name),
    dateOfBirth: parseDate(dateOfBirth),
    ssn: parseSsn(ssn),
    gender: parseGender(gender),
    occupation: parseOccupation(occupation),
    entries: parseEntries(entries)
  };
  return oldPatient;
};

export const toNewEntry = (data: any): Entry => {
  data.id = uuid();
  if (!isEntry(data)) {
    throw new Error ('Incorrect or missing entry');
  }
  return data;
};

const parseId = (id: unknown): string => {
  if (!id || !isString(id)) {
    throw new Error('Incorrect or missing id');
  }
  
  return id;
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing name');
  }
  
  return name;
};

const parseDate = (date: unknown): string => {
    if (!date || !isString(date) || !isDate(date)) {
      throw new Error('Incorrect or missing date: ' + date);
    }
    return date;
  };

const parseSsn = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error('Incorrect or missing social security number');
  }
  return ssn;
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error('Incorrect or missing occupation');
  }  
  return occupation;
};

const parseEntries = (entries: unknown): Array<Entry> => {
  if (!entries || !isEntryArray(entries)) {
    throw new Error('Incorrect or missing entry');
  }
  return entries;
};
  
const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = ( param:any ): param is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(param);
};

const isEntryArray = ( entries: unknown ): entries is Array<Entry> => {
  if (!Array.isArray(entries)) {
    return false;
  }
  for (const e of entries) {
    if ((e.type!=='Hospital')&&(e.type!=='OccupationalHealthcare')&&(e.type!=='HealthCheck') ) {
      return false;
    }
  }
  return true;
};

const isEntry = (data: unknown): data is Entry => {
  return (isHospitalEntry(data) || isHealthCheckEntry(data) || isOccupationalHealthcareEntry(data));
};

const isDiagnosisCodeArray = (codes: any): codes is Array<Diagnosis['code']> => {
  if (Array.isArray(codes)) {
    for (const code of codes) {
      if (!isString(code)) {
        return false;
      }
    }
    return true;
  }
  return false;
};

const isHealthCheckRating = (rating: any): rating is HealthCheckRating=> {
  if (rating === HealthCheckRating.Healthy || rating === HealthCheckRating.LowRisk || rating === HealthCheckRating.HighRisk || rating === HealthCheckRating.CriticalRisk) {
    return true;
  }
  return false;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isBaseEntry = ( entry:any ): entry is BaseEntry => {
  if (isString(entry.id) && isString(entry.description) && isString(entry.date) && isString(entry.specialist) && (!entry.diagnosisCodes || isDiagnosisCodeArray(entry.diagnosisCodes))) {
    return true;
  }
  return false;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isHospitalEntry = (data : any): data is HospitalEntry => {
  if (data.type !== "Hospital") {
    return false;
  }
  if (!data.discharge) {
    return false;
  }
  if (isString(data.discharge.date) && isString(data.discharge.criteria)) {
    return isBaseEntry(data);
  }
  return false;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isOccupationalHealthcareEntry = (data : any): data is OccupationalHealthcareEntry => {
  if (data.type !== "OccupationalHealthcare") {
    return false;
  }
  if (!data.employerName) {
    return false;
  }
  if (!data.sickLeave || (isString(data.sickLeave.startDate) && isString(data.sickLeave.endDate))) {
    return isBaseEntry(data);
  }
  return false;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isHealthCheckEntry = (data : any): data is HealthCheckEntry => {
  if (data.type !== "HealthCheck") {
    return false;
  }
  if (!data.healthCheckRating) {
    return false;
  }
  if (isHealthCheckRating(data.healthCheckRating)) {
    return isBaseEntry(data);
  }
  return false;
};