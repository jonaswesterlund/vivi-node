import {
  Property,
  Entity,
  OneToMany,
  Collection,
} from '@mikro-orm/core';
import { BaseEntity } from './BaseEntity';
import { Question } from '.';

@Entity()
export class Sequence extends BaseEntity {
  @Property()
  name: string;

  @OneToMany(
    () => Question,
    question => question.sequence
  )
  questions = new Collection<Question>(this);

  constructor(name: string) {
    super();
    this.name = name;
  }
}
