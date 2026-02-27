import { Component, inject, signal } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { Options, ProductsService } from '@products/services/products.service';
import { ActivatedRoute } from '@angular/router';
import { ProductCard } from "@products/components/product-card/product-card";
import { map, switchMap } from 'rxjs';
import { Product } from '../../../product/interfaces/product.interface';
import { TitleCasePipe } from '@angular/common';
import { PaginationService } from '@shared/components/pagination/pagination.service';
import { Pagination } from "@shared/components/pagination/pagination";

@Component({
  selector: 'app-gender-page',
  imports: [ProductCard, TitleCasePipe, Pagination],
  templateUrl: './gender-page.html',
})
export class GenderPage {

  productsService = inject(ProductsService);
  activatedRoute = inject(ActivatedRoute);
  products = signal<Product[]>([]);
  paginationService = inject(PaginationService)

  /*   productsResource = this.activatedRoute.params.pipe(
      switchMap((res) => {
        const params: Options = {
          limit: undefined,
          offset: undefined,
          gender: res['gender']
        }
        return this.productsService.getProducts(params);
      })
    ).subscribe((res) => {
      this.products.set(res.products);
    }) */



  //Otra solucion para este caso
  gender = toSignal(this.activatedRoute.params.pipe(map(({ gender }) => {
    return gender
  })))
  productsResource = rxResource({
    params: () => ({ gender: this.gender(),page:this.paginationService.currentPage() - 1 }),
    stream: ({ params }) => {
      return this.productsService.getProducts(
        {
          limit: undefined,
          offset: params.page * 9,
          gender: params.gender,


        }
      );
    }
  })


}
