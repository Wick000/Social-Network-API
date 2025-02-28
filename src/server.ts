import express from 'express';
import routes from './routes/api/index.js';
import db from './config/connection.js';

await db();

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true}));
app.use(express.json());

app.use(routes);

//ask about the db.once('open') logic and why and when to use it
app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}!`);
});