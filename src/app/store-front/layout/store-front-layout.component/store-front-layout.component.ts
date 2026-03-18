import { Component } from '@angular/core';
import { RouterOutlet } from "@angular/router";
import { FrontNavbar } from "../../components/front-navbar/front-navbar";
import { Footer } from "@store-front/components/footer/footer";

@Component({
  selector: 'app-store-front-layout.component',
  imports: [RouterOutlet, FrontNavbar, Footer],
  templateUrl: './store-front-layout.component.html',
})
export class StoreFrontLayoutComponent { }
