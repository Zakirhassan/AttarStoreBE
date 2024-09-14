const db = require('../config/database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET || 'your-default-secret-key';


// Register a new user
const register = async (name, email, password, roles = 'admin') => {
    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Define the SQL query and values
        const sql = 'INSERT INTO users (name, email, password, roles) VALUES (?, ?, ?, ?)';
        const values = [name, email, hashedPassword, roles];

        // Execute the query and get the result
        const [result] = await db.promise().query(sql, values);

        // Return the newly inserted user details
        return {
            id: result.insertId,
            name,
            email,
        };
    } catch (error) {
        // Handle and throw error with a descriptive message
        throw new Error('Error registering user: ' + error.message);
    }
};

// Login a user
const login = async (email, password) => {
    try {
        const sql = 'SELECT * FROM users WHERE email = ?';
        const [results] = await db.promise().query(sql, [email]);

        if (results.length === 0) {
            throw new Error('User not found');
        }

        const user = results[0];
        
        // Compare the hashed password with the user's input
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error('Invalid credentials');
        }

        // Create JWT token on successful login
        const token = jwt.sign(
            { id: user.id, email: user.email, roles: user.roles },
            secretKey, // Ensure this is set correctly
            { expiresIn: '1h' }
        );

        // return { user, token }; // Return the user and token
        return "admin"
    } catch (error) {
        throw new Error('Login failed: ' + error.message);
    }
};

// Get user by ID
const getUserById = (id) => {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM users WHERE id = ?';
        db.query(sql, [id], (err, results) => {
            if (err || results.length === 0) {
                return reject(new Error('User not found'));
            }
            resolve(results[0]);
        });
    });
};

const verifyToken = (token) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded;
    } catch (err) {
        throw new Error('Invalid token');
    }
};

module.exports = {
    register,
    login,
    getUserById,
};
