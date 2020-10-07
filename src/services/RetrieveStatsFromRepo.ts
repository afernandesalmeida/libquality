import { getRepository } from 'typeorm';
import { differenceInDays, parseISO } from 'date-fns';
import { mean, std } from 'mathjs';
import Repo from '../models/Repo';
import RepoStats from '../models/RepoStats';
import _map from 'lodash/map';
import api from '../api/api';

interface RepoResponse {
  open_issues: number;
}

interface IssuesResponse {
  created_at: string;
  updated_at: string;
}

class RetrieveStatsFromRepo {

  public async execute( repositoryName: string ): Promise<RepoStats> {
    const repoStatsRepository = getRepository(RepoStats);
    const reposRepository = getRepository(Repo);

    const repoData = await api.get<RepoResponse>(`repos/${repositoryName}`);
    const { open_issues } = repoData.data;
    const totalIssues = open_issues;

    const { id } = await reposRepository.findOne({
      where: { full_name: repositoryName },
    });

    const totalPages = Math.ceil(totalIssues / 100);
    const auxArray = new Array(totalPages).fill(new Array(100).fill(undefined));

    const allIssuesByPage = await Promise.all(
      _map(auxArray, async (el, page) => {
        const issues = await api.get<IssuesResponse[]>(`repos/${repositoryName}/issues?state=open&per_page=100&page=${page+1}`)
        return issues.data;
      })
    );

      const allIssues: IssuesResponse[] = [];

      _map(allIssuesByPage, el => allIssues.push(...el))

      const daysOpen: number[] = allIssues.map(el =>
        differenceInDays(new Date, parseISO(el.created_at)));

      const avgTime = mean(daysOpen);
      const stdTime = std(daysOpen);

      const repoStats = repoStatsRepository.create({
        id_repo: id,
        total_open_issues: totalIssues,
        avg_time_open_issues: avgTime,
        std_open_issues: stdTime
      });

      await repoStatsRepository.save(repoStats);

      return repoStats;

    }
  }

export default RetrieveStatsFromRepo;
