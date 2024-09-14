const { register, login, getUserById } = require('../services/authService');
const jwt = require('jsonwebtoken');

// Register a new user
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    
    try {
        const user = await register(name, email, password);
        res.status(201).json({ message: 'User registered successfully', user });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Login a user and return a token
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await login(email, password);
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token, user });
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
};

// Get the user profile (protected route)
const getProfile = async (req, res) => {
    const user = await getUserById(req.user.id);
    res.json(user);
};

module.exports = {
    registerUser,
    loginUser,
    getProfile
};
