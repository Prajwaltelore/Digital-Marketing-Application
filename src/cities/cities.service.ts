import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cities } from 'src/entities/cities.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CitiesService {
  constructor(
    @InjectRepository(Cities) private citiesRepository: Repository<Cities>,
  ) {}

  async create(name: string) {
    const details = await this.citiesRepository.findOneBy({ name: name });
    if (details) {
      throw new ConflictException('City already exists');
    }
    return await this.citiesRepository.save({ name });
  }

  async update(name: string, id: any) {
    const Id = await this.citiesRepository.findOneBy({ id: id });
    if (!Id) {
      throw new ConflictException(`City doesn't exists`);
    }
    return await this.citiesRepository.update(name, id);
  }

  async findCities() {
    return await this.citiesRepository.find();
  }

  async findById(id: any) {
    return await this.citiesRepository.findOneBy(id);
  }

  async deleteCities(id: any) {
    return await this.citiesRepository.delete(id);
  }
}
