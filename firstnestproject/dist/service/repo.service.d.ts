import { Repository } from 'typeorm';
import { HttpService } from '@nestjs/axios';
import { Repo } from 'src/entity/repo.entity';
export declare class ReposService {
    private readonly reposRepository;
    private readonly httpService;
    constructor(reposRepository: Repository<Repo>, httpService: HttpService);
    fetchAndFilterRepos(): Promise<Repo[]>;
    findAll(language?: string): Promise<Repo[]>;
}
