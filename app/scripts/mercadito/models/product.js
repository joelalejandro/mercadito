import Model from '../../orm/model';

export default class Product extends Model {
  constructor(id) {
    super(id, 'product');
    this.title = null;
    this.currency = null;
    this.price = null;
    this.maxQuantityPerOrder = null;
    this.description = null;
    this.seller = null;
    this.stock = null;
    this.paymentOptions = [];
    this.images = [];
    this.questions = [];
    this.related = [];
  }
}
