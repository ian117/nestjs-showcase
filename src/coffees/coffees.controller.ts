import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';

@Controller('coffees')
export class CoffeesController {
  @Get()
  findAll(@Query() query): string {
    const { limit, offset } = query;
    return `I am returning all strings of coffees, with pagination: ${limit} <&&> ${offset}`;
  }

  @Get(':id')
  findOne(@Param('id') id: string): string {
    return `I am returning this coffe: ${id}`;
  }

  @Post()
  @HttpCode(HttpStatus.GONE)
  create(@Body() body) {
    return body;
  }

  @Patch(':id')
  update(@Param('id') id, @Body() body) {
    return `${id} fue actualizado con ${body}`;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id) {
    return `${id} fue borrado`;
  }
}
