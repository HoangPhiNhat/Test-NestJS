import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { ReposModule } from './module/repo.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '2712',
      database: 'github_repos',
      entities: [__dirname + '/**/*.entity.js'],
      synchronize: true,
    }),
    HttpModule,
    ReposModule,
  ],
})
export class AppModule {}
