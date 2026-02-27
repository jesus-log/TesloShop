import { Routes } from '@angular/router';

import { ProductsAdminPage } from './pages/products-admin-page/products-admin-page';
import { ProductAdminPage } from './pages/product-admin-page/product-admin-page';
import { AdminDashboardPage } from './layouts/admin-dashboard-page/admin-dashboard-page';

export const adminDashboardRoutes: Routes = [
  {
    path:'',
    component: AdminDashboardPage,
    children:[
      {
        path:'products',
        component:ProductsAdminPage
      },
      {
        path:'products/:id',
        component:ProductAdminPage
      },
      {
        path:'**',
        redirectTo:'products'
      },


    ]

  }
]

export default adminDashboardRoutes;
