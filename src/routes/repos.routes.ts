import { Router } from 'express';
import CreateRepoService from '../services/CreateRepoService';
import { getManager } from 'typeorm';
import _map from 'lodash/map';

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

reposRouter.get('/', async (request, response) => {
  try {

  const manager = getManager();

  const reposInfo = await manager.query(`SELECT ID, NAME FROM REPOSITORIES`);

  const actualReposStats = await Promise.all(reposInfo.map( async (repoId) => {
    const repoStat = await manager.query(`SELECT RS.TOTAL_OPEN_ISSUES,
    RS.AVG_TIME_OPEN_ISSUES,
    RS.STD_OPEN_ISSUES
    FROM REPO_STATS RS
    WHERE RS.ID_REPO = '${repoId.id}'
    ORDER BY RS.CREATED_AT DESC
    LIMIT 1`)

    return repoStat;
  }
  ));

  const allRepoStats: any[] = [];
  _map(actualReposStats, el => allRepoStats.push(...el))

  const mergedRepo = reposInfo.map((item, i) => Object.assign({}, item, allRepoStats[i]));
  console.log(mergedRepo);

  return response.json(mergedRepo);
} catch (error) {
  return response.status(500).json({error: 'Internal Server Error'});
}
});

export default reposRouter;
