import {
  Body,
  Controller,
  Post,
  Get,
  ParseUUIDPipe,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { GasolineService } from './gasoline.service';
import { CreateGasolineDto } from './dto/create-gasoline.dto';
import { UpdateGasolineDto } from './dto/update-gasoline.dto';

@Controller('gasoline')
export class GasolineController {
  constructor(private readonly gasolineService: GasolineService) {}

  @Post()
  create(@Body() createGasolineDto: CreateGasolineDto) {
    return this.gasolineService.create(createGasolineDto);
  }

  @Get()
  findAll() {
    return this.gasolineService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.gasolineService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateGasolineDto: UpdateGasolineDto,
  ) {
    return this.gasolineService.update(id, updateGasolineDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.gasolineService.remove(id);
  }
}
