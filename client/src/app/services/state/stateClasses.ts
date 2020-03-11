export class Product {
  _id: string;
  name: string;
  price: number;
  category: string;
  image_url: string;

  constructor(product: Product) {
    this._id = product._id;
    this.name = product.name;
    this.price = product.price;
    this.category = product.category;
    this.image_url = product.image_url;
  }
}
export class CartItem {
  product_id: string;
  quantity: number;
  subtotal: number;
  constructor(product: Product, quantity: number) {
    this.product_id = product._id;
    this.quantity = quantity;
    this.subtotal = this.quantity * product.price;
  }
}
export class Order {
  cart: [CartItem];
  finalPrice: number;
  requiredDeliveryDate: Date;
  orderPlacedDate: Date;
  final4CC: string;
  constructor(cart: [CartItem], requiredDeliveryDate: Date, final4CC: string) {
    this.cart = cart;
    this.requiredDeliveryDate = requiredDeliveryDate;
    this.final4CC = final4CC;
    this.orderPlacedDate = new Date();
    this.finalPrice = this.cart
      .map(item => item.subtotal)
      .reduce((sum, item) => sum + item);
  }
}
export class User {
  // admin should be pulled out to the site state
  ID: string;
  name: string;
  surname: string;
  email: string;
  city: string;
  street: string;
  cart: CartItem;
  orderHistory: [Order];
  constructor(user: User) {
    this.ID = user.ID;
    this.name = user.name;
    this.surname = user.surname;
    this.email = user.email;
    this.city = user.city;
    this.street = user.street;
    this.cart = user.cart;
    this.orderHistory = user.orderHistory;
  }
}
