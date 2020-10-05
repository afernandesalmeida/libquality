import { Router } from 'express';
import CreateRepoService from '../services/CreateRepoService';

const reposRouter = Router();

reposRouter.post('/', async (request, response) => {
  try {

    const { repositoryName } = request.body;

    const createRepoService = new CreateRepoService();

    const repo = await createRepoService.execute(repositoryName);

    return response.json(repo);
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});



export default reposRouter;
