const express = require('express');
const cors = require('cors');
const productRoutes = require('./src/routes/productRoutes');
const authRoutes =  require('./src/routes/authRoutes'); // Import the router
const path = require('path');
const app = express();

app.use(cors());
app.use(express.json());


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Use the router
app.use('/api/products', productRoutes); // Ensure you're passing the router
app.use('/auth',authRoutes)

const PORT = 5500;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
