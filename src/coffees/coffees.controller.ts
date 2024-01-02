import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query,
    UseGuards,
} from '@nestjs/common';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dyo/pagination-query.dyo';
import { ApiKeyGuard } from 'src/common/guards/api-key.guard';
import { Public } from 'src/common/decorators/public.decorator';
import {
    ApiForbiddenResponse,
    ApiOkResponse,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';

@ApiTags('Coffees')
@Controller('coffees')
export class CoffeesController {
    constructor(private readonly coffeesService: CoffeesService) {}

    @ApiForbiddenResponse({ status: 403, description: 'Forbidden if not key' })
    @UseGuards(ApiKeyGuard)
    @Public()
    @Get()
    findAll(@Query() paginationQueryDto: PaginationQueryDto) {
        return this.coffeesService.findAll(paginationQueryDto);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.coffeesService.findOne(id);
    }

    @ApiResponse({ status: 201, description: 'Coffee Creation' })
    @Post()
    create(@Body() createCoffeeDto: CreateCoffeeDto) {
        return this.coffeesService.create(createCoffeeDto);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateCoffeeDto: UpdateCoffeeDto) {
        return this.coffeesService.update(id, updateCoffeeDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.coffeesService.remove(id);
    }
}
