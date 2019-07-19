import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CarDetailsComponent } from './car-details/car-details.component';
import { CarsListComponent } from './cars-list/cars-list.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'cars-list' },
  { path: 'car-details/:id', component: CarDetailsComponent },
  { path: 'cars-list', component: CarsListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
