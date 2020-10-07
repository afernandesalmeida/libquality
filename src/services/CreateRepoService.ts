import { getRepository } from 'typeorm';
import RetrieveStatsFromRepo from './RetrieveStatsFromRepo';
import Repo from '../models/Repo';
import api from '../api/api';

interface Response {

  id: number;

  name: string;

  full_name: string;

  description: string;

  owner: {
    avatar_url: string;
  }

  html_url: string;

  open_issues: number;
}

class CreateRepoService {
  public async execute(repositoryName: string): Promise<Repo> {

    const reposRepository = getRepository(Repo);

    const repoData = await api.get<Response>(`repos/${repositoryName}`);

    const repoAlreadyStored = await reposRepository.findOne({
      where: { full_name: repositoryName },
    });

    if (repoAlreadyStored) {

      throw new Error('Project already stored.');

    }

    const {id, name, full_name, description, owner, html_url } = repoData.data;

    const repo = reposRepository.create({
      id_repository: id,
      name,
      full_name,
      description,
      avatar_url: owner.avatar_url,
      html_url,
    });

    await reposRepository.save(repo);

    const retrieveStatsFromRepo = new RetrieveStatsFromRepo();

    await retrieveStatsFromRepo.execute(repositoryName);

    return repo;

  }
}
export default CreateRepoService;
