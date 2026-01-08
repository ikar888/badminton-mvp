import express from 'express';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Welcome to the Badminton-MVP');
})
app.listen(port, () => {
  console.log(`Running @ http://localhost:${port}`);
});