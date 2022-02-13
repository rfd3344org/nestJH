import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Person } from './person.model';
import { CreatePersonDto } from './person.dto';

@Injectable()
export class PersonService {
  constructor(
    @InjectModel(Person)
    private personModel: typeof Person,
  ) {}

  async all(): Promise<Person[]> {
    return await this.personModel.findAll({
      include: [Person],
    });
  }

  async create(model: any): Promise<any> {
    return await this.personModel.create(model);
  }

  async update(model: any): Promise<any> {
    return await this.personModel.upsert(model);
  }

  async delete(id: string): Promise<any> {
    return await this.personModel.destroy({ where: { id } });
  }
}
