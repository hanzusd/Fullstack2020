"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const patients_json_1 = __importDefault(require("../../data/patients.json"));
const utils_1 = require("../utils");
const uuid_1 = require("uuid");
const patients = patients_json_1.default.map(patient => (0, utils_1.oldPatientEntry)(patient));
const getPatients = () => {
    return patients;
};
const getNonSensitivePatientInfo = () => {
    return patients.map(({ id, name, dateOfBirth, occupation, gender, entries }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
        entries
    }));
};
const addPatient = (entry) => {
    const id = (0, uuid_1.v1)();
    const newPatient = Object.assign({ id: id }, entry);
    patients.push(newPatient);
    return newPatient;
};
const getPatient = (id) => {
    for (let i = 0; i < patients.length; i++) {
        if (patients[i].id === id) {
            return patients[i];
        }
    }
    return patients[0];
};
exports.default = {
    getPatients,
    getNonSensitivePatientInfo,
    addPatient,
    getPatient
};
