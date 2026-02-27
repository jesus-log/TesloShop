import { CurrencyPipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '@products/interfaces/product.interface';
import { ProductImagePipe } from "@products/pipes/product-image";

@Component({
  selector: 'products-table',
  imports: [ProductImagePipe, RouterLink, CurrencyPipe],
  templateUrl: './products-table.html',
})
export class ProductsTable {

  products = input.required<Product[]|undefined>();

 }
