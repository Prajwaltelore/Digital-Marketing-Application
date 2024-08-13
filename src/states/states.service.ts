import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { States } from 'src/entities/states.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StatesService {
  constructor(
    @InjectRepository(States) private statesRepository: Repository<States>,
  ) {}

  async create(name: string) {
    const details = await this.statesRepository.findOneBy({ name: name });
    if (details) {
      throw new ConflictException('Country already exists');
    }
    return await this.statesRepository.save({ name });
  }

  async update(name: string, id: any) {
    const Id = await this.statesRepository.findOneBy({ id: id });
    if (!Id) {
      throw new ConflictException(`Country doesn't exists`);
    }
    return await this.statesRepository.update(name, id);
  }

  async findStates() {
    return await this.statesRepository.find();
  }

  async findById(id: any) {
    return await this.statesRepository.findOneBy(id);
  }

  async deleteStates(id: any) {
    return await this.statesRepository.delete(id);
  }
}
