import express from 'express';
import 'dotenv/config'
import connectDB from './database/connectDB.js';

const app = express();
const port = 3000;

connectDB();

app.get('/', (req, res) => {
  res.send('Welcome to the Badminton-MVP');
})
app.listen(port, () => {
  console.log(`Running @ http://localhost:${port}`);
});