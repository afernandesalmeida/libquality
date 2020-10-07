import RetrieveStatsFromRepo from '../services/RetrieveStatsFromRepo';
import _map from 'lodash/map';
import { getManager } from 'typeorm';

export async function getStatsFromRepo() {
  try {

  const manager = getManager();

  const reposNames = await manager.query(`SELECT FULL_NAME FROM REPOSITORIES`);
  const retrieveStatsFromRepo = new RetrieveStatsFromRepo();

  const allStats = await Promise.all(
    _map(reposNames, async (repoName) => {
      const stat = await retrieveStatsFromRepo.execute(repoName.full_name);
      return stat;
    })
  );

  return allStats;

  }
  catch (error) {
    return error;
  }
}
