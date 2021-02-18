import { Component, OnInit } from "@angular/core";
import { CarDbApiService } from "../car-db-api.service";

@Component({
  selector: "app-cover-page",
  templateUrl: "./cover-page.component.html",
  styleUrls: ["./cover-page.component.css"],
})
export class CoverPageComponent implements OnInit {
  constructor(private carDbApiService: CarDbApiService) {}

  marke = "Mercedes";

  ngOnInit() {
    console.log("CoverPageInit");
  }

  async initDB() {
    await this.carDbApiService.initDB();
  }
}
