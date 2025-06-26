import express from 'express';
import { registerClient, loginClient, getAllClients, getProposalsByClient } from '../Controller/ClientController.js';

const router = express.Router();

// @route   POST /api/clients/register
// @desc    Register a new client
router.post('/register', registerClient);

// @route   POST /api/clients/login
// @desc    Login client
router.post('/login', loginClient);
router.get('/getallclients', getAllClients);
router.get('/getallproposal/:clientId', getProposalsByClient);

export default router;
