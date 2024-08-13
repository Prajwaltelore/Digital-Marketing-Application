import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { CitiesService } from './cities.service';

@Controller('cities')
export class CitiesController {
  constructor(private citiesService: CitiesService) {}

  @Post()
  createCities(@Body() name: string) {
    return this.citiesService.create(name);
  }

  @Get()
  getCities() {
    return this.citiesService.findCities();
  }

  @Get(':id')
  getById(id: any) {
    return this.citiesService.findById(id);
  }

  @Put(':id')
  update(@Body() name: string, id: any) {
    return this.citiesService.update(name, id);
  }

  @Delete(':id')
  deleteById(id: any) {
    return this.citiesService.deleteCities(id);
  }
}
