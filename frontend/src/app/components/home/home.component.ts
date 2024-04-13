import { Component } from '@angular/core';
import { DataModel } from 'src/app/models/data-model';
import { VehicleModel } from 'src/app/models/vehicle-model';
import { VehicleService } from 'src/app/services/vehicle.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  brandArray: DataModel[] = [];
  modelArray: DataModel[] = [];
  yearsArray: DataModel[] = [];
  vehicle: VehicleModel = new VehicleModel();
  vehicleType: string = 'carros';
  brandCode: number = 0;
  modelCode: number = 0;
  yearCode: string = '';

  constructor(private vehicleService: VehicleService) {

  }

  changeVehicle() {
    this.brandArray = [];
    this.modelArray = [];
    this.yearsArray = [];
  }
  changeBrand() {
    this.modelArray = [];
    this.yearsArray = [];
  }

  selectVehicle() {
    this.vehicleService.getBrands(this.vehicleType).subscribe({
      next: (value) => {
        this.brandArray = value ? value as DataModel[] : [];
      },
    });
  }

  selectBrand(code: string) {
    this.brandCode = Number.parseInt(code);
    this.vehicleService.getModels(this.vehicleType, this.brandCode).subscribe({
      next: (value) => {
        this.modelArray = value.modelos ? value.modelos as DataModel[] : [];
      },
    });
  }

  selectModel(code: string) {
    this.modelCode = Number.parseInt(code);
    this.vehicleService.getYears(this.vehicleType, this.brandCode, this.modelCode).subscribe({
      next: (value) => {
        this.yearsArray = value ? value as DataModel[] : [];
      },
    });
  }

  selectYear(code: string) {
    this.yearCode = code;
    this.vehicleService.getValues(this.vehicleType, this.brandCode, this.modelCode, this.yearCode).subscribe({
      next: (value) => {
        this.vehicle = value as VehicleModel;
      },
    });
  }

  getPrice() {
    return this.vehicle.Valor?.replace('R$', '').replace('.', '').replace(',', '.')
  }

  getTaxInfo() {
    if (this.vehicle.Valor) {
      const price = Number.parseFloat(this.getPrice()!);
      let info = '1%';
      let tax = 0.01;
      if (this.vehicle.Combustivel == 'Diesel') {
        tax = 0.025;
        info = '2.5%';
      }
      if (this.vehicle.Combustivel == 'Gasolina') {
        tax = 0.05
        info = '5%';
      }
      return `R$ ${info} ${price * tax}`;
    } else {
      return '';
    }
  }

}




