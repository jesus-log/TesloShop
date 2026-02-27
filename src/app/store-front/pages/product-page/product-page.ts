import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { rxResource } from '@angular/core/rxjs-interop';
import { ProductsService } from '@products/services/products.service';
import { switchMap } from 'rxjs/operators';
import { ProductCarrusel } from "@products/components/product-carrusel/product-carrusel";

@Component({
  selector: 'app-product-page',
  imports: [ProductCarrusel],
  templateUrl: './product-page.html',
})
export class ProductPage {

  productsService  = inject(ProductsService);
  activatedRoute = inject(ActivatedRoute);

  productIdSlug = this.activatedRoute.snapshot.params['idSlug'];

  productResponse = rxResource({
    stream: () => {
      return this.productsService.getProductByIdSlug(this.productIdSlug);
    }
  });

 }
