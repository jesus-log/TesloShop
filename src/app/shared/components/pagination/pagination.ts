import { Component, computed, inject, input, linkedSignal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-pagination',
  imports: [RouterLink],
  templateUrl: './pagination.html',
})
export class Pagination {

  private router = inject(Router);

  currentPage = input<number>(1);
  pages = input(0);

  activePage = linkedSignal<number>(this.currentPage);

  isAdminSection = computed(() => this.router.url.startsWith('/admin'));

  getPagesList = computed( ()=>{
    return Array.from({length:this.pages()},(_,i)=> i+1);
  })

}
