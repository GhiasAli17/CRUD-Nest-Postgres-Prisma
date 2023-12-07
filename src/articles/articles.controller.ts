import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ArticleEntity } from './entities/article.entity';

@ApiTags("Articles")
@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @ApiCreatedResponse({type:ArticleEntity})
  @Post()
  create(@Body() createArticleDto: CreateArticleDto) {
    return this.articlesService.create(createArticleDto);
  }

  @Get()
  @ApiOkResponse({type:ArticleEntity,isArray:true})
  findAll() {
    return this.articlesService.findAll();
  }

  @Get('drafts')
  @ApiOkResponse({type:ArticleEntity,isArray:true})
  getDrafts(){
    return this.articlesService.getDrafts()
  }

  @ApiOkResponse({type:ArticleEntity})
  @Get(':id')
 async findOne(@Param('id') id: string) {
    const article = await this.articlesService.findOne(+id);

  if (!article) {
    throw new NotFoundException(`Could not find article with ${id}.`);
  }
  return article;
  }

  @ApiOkResponse({type:ArticleEntity})
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateArticleDto: UpdateArticleDto) {
    return this.articlesService.update(+id, updateArticleDto);
  }

  @ApiOkResponse({type:ArticleEntity})
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.articlesService.remove(+id);
  }
}