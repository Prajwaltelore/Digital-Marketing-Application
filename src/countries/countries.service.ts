import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Countries } from 'src/entities/countries.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CountriesService {
  constructor(
    @InjectRepository(Countries)
    private countriesRepository: Repository<Countries>,
  ) {}

  async create(name: string) {
    const details = await this.countriesRepository.findOneBy({ name: name });
    if (details) {
      throw new ConflictException('Country already exists');
    }
    return await this.countriesRepository.save({ name });
  }

  async update(name: string, id: any) {
    const Id = await this.countriesRepository.findOneBy({ id: id });
    if (!Id) {
      throw new ConflictException(`Country doesn't exists`);
    }
    return await this.countriesRepository.update(name, id);
  }

  async findCountries() {
    return await this.countriesRepository.find();
  }

  async findById(id: any) {
    return await this.countriesRepository.findOneBy(id);
  }

  async deleteCountries(id: any) {
    return await this.countriesRepository.delete(id);
  }
}
