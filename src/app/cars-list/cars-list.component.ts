import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { RestApiService } from "../shared/rest-api.service";
import { Cars } from "../shared/cars";

@Component({
  selector: 'app-cars-list',
  templateUrl: './cars-list.component.html',
  styleUrls: ['./cars-list.component.scss']
})
export class CarsListComponent implements OnInit {
  cars: Cars[];
  newCars: any = [];
  shouldDisplay: boolean = true;
  carsObservable : Observable<any>;

  constructor(public restApi: RestApiService) { }

  ngOnInit() {
    this.loadCars();
  }

  loadCars() {
    return this.restApi.getCars()
      .subscribe((allCars: Cars[]) => {
        allCars.forEach((car, i) => {
          this.restApi.getCar(car.id).subscribe((carDetails) => {
            if (car.id === carDetails.id) {
              this.newCars[i] = {...carDetails, ...car};
            }

            if (allCars.length === this.newCars.length) {
              this.shouldDisplay = false;
            } else {
              this.shouldDisplay = true;
            }
          })
        });
      });
  }
}
