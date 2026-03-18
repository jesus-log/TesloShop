import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '@auth/services/auth.service';

@Component({
  selector: 'front-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './front-navbar.html',
})
export class FrontNavbar {
     authService = inject(AuthService);
     router = inject(Router);


  closeDropdown(dropdown: HTMLElement) {
    window.setTimeout(() => {
      const focusedInsideDropdown = dropdown.querySelector(':focus') as HTMLElement | null;
      focusedInsideDropdown?.blur();

      const activeElement = document.activeElement;
      if (activeElement instanceof HTMLElement && dropdown.contains(activeElement)) {
        activeElement.blur();
      }

      dropdown.classList.remove('dropdown-open');
    });
  }
 }
