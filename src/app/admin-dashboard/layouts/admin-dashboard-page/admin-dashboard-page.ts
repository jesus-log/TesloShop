import { Component, computed, inject } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from "@angular/router";
import { AuthService } from '@auth/services/auth.service';


@Component({
  selector: 'app-admin-dashboard-page',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './admin-dashboard-page.html',
})
export class AdminDashboardPage {

  authService = inject(AuthService);

  user = computed(()=>this.authService.user()());


 }
