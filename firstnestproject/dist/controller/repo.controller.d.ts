import { Repo } from 'src/entity/repo.entity';
import { ReposService } from 'src/service/repo.service';
export declare class ReposController {
    private readonly reposService;
    constructor(reposService: ReposService);
    getRepos(): Promise<Repo[]>;
    getReposList(language?: string): Promise<Repo[]>;
}
