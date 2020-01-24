import {
  Resolver, Query, Arg, Mutation, FieldResolver, Root,
} from 'type-graphql';
import { getCustomRepository } from 'typeorm';
import CategoryRepository from '../repository/CategoryRepository';
import Category from '../entity/Category';
import AddCategoryInput from '../input/AddCategoryInput';
import Question from '../entity/Question';
import QuestionRepository from '../repository/QuestionRepository';

@Resolver(() => Category)
export default class CategoryResolver {
  categoryRepository: CategoryRepository;

  questionRepository: QuestionRepository;

  constructor() {
    this.categoryRepository = getCustomRepository(CategoryRepository);
    this.questionRepository = getCustomRepository(QuestionRepository);
  }

  @Query(() => [Category])
  async allCategories() {
    return this.categoryRepository.find();
  }

  @Mutation(() => Category)
  async addCategory(
    @Arg('categoryInput', () => AddCategoryInput) categoryInput: AddCategoryInput,
  ) {
    const category = this.categoryRepository.create(categoryInput);
    return this.categoryRepository.save(category);
  }

  @FieldResolver(() => [Question])
  async questions(@Root() category: Category) {
    const loadedCategory = await this.categoryRepository.findOne(category.id, { relations: ['questions'] }) as Category;
    return loadedCategory.questions;
  }
}
