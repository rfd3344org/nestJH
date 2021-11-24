import { Module } from '@nestjs/common';
import { FileController } from './file.controller';
@Module({
  imports: [
    // FileController,
  ],
  // providers: [UserService],
  controllers: [FileController],
  // exports: [UserService],
})
export class FileModule {}
