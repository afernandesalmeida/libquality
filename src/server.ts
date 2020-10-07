import express from 'express';
import cron from 'node-cron';
import './database';
import routes from './routes'
import RetrieveStatsFromRepo from './services/RetrieveStatsFromRepo';

const app = express();
app.use(express.json());

app.use(routes);

cron.schedule('0,20,40 * * * *', async () => {
  const retrieveStatsFromRepo = new RetrieveStatsFromRepo();

  const stat = await retrieveStatsFromRepo.execute('facebook/react');
  console.log(stat);

});

app.listen(4000, () => {
  console.log('-- Server running on port 4000 --')
});
