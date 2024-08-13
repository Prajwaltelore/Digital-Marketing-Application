import { Dependencies, Injectable } from '@nestjs/common';
import { InjectRepository, getRepositoryToken } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { createUserParams } from './user.params';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create(userDetails: createUserParams, password: string) {
    const email = userDetails.email;
    const user = await this.userRepository.findOneBy({ email: email });

    if (user) {
      return {
        status: false,
        message: 'User already present',
        data: null,
      };
    }

    userDetails.password = password;
    let result = await this.userRepository.save(userDetails);
    if (result) {
      return {
        status: true,
        message: 'User registered succesfully',
        data: result,
      };
    } else {
      return {
        status: false,
        message: 'User not registered',
        data: null,
      };
    }
  }

  async findOne(email: string) {
    return await this.userRepository.findOneBy({ email: email });
  }

  async getById(id: number) {
    return await this.userRepository.findOneBy({ id: id });
  }

  async getUser() {
    return await this.userRepository.find();
  }

  async update(userDetails: createUserParams, id: any) {
    return await this.userRepository.update(userDetails, id);
  }

  async delete(id: number) {
    return await this.userRepository.delete(id);
  }
}
