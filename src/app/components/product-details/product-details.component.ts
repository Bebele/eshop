import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../services/product.service";
import {ActivatedRoute} from "@angular/router";
import {Product} from "../../common/product";
import {CartItem} from "../../common/cart-item";

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  // @ts-ignore
  public product;

  constructor(private productService: ProductService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(() => this.productDetailPage());
  }

  productDetailPage() {
    const hasProductId: boolean = this.route.snapshot.paramMap.has('id');
    if (hasProductId) {
      // @ts-ignore
      this.productService.listProductDetailPage(+this.route.snapshot.paramMap.get('id')).subscribe(data => {
          console.log(data);
          this.product = data;
        }
      );
    }
  }

  addToCart(product: Product) {
    const cartItem = new CartItem(product);
    // @ts-ignore
    this.cartService.addToCart(cartItem);
  }
}
