"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReposService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const axios_1 = require("@nestjs/axios");
const rxjs_1 = require("rxjs");
const repo_entity_1 = require("../entity/repo.entity");
let ReposService = class ReposService {
    constructor(reposRepository, httpService) {
        this.reposRepository = reposRepository;
        this.httpService = httpService;
    }
    async fetchAndFilterRepos() {
        try {
            const response = await (0, rxjs_1.firstValueFrom)(this.httpService.get('https://api.github.com/users/freeCodeCamp/repos'));
            const filteredRepos = response.data.filter((repo) => !repo.fork && repo.forks > 5);
            const savedRepos = await Promise.all(filteredRepos.map((repo) => {
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
            }));
            return savedRepos;
        }
        catch (error) {
            throw new Error(`Failed: ${error.message}`);
        }
    }
    async findAll(language) {
        try {
            const query = this.reposRepository
                .createQueryBuilder('repo')
                .orderBy('repo.created_at', 'DESC');
            if (language) {
                query.where('repo.language = :language', { language });
            }
            return query.getMany();
        }
        catch (error) {
            throw new Error(`Failed fetch to db: ${error.message}`);
        }
    }
};
exports.ReposService = ReposService;
exports.ReposService = ReposService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(repo_entity_1.Repo)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        axios_1.HttpService])
], ReposService);
//# sourceMappingURL=repo.service.js.map