import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { Repo } from 'src/entity/repo.entity';
import { ReposController } from 'src/controller/repo.controller';
import { ReposService } from 'src/service/repo.service';
@Module({
  imports: [TypeOrmModule.forFeature([Repo]), HttpModule],
  controllers: [ReposController],
  providers: [ReposService],
})
export class ReposModule {}
