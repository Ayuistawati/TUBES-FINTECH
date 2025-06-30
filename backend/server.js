const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const connectDB = require('./utils/connectDB');

// Load ENV
dotenv.config();

// Connect ke MongoDB
connectDB();

// Init App
const app = express();
app.use(cors());
app.use(bodyParser.json());

// Serve file foto KTP
app.use('/uploads', express.static('uploads'));

// Routes
const premiRoutes = require('./routes/premiRoutes');
const authRoutes = require('./routes/authRoutes'); // <-- tambahkan authRoutes

app.use('/api/premi', premiRoutes);
app.use('/api/auth', authRoutes); // <-- endpoint untuk register dan login

// Run Server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
});
