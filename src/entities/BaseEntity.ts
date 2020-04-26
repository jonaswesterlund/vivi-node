import { v4 } from 'uuid';
import { PrimaryKey, Property } from 'mikro-orm';

export abstract class BaseEntity {
  @PrimaryKey()
  uuid = v4();

  @Property()
  createdAt = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt = new Date();
}
