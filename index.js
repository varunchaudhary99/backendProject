const express = require('express')
const app = express()
const PORT = process.env.PORT || 5000
const dotenv =require('dotenv')
//const path = require('path');
const bodyParser = require('body-parser');
const connectDB = require('./config/database')
const authRoutes = require('./utils/routes/authRoute');


connectDB()
const cors = require('cors');
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
//app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/api', authRoutes);
app.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
})



