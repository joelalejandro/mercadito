import Product from './mercadito/models/product';

export default class App {
  constructor() {
    this.apiUrl = '/api';
    this.cache = {
      product: [
        {
          "id": 1,
          "title": "iPad Mini Appel 16 Gb Wifi Led 7.9",
          "description": "",
          "currency": {
            "id": "ARS",
            "name": "Pesos argentinos",
            "shortName": "pesos",
            "symbol": "$",
            "format": "{symbol}{value}"
          },
          "price": 4799.99,
          "maxQuantityPerOrder": 4,
          "stock": 50,
          "paymentOptions": [1, 3, 6, 12, 18],
          "images": [],
          "questions": [
            {
              "id": 1,
              "question": "Do you have this one in white?",
              "user": {
                "id": 1,
                "name": "BUYER"
              },
              "datePosted": "2016-04-26T18:20:30-0300",
              "answer": "No, I don't. I only have it in black.",
              "dateAnswered": "2016-04-26T19:11:45-0300"
            }
          ],
          "related": [],
          "seller": {
            "id": 1,
            "name": "SELLER"
          }
        },
        {
          "id": 2,
          "title": "(2) iPad Mini Appel 16 Gb Wifi Led 7.9",
          "description": "",
          "currency": {
            "id": "ARS",
            "name": "Pesos argentinos",
            "shortName": "pesos",
            "symbol": "$",
            "format": "{symbol}{value}"
          },
          "price": 4799.99,
          "maxQuantityPerOrder": 4,
          "stock": 50,
          "paymentOptions": [1, 3, 6, 12, 18],
          "images": [],
          "questions": [
            {
              "id": 1,
              "question": "Do you have this one in white?",
              "user": {
                "id": 1,
                "name": "BUYER"
              },
              "datePosted": "2016-04-26T18:20:30-0300",
              "answer": "No, I don't. I only have it in black.",
              "dateAnswered": "2016-04-26T19:11:45-0300"
            }
          ],
          "related": [],
          "seller": {
            "id": 1,
            "name": "SELLER"
          }
        }  
      ]
    };
  }
  
  static get() {
    return new App();
  }
}

new Product(1).load().then(function(data) {
  console.log(data);
});
