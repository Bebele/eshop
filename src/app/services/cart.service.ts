import {Injectable} from '@angular/core';
import {CartItem} from "../common/cart-item";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartItems: CartItem[] = [];
  totalPrice: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number> = new Subject<number>();

  constructor() {
  }

  addToCart(cartItem: CartItem) {
    let existingCartItem: CartItem;
    let alreadyExistingInCart = false;
    if (this.cartItems.length > 0) {
      for (let i of this.cartItems) {
        if (cartItem.id === i.id) {
          existingCartItem = i;
          break;
        }
      }
    }
    // @ts-ignore
    alreadyExistingInCart = (existingCartItem !== undefined);
    if (alreadyExistingInCart) {
      // @ts-ignore
      existingCartItem.quantity++;
    } else {
      this.cartItems.push(cartItem);
    }
    this.calculateTotals();
  }

  decrementQuantity(cartItem: CartItem) {
    // @ts-ignore
    cartItem.quantity = cartItem.quantity - 1;
    // cartItem.quantity--;
    // @ts-ignore
    if (cartItem.quantity == 0) {
      this.remove(cartItem);
    } else {
      this.calculateTotals();
    }
  }

  calculateTotals() {
    let totalPriceValue = 0;
    let totalQuantityValue = 0;
    for (let i of this.cartItems) {
      // @ts-ignore
      totalPriceValue += i.quantity * i.unitPrice;
      // @ts-ignore
      totalQuantityValue += i.quantity;
    }
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);
  }

  remove(cartItem: CartItem) {
    const index = this.cartItems.findIndex(tempCartItem => tempCartItem.id == cartItem.id);
    if (index > -1) {
      this.cartItems.splice(index, 1);
      this.calculateTotals();
    }
  }
}
