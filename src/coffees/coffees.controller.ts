import { Controller, Get, Param } from '@nestjs/common';

@Controller('coffees')
export class CoffeesController {
  @Get()
  findAll(): string {
    return 'I am returning all strings of coffees';
  }

  @Get(':id')
  findOne(@Param('id') id: string): string {
    return `I am returning this coffe: ${id}`;
  }
}
