import { Property, Entity, ManyToMany, Collection } from '@mikro-orm/core';
import { BaseEntity } from './BaseEntity';
import { Question } from '.';

@Entity()
export class Category extends BaseEntity {
  @Property()
  name: string;

  @ManyToMany(
    () => Question,
    question => question.categories
  )
  questions: Collection<Question> = new Collection<Question>(this);

  constructor(name: string) {
    super();
    this.name = name;
  }
}
