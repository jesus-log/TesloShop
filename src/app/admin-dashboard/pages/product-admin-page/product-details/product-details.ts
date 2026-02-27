import { Component, inject, input, OnInit, signal } from '@angular/core';
import { Product } from '@products/interfaces/product.interface';
import { ProductCarrusel } from "@products/components/product-carrusel/product-carrusel";
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from '@utils/utils';
import { FormErrorLabel } from "@shared/components/pagination/form-error-label/form-error-label";
import { ProductsService } from '@products/services/products.service';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'product-details',
  imports: [ProductCarrusel, ReactiveFormsModule, FormErrorLabel],
  templateUrl: './product-details.html',
})
export class ProductDetails implements OnInit {

  fb = inject(FormBuilder);

  productService = inject(ProductsService);
  wasSaved = signal(false);
  router = inject(Router);
  product = input.required<Product>();

  sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];


  productForm = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    slug: ['', [Validators.required, Validators.pattern(FormUtils.slugPattern)]],
    price: [0, [Validators.required, Validators.min(0)]],
    stock: [0, [Validators.required, Validators.min(0)]],
    sizes: [['']],
    images: [[]],
    gender: ['men', [Validators.required, Validators.pattern(/men|women|kid|unisex/)]],
    tags: ['']
  });

  ngOnInit(): void {
    this.setFormValue(this.product());
  }

  onSizeClicked(size: string) {
    const currentSizes = this.productForm.value.sizes ?? [];

    if (currentSizes.includes(size)) {
      currentSizes.splice(currentSizes.indexOf(size), 1)
    } else {
      currentSizes.push(size)
    }

    this.productForm.patchValue({ sizes: currentSizes })
  }

  async onSubmit() {
    const isValid = this.productForm.valid;
    this.productForm.markAllAsTouched();
    if (!isValid) return;

    const formValue = this.productForm.value;
    const productLike: Partial<Product> = {
      ...(formValue as any),
      tags: formValue.tags?.toLowerCase().split(',').map(tag => tag.trim() ?? [])
    };



    if (this.product().id == 'new') {
      const product = await firstValueFrom(this.productService.createProduct(productLike))

        this.router.navigate(['/admin/products',product.id]);


    } else {
      await firstValueFrom(this.productService.updateProducts(this.product().id, productLike));
    }

    this.wasSaved.set(true);
    console.log(this.wasSaved())
    setTimeout(()=>{
      this.wasSaved.set(false)},3000
    )

  }

  setFormValue(formLike: Partial<Product>) {
    this.productForm.reset(this.product() as any);
    //this.productForm.patchValue(formLike as any)
    this.productForm.patchValue({ tags: formLike.tags?.join(',') })
  }

}
