interface IModel {
    create(input: Object): Promise<any>
    update(conditions: any, update: Object): Promise<any>
    find(input: Object): Promise<any>
    findOne(input: Object): Promise<any>
    findById(input: Object): Promise<any>
    remove(input: Object): Promise<any>
}

export default class Model implements IModel {
  Schema: any;

  constructor(Schema) {
    this.Schema = Schema;
  }

  create(input): Promise<any> {
    const schema = new this.Schema(input);
    return schema.save();
  }

  update(conditions, update): Promise<any> {
    return this.Schema
    .update(conditions, update, { new: true })
    .exec();
  }

  find(query): Promise<any> {
    return this.Schema
    .find(query)
    .exec();
  }

  findOne(query): Promise<any> {
    return this.Schema
    .findOne(query)
    .exec();
  }

  findById(id): Promise<any> {
    return this.Schema
    .findById(id)
    .exec();
  }

  remove(id): Promise<any> {
    return this.Schema
    .findByIdAndRemove(id)
    .exec();
  }
}