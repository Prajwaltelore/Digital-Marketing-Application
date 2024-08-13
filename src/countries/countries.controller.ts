import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { CountriesService } from './countries.service';

@Controller('countries')
export class CountriesController {
  constructor(private countriesService: CountriesService) {}

  @Post()
  createCities(@Body() name: string) {
    return this.countriesService.create(name);
  }

  @Get()
  getCities() {
    return this.countriesService.findCountries();
  }

  @Get(':id')
  getById(id: any) {
    return this.countriesService.findById(id);
  }

  @Put(':id')
  update(@Body() name: string, id: any) {
    return this.countriesService.update(name, id);
  }

  @Delete(':id')
  deleteById(id: any) {
    return this.countriesService.deleteCountries(id);
  }
}
