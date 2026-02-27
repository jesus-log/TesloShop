
import { HttpClient } from '@angular/common/http';
import { Gender, Product, ProductsResponse } from './../interfaces/product.interface';
import { inject, Injectable } from '@angular/core';
import { Observable, of, switchMap, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '@auth/interfaces/user.interface';

const baseUrl = environment.baseUrl;

export interface Options {
  limit?: number,
  offset?: number,
  gender?: string,

}

@Injectable({ providedIn: 'root' })
export class ProductsService {

  private http = inject(HttpClient);

  private productsCache = new Map<string,ProductsResponse>();
  private productCache = new Map<string,Product>();

   emptyProduct:Product = {
    id: 'new',
    title: '',
    price: 0,
    description: '',
    slug: '',
    stock: 0,
    sizes: [],
    gender: Gender.Men,
    tags: [],
    images: [],
    user: {} as User
  }

  getProducts(options: Options): Observable<ProductsResponse> {
    //Destructuracion de options y si no viene le pone valores por defecto
    const { limit = 9, offset = 0, gender = '' } = options;

    const key = `${limit}-${offset}-${gender}`;

    if(this.productsCache.has(key)){
      return of (this.productsCache.get(key)!)
    }

    return this.http.get<ProductsResponse>(`${baseUrl}/products`,
      {
        params: {
          limit,
          offset,
          gender
        }
      }
    ).pipe(
      //tap((resp) => console.log(resp)),
      tap((resp) => this.productsCache.set(key,resp)),


    )
  }

  getProductByIdSlug(id: string): Observable<Product> {

    if(id == 'new'){
      return of(this.emptyProduct);
    }

    if(this.productCache.has(id)){
      return of(this.productCache.get(id)!)
    }

    return this.http.get<Product>(`${baseUrl}/products/${id}`).pipe(
      //tap((resp) => console.log(resp)),
      tap((resp) => this.productCache.set(id,resp))
    )
  }

  getProductsById(id:string){

    if(id == 'new'){
      return of(this.emptyProduct);
    }

     if(this.productCache.has(id)){
      return of(this.productCache.get(id)!)
    }

    return this.http.get<Product>(`${baseUrl}/products/${id}`).pipe(
      //tap((resp) => console.log(resp)),
      tap((resp) => this.productCache.set(id,resp))
    )
  }

  updateProducts(id:string,productLike: Partial<Product>):Observable<Product>{
    console.log('Actualizando producto');
    return this.http.patch<Product>(`${baseUrl}/products/${id}`,productLike).pipe(
      tap(product =>{
        this.updateProductCache(product);
      })
    )
  }

  updateProductCache(product:Product){
    const productId = product.id;

    this.productCache.set(productId,product);

    this.productsCache.forEach(productsResponse =>{
      productsResponse.products = productsResponse.products.map((currentProduct)=>{
        return currentProduct.id == productId ? product : currentProduct;
      })
    })
    console.log('cache actualizado');
  }


  createProduct(productLike:Partial<Product>):Observable<Product>{
    return this.http.post<Product>(`${baseUrl}/products`,productLike).pipe(
      tap(product =>{
        this.updateProductCache(product);
      })
    );

  }

}
