import { Routes } from '@angular/router';
import { isAdminGuard } from '@auth/guards/is-admin.guard';
import { NotAuthenticatedGuard } from '@auth/guards/not-authenticated.guard';

export const routes: Routes = [



  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes'),
    canMatch: [
      //Si alguna funcion return false no se muestra esta ruta
      NotAuthenticatedGuard,
      /*       ()=>{
              console.log('Hola mundo')
            } */
    ]
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin-dashboard/admin-dashboard.route'),
    canMatch:[
      isAdminGuard
    ]
  },
  {
    path: '',
    loadChildren: () => import('./store-front/store-front.routes')
  },


];
