import { Module } from '@nestjs/common'

import { PrismaService } from 'src/libs/prisma.service'

import { PostController } from './post.controller'

@Module({
  imports: [],
  controllers: [PostController],
  providers: [PrismaService],
})
export class PostModule { }
