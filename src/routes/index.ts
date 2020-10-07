import { Router } from 'express';
import reposRouter from './repos.routes';
import swaggerUi from 'swagger-ui-express';
import * as swagerDocument from '../config/swagger.json';

const routes = Router();

routes.use('/repos', reposRouter);
routes.use('/swagger', swaggerUi.serve, swaggerUi.setup(swagerDocument));

export default routes;
