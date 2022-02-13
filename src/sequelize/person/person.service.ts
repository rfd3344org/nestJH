import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Person, Book } from './person.model';
import { CreatePersonDto } from './person.dto';

@Injectable()
export class PersonService {
  constructor(
    @InjectModel(Person)
    private personModel: typeof Person,
  ) {}

  async all(): Promise<Person[]> {
    return await this.personModel.findAll({
      // include: [{ model: Book, association: 'authorId' }],
      include: [{all: true}]
    });
  }

  async create(model: any): Promise<any> {
    return await this.personModel.create(model, { include: [{ all: true }] });
  }

  async update(model: any): Promise<any> {
    return await this.personModel.upsert(model);
  }

  async delete(id: string): Promise<any> {
    return await this.personModel.destroy({ where: { id } });
  }
}
