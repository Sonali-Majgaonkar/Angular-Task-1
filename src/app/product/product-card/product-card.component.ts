import { Component } from '@angular/core';
import { BagItem } from 'src/app/shared/model/bagItem';
import { Product } from 'src/app/shared/model/product';
import { ProductService } from 'src/app/shared/service/product.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  productList: any;
  qtyCount: number = 1;
  selectedCardProduct: any;
  tableItem: any;

  constructor(private productServe: ProductService) {

    this.productServe.productListSubject.subscribe(item => {
      this.productList = item
    })

    this.productServe.qtyCountSub.subscribe((count: number) => {
      this.qtyCount = count
    })

    this.productServe.bagListSubject.subscribe((bagList: any) => {
      this.tableItem = bagList;
    })
  }

  onAddToBagClick(index: number, event: any) {

    this.selectedCardProduct = this.productServe.getSelectedIndexProduct(+index);
    
    let bagItemObj: BagItem = new BagItem(this.selectedCardProduct.productName, this.qtyCount, this.selectedCardProduct.productPrice, (this.selectedCardProduct.productPrice * this.qtyCount));
    this.productServe.addItemToBag(bagItemObj);

    this.productServe.qtyCountSub.next(1);

    }
}
