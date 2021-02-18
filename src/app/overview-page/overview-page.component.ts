import { Component, OnInit } from "@angular/core";
import { CarDbApiService } from "../car-db-api.service";

@Component({
  selector: "app-overview-page",
  templateUrl: "./overview-page.component.html",
  styleUrls: ["./overview-page.component.css"],
})
export class OverviewPageComponent implements OnInit {
  constructor(private carDbApiService: CarDbApiService) {}

  public AllCars: Array<Object>;
  public Car: Object = [];

  async ngOnInit() {
    this.getAllCars();
  }

  async getAllCars() {
    this.AllCars = await this.carDbApiService.getAllCars();
  }

  async deleteCar(carId: string) {
    console.log("Delete Car");
    await this.carDbApiService.deleteCar(carId);
    this.getAllCars();
  }
}
