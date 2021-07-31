import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { compare } from 'bcryptjs';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const userExists = await this.userRepository.findOne({
      email: createUserDto.email,
    });

    if (userExists) {
      throw new UnprocessableEntityException('Email address already in use!');
    }

    const user = this.userRepository.create(createUserDto);

    await this.userRepository.save(user);

    delete user.password;

    return user;
  }

  async findAll() {
    const users = await this.userRepository.find();

    return users.length
      ? users.map((user) => {
          delete user.password;

          return user;
        })
      : users;
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOne({ id });

    if (!user) {
      throw new NotFoundException('User does not exists!');
    }

    delete user.password;

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    if (updateUserDto.email) {
      throw new UnprocessableEntityException("Email can't be changed!");
    }

    if (updateUserDto.password) {
      throw new UnprocessableEntityException(
        "Password can't be changed through this resource!",
      );
    }

    const userExists = await this.userRepository.findOne({ id });

    if (!userExists) {
      throw new NotFoundException('User does not exists!');
    }

    const user = this.userRepository.create({
      ...userExists,
      ...updateUserDto,
    });

    await this.userRepository.update(id, user);

    delete user.password;

    return user;
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
