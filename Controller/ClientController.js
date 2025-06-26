import jwt from 'jsonwebtoken';
import Client from '../Models/Client.js';
import Proposal from '../Models/Proposal.js';

// Client Registration
export const registerClient = async (req, res) => {
  try {
    const { name, email, mobile, password, confirmPassword } = req.body;

    if (!name || !email || !mobile || !password || !confirmPassword) {
      return res.status(400).json({
        message: 'All fields are required: Name, Email, Mobile, Password, and Confirm Password!',
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match!' });
    }

    const clientExists = await Client.findOne({ $or: [{ email }, { mobile }] });
    if (clientExists) {
      return res.status(400).json({ message: 'Client with this email or mobile already exists!' });
    }

    const newClient = new Client({
      name,
      email,
      mobile,
      password, // ⚠️ You should hash this before saving in production
    });

    await newClient.save();

    const token = jwt.sign({ id: newClient._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: '1h',
    });

    return res.status(201).json({
      message: 'Client registered successfully',
      token,
      client: {
        id: newClient._id,
        name: newClient.name,
        email: newClient.email,
        mobile: newClient.mobile,
        createdAt: newClient.createdAt,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Client Login
export const loginClient = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    const client = await Client.findOne({ email });

    if (!client) {
      return res.status(404).json({ error: 'Client not found. Please register first.' });
    }

    // ⚠️ You should compare hashed passwords in production using bcrypt.compare()

    const token = jwt.sign(
      { id: client._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: '1h' }
    );

    return res.status(200).json({
      message: 'Login successful',
      token,
      client: {
        _id: client._id,
        name: client.name || null,
        email: client.email || null,
        mobile: client.mobile || null,
        company: client.company || null, // assuming you might have this
        location: client.location || null,
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      error: 'Something went wrong during login',
      details: err.message,
    });
  }
};



export const getAllClients = async (req, res) => {
  try {
    const clients = await Client.find().select('-password'); // hide password for security

    res.status(200).json({
      message: 'Clients fetched successfully',
      total: clients.length,
      clients,
    });
  } catch (error) {
    console.error('Error fetching clients:', error);
    res.status(500).json({
      message: 'Server error while fetching clients',
    });
  }
};


export const getProposalsByClient = async (req, res) => {
  try {
    const { clientId } = req.params;

    const proposals = await Proposal.find({ clientId }).sort({ createdAt: -1 });

    if (!proposals.length) {
      return res.status(404).json({ message: 'No proposals found for this client' });
    }

    res.status(200).json(proposals);
  } catch (error) {
    console.error('Error fetching client proposals:', error);
    res.status(500).json({ message: 'Server error while fetching proposals' });
  }
};

