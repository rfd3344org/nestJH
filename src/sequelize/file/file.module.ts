import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { FileController } from './file.controller';
import { FileService } from './file.service';
import { File } from './file.model';

@Module({
  imports: [SequelizeModule.forFeature([File])],
  providers: [FileService],
  controllers: [FileController],
  exports: [FileService],
})
export class FileModule {}
