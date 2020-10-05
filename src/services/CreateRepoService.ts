import { getRepository } from 'typeorm';
import Repo from '../models/Repo';
import api from '../api';

interface Response {

  id_repository: number;

  name: string;

  full_name: string;

  html_url: string;

  issues_open_count: number;

  created_at: Date;

  updated_at: Date;

}

class CreateRepoService {
  public async execute(repositoryName: string): Promise<Repo> {

    const reposRepository = getRepository(Repo);

    const response = await api.get<Response>(`repos/${repositoryName}`)
    .then()
    .catch((err) => {
      throw new Error(err.data.message);
  });

  const hasThisRepo = await reposRepository.findOne({
    where: { full_name: repositoryName },
  });

  if (hasThisRepo) {
    return hasThisRepo;
  }



  const repo = await reposRepository.create({
    id_repository: response.data.id,
    name: response.data.name,
    full_name: response.data.full_name,
    html_url: response.data.html_url,
    issues_open_count: response.data.open_issues_count,
    created_at: response.data.created_at,
    updated_at: response.data.updated_at

  });

  await reposRepository.save(repo);

  return repo;

  }
}
export default CreateRepoService;
