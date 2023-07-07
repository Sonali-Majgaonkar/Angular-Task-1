import { Component } from '@angular/core';
import { ProductService } from '../shared/service/product.service';

@Component({
  selector: 'app-count-controller',
  templateUrl: './count-controller.component.html',
  styleUrls: ['./count-controller.component.css']
})
export class CountControllerComponent {
  quntityCount : number = 1; 
  
  constructor(private productServe : ProductService){}
  
  onBtnClick(event : any){
    event.target.className === 'fa fa-plus' || event.target.id == 'plus' ? ++this.quntityCount : this.quntityCount--
    this.productServe.qtyCountSub.next(this.quntityCount);
}
}
