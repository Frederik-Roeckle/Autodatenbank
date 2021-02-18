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
  public DisplayedCars: Array<Object>;

  async ngOnInit() {
    this.getAllCars();
  }

  async getAllCars() {
    this.AllCars = await this.carDbApiService.getAllCars();
    this.DisplayedCars = this.AllCars;
  }

  async deleteCar(carId: string) {
    console.log("Delete Car");
    await this.carDbApiService.deleteCar(carId);
    this.getAllCars();
  }

  async filterCarList() {
    console.log(
      "Filter Cars with FilterWord: " +
        (<HTMLInputElement>document.getElementById("searchBox")).value
    );
    const filterWord: string = (<HTMLInputElement>(
      document.getElementById("searchBox")
    )).value
      .toString()
      .toLowerCase();

    const filterWordArray = filterWord.split(" ");
    this.DisplayedCars = [];
    var exitsInCollection: boolean = false;
    var matchedAllKeywords: boolean = false;
    this.AllCars.forEach((car) => {
      for (var i = 0; i < filterWordArray.length; i++) {
        if (
          (<Car>car).marke
            .toString()
            .toLowerCase()
            .includes(filterWordArray[i]) ||
          (<Car>car).modell
            .toString()
            .toLowerCase()
            .includes(filterWordArray[i])
        ) {
          matchedAllKeywords = true;
        } else {
          matchedAllKeywords = false;
          break;
        }
      }
      if (matchedAllKeywords == true) {
        this.DisplayedCars.push(car);
      }
    });
  }
}
