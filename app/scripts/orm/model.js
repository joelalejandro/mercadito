import Store from './store';

export default class Model {
  constructor(id, typename) {
    this.id = id;
    this.typeName = typename;
  }
  
  load() {
    return Store.find(this.typeName, this.id);
  }
}
