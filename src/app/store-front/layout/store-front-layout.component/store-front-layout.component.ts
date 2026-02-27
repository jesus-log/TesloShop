import { Component } from '@angular/core';
import { RouterOutlet } from "@angular/router";
import { FrontNavbar } from "../../components/front-navbar/front-navbar";

@Component({
  selector: 'app-store-front-layout.component',
  imports: [RouterOutlet, FrontNavbar],
  templateUrl: './store-front-layout.component.html',
})
export class StoreFrontLayoutComponent { }
