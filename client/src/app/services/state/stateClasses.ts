export class Product {
  _id: string;
  name: string;
  price: number;
  category: string;
  image_url: string;

  constructor(product: iproduct) {
    this._id = product._id;
    this.name = product.name;
    this.price = product.price;
    this.category = product.category;
    this.image_url = product.image_url;
  }
}
export class Cart {
  creationDate: Date;
  items: CartItem[];
  constructor(items: CartItem[], date: Date = new Date()) {
    this.creationDate = date;
    this.items = items;
  }
}
export class CartItem {
  product: Product;
  quantity: number;
  subtotal: number;
  constructor(product: Product, quantity: number) {
    this.product = product;
    this.quantity = quantity;
    this.subtotal = this.quantity * product.price;
  }
}
export class Order {
  cart: Cart;
  finalPrice: number;
  requiredDeliveryDate: Date;
  orderPlacedDate: Date;
  final4CC: string;
  constructor(
    cartitems: CartItem[],
    requiredDeliveryDate: Date,
    final4CC: string,
    cartcreationDate: Date
  ) {
    this.cart = new Cart(cartitems, cartcreationDate);
    this.requiredDeliveryDate = requiredDeliveryDate;
    this.final4CC = final4CC;
    this.orderPlacedDate = new Date();
    this.finalPrice = this.cart.items
      .map(item => item.subtotal)
      .reduce((sum, item) => sum + item);
  }
}
export class User {
  ID: string;
  name: string;
  surname: string;
  email: string;
  admin: boolean;
  city: string;
  street: string;
  cart: Cart;
  orderHistory: Order[];
  constructor(user: iUser) {
    this.ID = user.ID;
    this.name = user.name;
    this.surname = user.surname;
    this.admin = user.admin;
    this.email = user.email;
    this.city = user.city;
    this.street = user.street;
    this.cart = new Cart(user.cart);
    this.orderHistory = user.orderHistory;
  }
}
export class Catagorey {
  _id: string;
  name: string;
  constructor(catagorey: Catagorey) {
    this._id = catagorey._id;
    this.name = catagorey.name;
  }
}
export interface iUser {
  ID: string;
  name: string;
  surname: string;
  admin: boolean;
  email: string;
  city: string;
  street: string;
  cart: CartItem[];
  orderHistory: Order[];
}
export interface iproduct {
  _id: string;
  name: string;
  price: number;
  category: string;
  image_url: string;
}
