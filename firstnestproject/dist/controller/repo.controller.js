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
exports.ReposController = void 0;
const common_1 = require("@nestjs/common");
const repo_service_1 = require("../service/repo.service");
let ReposController = class ReposController {
    constructor(reposService) {
        this.reposService = reposService;
    }
    async getRepos() {
        try {
            return await this.reposService.fetchAndFilterRepos();
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getReposList(language) {
        try {
            return await this.reposService.findAll(language);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.ReposController = ReposController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ReposController.prototype, "getRepos", null);
__decorate([
    (0, common_1.Get)('list'),
    __param(0, (0, common_1.Query)('language')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ReposController.prototype, "getReposList", null);
exports.ReposController = ReposController = __decorate([
    (0, common_1.Controller)('repos'),
    __metadata("design:paramtypes", [repo_service_1.ReposService])
], ReposController);
//# sourceMappingURL=repo.controller.js.map