import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/shared/service/product.service';

@Component({
  selector: 'app-product-bag',
  templateUrl: './product-bag.component.html',
  styleUrls: ['./product-bag.component.css']
})
export class ProductBagComponent implements OnInit {
  tableBagItem : any;
  constructor(private productServe : ProductService){}
  ngOnInit(): void {
    this.productServe.bagListSubject.subscribe(item =>{
      this.tableBagItem = item;
    })
    console.log(this.tableBagItem);
    
  }
  onCancelBtnClick( index : any ){
    this.productServe.deleteItemFromBag(+index);
  }
}
