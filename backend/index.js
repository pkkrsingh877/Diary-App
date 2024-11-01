const express = require('express');
const app = express();
require('dotenv').config();

const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(morgan('dev'));
app.use(cookieParser());
app.use(cors({
    origin: 'https://diary.prabhatkumar.site',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
}));

// Middleware
const verifyUser = require('./middlewares/verifyUser');

// Files for Route Handlers
const diaryRoutes = require('./routes/diary');
const authRoutes = require('./routes/auth');

// Middleware for Routes
app.use('/entries', verifyUser, diaryRoutes);
app.use('/auth', authRoutes);

// Database setup

const databaseSetup = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/diaryapp');
        console.log('DB Connection Successful');
    } catch (error) {
        console.log(error);
        console.log('DB Connection Failed!');
    }
}

databaseSetup();


app.listen(process.env.PORT, () => {
    console.log('App is listening at port ', process.env.PORT);
});