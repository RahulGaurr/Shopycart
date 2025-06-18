import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import Connection from './database/db.js';
import DefaultData from './default.js';
import router from './routes/route.js';

dotenv.config();

const app = express();

app.use(cors({
    origin: [process.env.CLIENT_URL || 'http://localhost:3000'],
    methods: ['GET', 'POST'],
    credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;

Connection(USERNAME, PASSWORD)
    .then(() => {
        console.log('Database connected successfully');
        DefaultData(); // Call DefaultData after successful connection
    })
    .catch((error) => {
        console.error('Database connection failed:', error.message);
    });

app.use('/api', router); // Use the router with a base path

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});