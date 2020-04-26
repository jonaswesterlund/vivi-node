import { Property, Entity, ManyToMany, Collection } from 'mikro-orm';
import { BaseEntity } from './BaseEntity';
import { Question } from '.';

@Entity()
export class Category extends BaseEntity {
  @Property()
  name: string;

  @ManyToMany()
  questions: Collection<Question> = new Collection<Question>(this);

  constructor(name: string) {
    super();
    this.name = name;
  }
}
