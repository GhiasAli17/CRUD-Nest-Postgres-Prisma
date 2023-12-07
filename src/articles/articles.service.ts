import { Injectable, NotFoundException, UseFilters } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClientExceptionFilter } from 'src/prisma-client-exception/prisma-client-exception.filter';

@Injectable()
@UseFilters(PrismaClientExceptionFilter)  
export class ArticlesService {
  constructor(private prisma: PrismaService){

  }
  create(createArticleDto: CreateArticleDto) {
    return this.prisma.article.create({data:createArticleDto});
  }

  findAll() {
    return this.prisma.article.findMany({where:{published:true}});
  }

  getDrafts(){
    return this.prisma.article.findMany({where:{published:false}})
  }

  findOne(id: number) {
    return this.prisma.article.findUnique({where:{id}});
  }

  async update(id: number, updateArticleDto: UpdateArticleDto) {
    const article = await this.prisma.article.findUnique({where:{id}})
    if(!article){
      throw new NotFoundException(`article not found with id${id}`)
    }
    return this.prisma.article.update({where:{id},data:updateArticleDto});
  }

  remove(id: number) {
    return this.prisma.article.delete({where:{id}});
  }
}
