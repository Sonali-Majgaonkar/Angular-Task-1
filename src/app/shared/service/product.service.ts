import { Injectable } from "@angular/core";
import { Product } from "../model/product";
import { BehaviorSubject, Subject } from "rxjs";
import { BagItem } from "../model/bagItem";


@Injectable({ providedIn: 'root' })

export class ProductService {
    private productListArr: Product[] = [
        new Product('Camera', 40000, 'https://m.media-amazon.com/images/I/81WtQ64-SOL._SX450_.jpg'),
        new Product('Smart Watch', 2000, 'https://m.media-amazon.com/images/I/61wRXG-flwL._SY450_.jpg'),
        new Product('RayBan', 2150, 'https://m.media-amazon.com/images/I/51Ytvf98X0L._UL1500_.jpg'),
        new Product('iPhone 14', 172000, 'https://m.media-amazon.com/images/I/31qeR3U2bdL._SY445_SX342_QL70_FMwebp_.jpg'),
    ]

    private bagProductListArr: BagItem[] = [];

    productListSubject = new BehaviorSubject<Product[]>(this.productListArr.slice());
    bagListSubject = new BehaviorSubject<BagItem[]>(this.bagProductListArr.slice());

    qtyCountSub = new Subject<number>();

    updateProductList(productObj : any){
        this.productListArr.push(productObj);
        return this.productListSubject.next(this.productListArr.slice());
    }

    getSelectedIndexProduct(index: number) {
        return this.productListArr.slice()[index];
    }

    addItemToBag(itemObj: any) {
        let existingObj =  this.bagProductListArr.filter((obj:BagItem) => { return obj['bagItemName'] == itemObj.bagItemName});
  
        if(existingObj.length != 0) {
            let existingObjIndex = this.bagProductListArr.indexOf(existingObj[0]);
            this.bagProductListArr[existingObjIndex]['bagItemQty'] = itemObj.bagItemQty;
            this.bagProductListArr[existingObjIndex]['bagItemTotal'] = itemObj.bagItemTotal;
            this.bagListSubject.next(this.bagProductListArr.slice());
        }
        else{
            this.bagProductListArr.push(itemObj);
            this.bagListSubject.next(this.bagProductListArr.slice());
            // console.log(this.bagProductListArr);
        }
    }

    deleteItemFromBag(indexNum: number) {
        this.bagProductListArr.splice(indexNum, 1);
        this.bagListSubject.next(this.bagProductListArr.slice());
    }
    
    // updateQtyCount(index: number, count: number) {
    //     this.bagProductListArr[index]['bagItemQty'] += count;
    //     return this.bagListSubject.next(this.bagProductListArr.slice());
    // }

}