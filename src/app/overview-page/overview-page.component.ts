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
    this.AllCars = await this.carDbApiService.getAllCars();
  }
}
