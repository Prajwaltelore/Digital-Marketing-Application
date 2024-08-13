import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { PackagesService } from './packages.service';
import { UsersPackage } from './dtos/createPackage';
import { UsersUpdatePackage } from './dtos/updatePackage';

@Controller('packages')
export class PackagesController {
  constructor(private packageService: PackagesService) {}

  @Post()
  createPackage(@Body() packages: UsersPackage) {
    return this.packageService.createPackages(packages);
  }

  @Put(':id')
  update(@Body() packages: UsersUpdatePackage, id: number) {
    return this.packageService.updatePackages(packages, id);
  }

  @Get()
  getPackage() {
    return this.packageService.findPackage();
  }

  @Get(':id')
  getById(id: number) {
    return this.packageService.findById(id);
  }

  @Delete(':id')
  deletePackage(id: number) {
    return this.packageService.deletePackage(id);
  }
}
