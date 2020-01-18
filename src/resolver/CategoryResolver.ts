import {
  Resolver, Query, Arg, ID, Mutation, FieldResolver,
} from 'type-graphql';
import { getCustomRepository } from 'typeorm';
import CategoryRepository from '../repository/CategoryRepository';
import Category from '../entity/Category';
import AddCategoryInput from '../input/AddCategoryInput';

@Resolver(() => Category)
export default class CategoryResolver {
  categoryRepository: CategoryRepository;

  constructor() {
    this.categoryRepository = getCustomRepository(CategoryRepository);
  }

  @Query(() => [Category])
  async allCategories() {
    return this.categoryRepository.find();
  }

  @Query(() => [Category])
  async categories(@Arg('ids', () => [ID]) ids: string[]) {
    return this.categoryRepository.findByIds(ids);
  }

  @Query(() => Category)
  async category(@Arg('id', () => ID) id: string) {
    return this.categoryRepository.findOne(id);
  }

  @Mutation(() => Category)
  async addCategory(
    @Arg('categoryInput', () => AddCategoryInput) categoryInput: AddCategoryInput,
  ) {
    const category = this.categoryRepository.create(categoryInput);
    return this.categoryRepository.save(category);
  }

  @Mutation(() => Category)
  async removeCategory(@Arg('id', () => ID) id: string) {
    return this.categoryRepository.delete(id);
  }
}
