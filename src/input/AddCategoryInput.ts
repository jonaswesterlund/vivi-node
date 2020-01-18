import { InputType, Field } from 'type-graphql';
import Category from '../entity/Category';

@InputType()
export default class AddCategoryInput implements Partial<Category> {
  @Field({ nullable: true })
  name!: string;
}
