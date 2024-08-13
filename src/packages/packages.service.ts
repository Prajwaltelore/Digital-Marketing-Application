import { ConflictException, Injectable } from '@nestjs/common';
import { UsersPackage } from './dtos/createPackage';
import { InjectRepository } from '@nestjs/typeorm';
import { Packages } from 'src/entities/packages.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PackagesService {
  constructor(
    @InjectRepository(Packages) private packageRepository: Repository<Packages>,
  ) {}

  async createPackages(packagedetails: UsersPackage) {
    const package_name = packagedetails.package_name;
    const user = await this.packageRepository.findOneBy({
      package_name: package_name,
    });

    if (user) {
      return {
        status: false,
        message: 'Package already present',
        data: null,
      };
    }

    const result = await this.packageRepository.save(packagedetails);
    if (result) {
      return {
        status: true,
        message: 'Package details saved',
        data: result,
      };
    }
  }

  async updatePackages(packagedetails: UsersPackage, id: any) {
    const Id = this.packageRepository.findOneBy({ id: id });
    if (!Id) {
      return {
        status: false,
        message: 'Package not present',
        data: null,
      };
    }

    const result = await this.packageRepository.update(packagedetails, id);
    if (result) {
      return {
        status: true,
        message: 'Package details updated',
        data: result,
      };
    } else {
      return {
        status: false,
        message: 'Package details not updated',
        data: null,
      };
    }
  }

  async findPackage() {
    const result = await this.packageRepository.find();
    if (result) {
      return {
        status: true,
        message: 'Package details found',
        data: result,
      };
    } else {
      return {
        status: false,
        message: 'Package details not found',
        data: null,
      };
    }
  }

  async findById(id: number) {
    const result = await this.packageRepository.findOneBy({ id: id });
    if (result) {
      return result;
    } else {
      return null;
    }
  }

  async deletePackage(id: any) {
    const result = await this.packageRepository.delete({ id: id });
    if (result) {
      return {
        status: true,
        message: 'Package details deleted',
        data: result,
      };
    } else {
      return {
        status: false,
        message: 'Package details not deleted',
        data: null,
      };
    }
  }
}
