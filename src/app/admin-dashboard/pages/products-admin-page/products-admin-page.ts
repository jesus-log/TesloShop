import { Component, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ProductsTable } from "@products/components/products-table/products-table";
import { ProductsService } from '@products/services/products.service';
import { PaginationService } from '@shared/components/pagination/pagination.service';
import { Pagination } from "@shared/components/pagination/pagination";
import { HttpEvent } from '@angular/common/http';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-products-admin-page',
  imports: [ProductsTable, Pagination, RouterLink],
  templateUrl: './products-admin-page.html',
})
export class ProductsAdminPage {
   productsService = inject(ProductsService);
   paginationService = inject(PaginationService);

   productPerPage = signal(10);

   onChangeSelect(event:any){
    this.productPerPage.set(event.target.value);
   }

   productsResource = rxResource({
     params: ()=>({page:this.paginationService.currentPage()-1,limit:this.productPerPage()}),
     stream: ({params}) => {
       return this.productsService.getProducts({
         offset:params.page*params.limit,
         limit:params.limit
       });
     }
   })

 }
