import {
  Controller,
  Get,
  Query,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Repo } from 'src/entity/repo.entity';
import { ReposService } from 'src/service/repo.service';

@Controller('repos')
export class ReposController {
  constructor(private readonly reposService: ReposService) {}

  @Get()
  async getRepos(): Promise<Repo[]> {
    try {
      return await this.reposService.fetchAndFilterRepos();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('list')
  async getReposList(@Query('language') language?: string): Promise<Repo[]> {
    try {
      return await this.reposService.findAll(language);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
