import { SlicePipe } from '@angular/common';
import { Product } from './../../interfaces/product.interface';
import { Component, input } from '@angular/core';
import { RouterLink } from "@angular/router";
import { ProductImagePipe } from '@products/pipes/product-image';

@Component({
  selector: 'product-card',
  imports: [RouterLink,SlicePipe,ProductImagePipe],
  templateUrl: './product-card.html',
})
export class ProductCard {

  product = input.required<Product>();

 }
