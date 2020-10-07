import express from 'express';
import cron from 'node-cron';
import './database';
import routes from './routes';
import * as swStats from 'swagger-stats';
import * as Subscribers from './subscribers/ScheduleTasks';
import * as swagerDocument from './config/swagger.json';

const app = express();
app.use(express.json());
app.use(swStats.getMiddleware({swaggerSpec:swagerDocument}));
app.use(routes);

cron.schedule('0 3 * * *', async () => {
  Subscribers.getStatsFromRepo();

});

app.listen(4000, () => {
  console.log('-- Server running on port 4000 --')
});
