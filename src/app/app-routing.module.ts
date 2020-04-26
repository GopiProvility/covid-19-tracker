import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {CountryComponent} from './components/country/country.component';


const routes: Routes = [
  { path: '',   redirectTo: '/home', pathMatch: 'full' }, // redirect to
  {path: 'home' , component: HomeComponent},
  {path: 'countries' , component: CountryComponent}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
