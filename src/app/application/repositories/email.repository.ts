import { Injectable } from '@nestjs/common';
import { Email } from '../entities/email';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class EmailRepository {
  constructor(
    @InjectRepository(Email)
    private readonly repository: Repository<Email>,
  ) {}

  async create(dto: Email): Promise<Email> {
    const email = this.repository.create(dto);
    return await this.repository.save(email);
  }

  async findById(id: string): Promise<Email | null> {
    return await this.repository.findOne({ where: { id } });
  }

  async findAll(): Promise<Email[]> {
    return await this.repository.find();
  }

  async deleteById(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
