import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { StatesService } from './states.service';

@Controller('states')
export class StatesController {
  constructor(private statesService: StatesService) {}

  @Post()
  createCities(@Body() name: string) {
    return this.statesService.create(name);
  }

  @Get()
  getCities() {
    return this.statesService.findStates();
  }

  @Get(':id')
  getById(id: any) {
    return this.statesService.findById(id);
  }

  @Put(':id')
  update(@Body() name: string, id: any) {
    return this.statesService.update(name, id);
  }

  @Delete(':id')
  deleteById(id: any) {
    return this.statesService.deleteStates(id);
  }
}
