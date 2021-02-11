import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class CarDbApiService {
  constructor() {}

  async getAllCars() {
    try {
      const fetchReturn = await fetch("http://localhost:3000/cars").then(
        (response) => {
          return response.json();
        }
      );
      return fetchReturn;
    } catch (error) {
      console.log(error);
    }
  }

  async getCar(id: string) {
    try {
      const fetchReturn = await fetch("http://localhost:3000/car/" + id).then(
        (response) => {
          return response.json();
        }
      );
      return fetchReturn;
    } catch (error) {
      console.log(error);
    }
  }

  async newCar(car: Car) {
    try {
      const fetchReturn = await fetch("http://localhost:3000/new", {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(car),
      }).then((response) => {
        return response.status;
      });
      return fetchReturn;
    } catch (error) {
      console.log(error);
    }
  }

  async updateCar(id: string, car: Car) {
    try {
      const fetchReturn = await fetch("http://localhost:3000/update/" + id, {
        method: "PUT",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(car),
      }).then((response) => {
        return response.status;
      });
      return fetchReturn;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteCar(id: string) {
    try {
      const fetchReturn = await fetch("http://localhost:3000/delete/" + id, {
        method: "DELETE",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((response) => {
        return response.status;
      });
      return fetchReturn;
    } catch (error) {
      console.log(error);
    }
  }
}
