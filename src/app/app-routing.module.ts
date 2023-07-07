import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './product/product.component';
import { HeaderComponent } from './header/header.component';
import { ProductFormComponent } from './product-form/product-form.component';


const routes: Routes = [
  {path : '' , component : ProductComponent, pathMatch : 'full' },
  {path : 'product' , component : ProductComponent },
  {path: 'add-product' , component : ProductFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
