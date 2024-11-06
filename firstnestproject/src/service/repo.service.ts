import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { Repo } from 'src/entity/repo.entity';
import { IGithubRepo } from 'src/interface/repo.interface';

@Injectable()
export class ReposService {
  constructor(
    @InjectRepository(Repo)
    private readonly reposRepository: Repository<Repo>,
    private readonly httpService: HttpService,
  ) {}

  async fetchAndFilterRepos(): Promise<Repo[]> {
    try {
      const response = await firstValueFrom(
        this.httpService.get<IGithubRepo[]>(
          'https://api.github.com/users/freeCodeCamp/repos',
        ),
      );

      const filteredRepos = response.data.filter(
        (repo) => !repo.fork && repo.forks > 5,
      );

      const savedRepos = await Promise.all(
        filteredRepos.map((repo) => {
          const newRepo = this.reposRepository.create({
            name: repo.name,
            description: repo.description,
            language: repo.language,
            fork: repo.fork,
            forks: repo.forks,
            forks_count: repo.forks_count,
            created_at: new Date(repo.created_at),
          });
          return this.reposRepository.save(newRepo);
        }),
      );

      return savedRepos;
    } catch (error) {
      throw new Error(`Failed: ${error.message}`);
    }
  }

  async findAll(language?: string): Promise<Repo[]> {
    try {
      const query = this.reposRepository
        .createQueryBuilder('repo')
        .orderBy('repo.created_at', 'DESC');

      if (language) {
        query.where('repo.language = :language', { language });
      }

      return query.getMany();
    } catch (error) {
      throw new Error(`Failed fetch to db: ${error.message}`);
    }
  }
}
