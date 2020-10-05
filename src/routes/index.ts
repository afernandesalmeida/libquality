import { Router } from 'express';
import reposRouter from './repos.routes';

const routes = Router();

routes.use('/repos', reposRouter);

export default routes;
