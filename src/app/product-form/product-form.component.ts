import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from '../shared/model/product';
import { ProductService } from '../shared/service/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  addProductForm : FormGroup | any;
  imgSize : boolean  = false;
  imgUrl: any;

  constructor(private router: Router , private productServe : ProductService) { }
  ngOnInit(): void {
    this.addProductForm = new FormGroup({
      img: new FormControl('', [Validators.required]),
      pName: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
    })
  }

  onImgChangeEve(eve: any) {
    
// && (eve.target.files[0].size / 1024) < 100
    if((eve.target.files[0].size / 1024) < 100  && eve.target.files){
      let reader = new FileReader();
      reader.readAsDataURL(eve.target.files[0]);
      reader.onload = (event : any )=>{
        this.imgUrl = event.target.result;
        this.imgSize = false;
      }
    }else{
      this.imgSize = true;
    }
    
  }
  onAddProductClick() {
    if(this.imgSize == false){
      let productObj = new Product(this.addProductForm.get('pName').value , this.addProductForm.get('price').value , this.imgUrl);
      this.productServe.updateProductList(productObj);
      this.onCloseIcon();
    }else{
      this.imgSize = true;
      this.addProductForm.reset();
    }
   }

  onCloseIcon() {
    this.router.navigate(["/product"]);
    this.addProductForm.reset();
  }
}
