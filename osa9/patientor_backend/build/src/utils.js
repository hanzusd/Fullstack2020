"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toNewEntry = exports.oldPatientEntry = exports.toNewPatientEntry = void 0;
const types_1 = require("./types");
const uuid_1 = require("uuid");
const toNewPatientEntry = ({ name, dateOfBirth, ssn, gender, occupation }) => {
    const newPatient = {
        name: parseName(name),
        dateOfBirth: parseDate(dateOfBirth),
        ssn: parseSsn(ssn),
        gender: parseGender(gender),
        occupation: parseOccupation(occupation)
    };
    return newPatient;
};
exports.toNewPatientEntry = toNewPatientEntry;
const oldPatientEntry = ({ id, name, dateOfBirth, ssn, gender, occupation, entries }) => {
    const oldPatient = {
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
exports.oldPatientEntry = oldPatientEntry;
const toNewEntry = (data) => {
    data.id = (0, uuid_1.v1)();
    if (!isEntry(data)) {
        throw new Error('Incorrect or missing entry');
    }
    return data;
};
exports.toNewEntry = toNewEntry;
const parseId = (id) => {
    if (!id || !isString(id)) {
        throw new Error('Incorrect or missing id');
    }
    return id;
};
const parseName = (name) => {
    if (!name || !isString(name)) {
        throw new Error('Incorrect or missing name');
    }
    return name;
};
const parseDate = (date) => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date: ' + date);
    }
    return date;
};
const parseSsn = (ssn) => {
    if (!ssn || !isString(ssn)) {
        throw new Error('Incorrect or missing social security number');
    }
    return ssn;
};
const parseGender = (gender) => {
    if (!gender || !isGender(gender)) {
        throw new Error('Incorrect or missing gender: ' + gender);
    }
    return gender;
};
const parseOccupation = (occupation) => {
    if (!occupation || !isString(occupation)) {
        throw new Error('Incorrect or missing occupation');
    }
    return occupation;
};
const parseEntries = (entries) => {
    if (!entries || !isEntryArray(entries)) {
        throw new Error('Incorrect or missing entry');
    }
    return entries;
};
const isString = (text) => {
    return typeof text === 'string' || text instanceof String;
};
const isDate = (date) => {
    return Boolean(Date.parse(date));
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(types_1.Gender).includes(param);
};
const isEntryArray = (entries) => {
    if (!Array.isArray(entries)) {
        return false;
    }
    for (const e of entries) {
        if ((e.type !== 'Hospital') && (e.type !== 'OccupationalHealthcare') && (e.type !== 'HealthCheck')) {
            return false;
        }
    }
    return true;
};
const isEntry = (data) => {
    return (isHospitalEntry(data) || isHealthCheckEntry(data) || isOccupationalHealthcareEntry(data));
};
const isDiagnosisCodeArray = (codes) => {
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
const isHealthCheckRating = (rating) => {
    if (rating === types_1.HealthCheckRating.Healthy || rating === types_1.HealthCheckRating.LowRisk || rating === types_1.HealthCheckRating.HighRisk || rating === types_1.HealthCheckRating.CriticalRisk) {
        return true;
    }
    return false;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isBaseEntry = (entry) => {
    if (isString(entry.id) && isString(entry.description) && isString(entry.date) && isString(entry.specialist) && (!entry.diagnosisCodes || isDiagnosisCodeArray(entry.diagnosisCodes))) {
        return true;
    }
    return false;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isHospitalEntry = (data) => {
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
const isOccupationalHealthcareEntry = (data) => {
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
const isHealthCheckEntry = (data) => {
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
