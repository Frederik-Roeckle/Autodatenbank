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
    private carDbApiService: CarDbApiService,
    private router: Router
  ) {}

  carId: string;
  car: Car;

  async ngOnInit() {
    this.carId = this.route.snapshot.paramMap.get("id");
    console.log(this.carId);
    this.car = await this.carDbApiService.getCar(this.carId);
    console.log(this.car);
    this.setEditable(true);
  }

  async deleteThisCar() {
    await this.carDbApiService.deleteCar(this.carId);
    this.router.navigateByUrl("/OverviewPage");
  }

  async setEditable(zustand: boolean) {
    const inputFields = document.getElementsByClassName("form-control");
    for (var i = 0; i < inputFields.length; i++) {
      (<HTMLInputElement>inputFields[i]).disabled = !zustand;
    }
  }

  async editThisCar() {
    try {
      const safeFallbackCar = this.car;
      const updatedCar: Car = {
        marke: (<HTMLInputElement>document.getElementById("marke")).value,
        modell: (<HTMLInputElement>document.getElementById("modell")).value,
        beschleunigung: parseInt(
          (<HTMLInputElement>document.getElementById("beschleunigung")).value
        ),
        breite: parseInt(
          (<HTMLInputElement>document.getElementById("breite")).value
        ),
        co2AusstossNEFZ: parseInt(
          (<HTMLInputElement>document.getElementById("co2AusstossNEFZ")).value
        ),
        grundpreis: parseInt(
          (<HTMLInputElement>document.getElementById("grundpreis")).value
        ),
        hubraum: parseInt(
          (<HTMLInputElement>document.getElementById("hubraum")).value
        ),
        maxGeschwindigkeit: parseInt(
          (<HTMLInputElement>document.getElementById("maxGeschwindigkeit"))
            .value
        ),
        hoehe: parseInt(
          (<HTMLInputElement>document.getElementById("hoehe")).value
        ),
        leistungPS: parseInt(
          (<HTMLInputElement>document.getElementById("leistungPS")).value
        ),
        motorArt: (<HTMLInputElement>document.getElementById("motorArt")).value,
        schadStoffKlasse: (<HTMLInputElement>(
          document.getElementById("schadStoffKlasse")
        )).value,
        sitzAnzahl: parseInt(
          (<HTMLInputElement>document.getElementById("sitzAnzahl")).value
        ),
        zulGesamtGewicht: parseInt(
          (<HTMLInputElement>document.getElementById("zulGesamtGewicht")).value
        ),
        verbrauchGesamtNEFZ: parseInt(
          (<HTMLInputElement>document.getElementById("verbrauchGesamtNEFZ"))
            .value
        ),
        verbrauchInnerortsNEFZ: parseInt(
          (<HTMLInputElement>document.getElementById("verbrauchInnerortsNEFZ"))
            .value
        ),
        verbrauchAusserortsNEFZ: parseInt(
          (<HTMLInputElement>document.getElementById("verbrauchAusserortsNEFZ"))
            .value
        ),
        wltpSehrSchnell: parseInt(
          (<HTMLInputElement>document.getElementById("wltpSehrSchnell")).value
        ),
        wltpSchnell: parseInt(
          (<HTMLInputElement>document.getElementById("wltpSchnell")).value
        ),
        wltpLangsam: parseInt(
          (<HTMLInputElement>document.getElementById("wltpLangsam")).value
        ),
        wltpKombiniert: parseInt(
          (<HTMLInputElement>document.getElementById("wltpKombiniert")).value
        ),
        hsn: (<HTMLInputElement>document.getElementById("hsn")).value,
        tsn: (<HTMLInputElement>document.getElementById("tsn")).value,
        erstZulassung: new Date(
          (<HTMLInputElement>(
            document.getElementById("erstZulassung")
          )).value.toString()
        ),
        fahrzeugKlasse: (<HTMLInputElement>(
          document.getElementById("fahrzeugKlasse")
        )).value,
        aufbauArt: (<HTMLInputElement>document.getElementById("aufbauArt"))
          .value,
        bezeichnungFahrzeugKlasseAufbau: (<HTMLInputElement>(
          document.getElementById("bezeichnungFahrzeugKlasseAufbau")
        )).value,
      };
      await this.carDbApiService.updateCar(this.carId, updatedCar);
      this.router.navigateByUrl("/OverviewPage");
    } catch (error) {
      console.log("Error occur!");
    }
  }
}
