import { Component, computed, inject, viewChild, ElementRef } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from "@angular/router";
import { AuthService } from '@auth/services/auth.service';


@Component({
  selector: 'app-admin-dashboard-page',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './admin-dashboard-page.html',
})
export class AdminDashboardPage {

  authService = inject(AuthService);
  router = inject(Router);
  drawerToggle = viewChild.required<ElementRef>('adminDrawerToggle');

  user = computed(()=>this.authService.user()());

  closeDrawer() {
    const checkbox = this.drawerToggle().nativeElement as HTMLInputElement;
    checkbox.checked = false;
  }

  logout(){
    this.authService.logout();
    this.router.navigateByUrl('/');
  }


 }
