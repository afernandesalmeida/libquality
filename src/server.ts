import express from 'express';
import './database';
import routes from './routes'

const app = express();
app.use(express.json());

app.use(routes);
app.listen(4000, () => {
  console.log('-- Server running on port 4000 --')
});
