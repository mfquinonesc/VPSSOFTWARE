import { Component } from '@angular/core';
import { DataModel } from 'src/app/models/data-model';
import { VehicleModel } from 'src/app/models/vehicle-model';
import { CurrencyService } from 'src/app/services/currency.service';
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

  copPrice: string = '';
  copTax: string = '';

  constructor(private vehicleService: VehicleService, private currencyService: CurrencyService) {

  }

  clear() {
    this.changeVehicle();
    this.vehicleType = 'carros';
    this.brandCode = 0;
    this.modelCode = 0;
    this.yearCode = '';
    this.vehicle = new VehicleModel();
    this.copPrice = '';
    this.copTax = '';
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
    if(this.brandArray.length > 0){
      this.brandCode = Number.parseInt(code);
      this.vehicleService.getModels(this.vehicleType, this.brandCode).subscribe({
        next: (value) => {
          this.modelArray = value.modelos ? value.modelos as DataModel[] : [];
        },
      });
    } else{
      alert('Debe seleccionar un tipo de vehículo!');
    }   
  }

  selectModel(code: string) {
    if(this.modelArray.length > 0){
      this.modelCode = Number.parseInt(code);
      this.vehicleService.getYears(this.vehicleType, this.brandCode, this.modelCode).subscribe({
        next: (value) => {
          this.yearsArray = value ? value as DataModel[] : [];
        },
      });
    }else{
      alert('Debe seleccionar una marca!');
    }   
  }

  selectYear(code: string) {
    if(this.yearsArray.length > 0){
      this.yearCode = code;
      this.vehicleService.getValues(this.vehicleType, this.brandCode, this.modelCode, this.yearCode).subscribe({
        next: (value) => {
          this.vehicle = value as VehicleModel;
        },
      });
    }else{
      alert('Debe seleccionar un modelo!');
    }    
  }

  getPrice() {
    return this.vehicle.Valor?.replace('R$', '').replace('.', '').replace(',', '.')
  }

  getCopMoney() {
    let rate = 1;
    if (this.vehicle.Valor) {
      this.currencyService.getExchange().then((response: any) => {
        rate = Number.parseFloat(response.data.COP.value);
        const price = Number.parseFloat(this.getPrice()!);
        this.copPrice = `COP ${price * rate}`;
        this.copTax = `COP ${price * rate * this.getTax()}`;
      });
    }
  }

  getTax() {
    let tax = 0.01;
    if (this.vehicle.Valor) {
      if (this.vehicle.Combustivel == 'Diesel') {
        tax = 0.025;
      }
      if (this.vehicle.Combustivel == 'Gasolina') {
        tax = 0.05
      }
    }
    return tax;
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




