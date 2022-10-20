"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patientService_1 = __importDefault(require("../services/patientService"));
const utils_1 = require("../utils");
const router = express_1.default.Router();
router.get('/', (_req, res) => {
    const info = patientService_1.default.getNonSensitivePatientInfo();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    res.send(info);
});
router.post('/', (req, res) => {
    try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        const newPatientEntry = (0, utils_1.toNewPatientEntry)(req.body);
        const addedPatient = patientService_1.default.addPatient(newPatientEntry);
        res.json(addedPatient);
    }
    catch (error) {
        let errorMessage = 'Something went wrong.';
        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
});
router.get('/:id', (req, res) => {
    const patient = patientService_1.default.getPatient(req.params.id);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    res.send(patient);
});
router.post('/:id/entries', (req, res) => {
    try {
        const newEntry = (0, utils_1.toNewEntry)(req.body);
        const newEntrySent = patientService_1.default.addEntry(req.params.id, newEntry);
        res.status(200).send(newEntrySent);
    }
    catch (error) {
        let errorMessage = 'Something went wrong.';
        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
});
exports.default = router;
