import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { ImportUsersDto } from './dto/import-users.dto';
import { PaginationDto } from './dto/pagination.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAll(pagination: PaginationDto = { page: 1, limit: 10 }) {
    const { page, limit } = pagination;
    const skip = (page! - 1) * limit!;

    const [data, total] = await this.usersRepository.findAndCount({
      order: { createdAt: 'DESC' },
      skip,
      take: limit,
    });

    return {
      data,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit!),
        hasNext: page! < Math.ceil(total / limit!),
        hasPrevious: page! > 1,
      },
    };
  }

  async importUsers(dto: ImportUsersDto) {
    const users = dto.rows.map((row) =>
      this.usersRepository.create({
        name: row.name,
        email: row.email,
        phone: row.phone,
        city: row.city,
        companyPosition: row.companyPosition,
        onERMIS: row.onERMIS || 'No',
        contactPerson: row.contactPerson,
        previousCourses: row.previousCourses,
        notifications: row.notifications,
      }),
    );

    return this.usersRepository.save(users);
  }

  async clearAll() {
    return this.usersRepository.clear();
  }
}
