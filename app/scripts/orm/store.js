import App from '../main';
import jQuery from 'jquery';    

export default class Store {
  static find(model, id) {
    return new Promise((resolve, reject) => {
      let app = App.get();
      if (app.cache.hasOwnProperty(model)) {
        resolve(app.cache[model].filter((obj) => { return obj.id === id; })[0]);
      } else {
        reject(new Error("data not found"));
      }         
    });
  }
}
