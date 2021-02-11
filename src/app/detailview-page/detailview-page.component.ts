import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { CarDbApiService } from "../car-db-api.service";

@Component({
  selector: "app-detailview-page",
  templateUrl: "./detailview-page.component.html",
  styleUrls: ["./detailview-page.component.css"],
})
export class DetailviewPageComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private carDbApiService: CarDbApiService
  ) {}

  carId: string;
  car: Car;

  async ngOnInit() {
    this.carId = this.route.snapshot.paramMap.get("id");
    console.log(this.carId);
    this.car = await this.carDbApiService.getCar(this.carId);
    console.log(this.car);
  }
}
