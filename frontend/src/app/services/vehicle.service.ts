import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  path: string = 'https://parallelum.com.br/fipe/api/v1';

  constructor(private http: HttpClient) { }

  getBrands(type: string): Observable<any> {
    return this.http.get(`${this.path}/${type}/marcas`);
  }

  getModels(type: string, brandCode: number): Observable<any> {
    return this.http.get(`${this.path}/${type}/marcas/${brandCode}/modelos`);
  }

  getYears(type: string, brandCode: number, modelCode: number): Observable<any> {
    return this.http.get(`${this.path}/${type}/marcas/${brandCode}/modelos/${modelCode}/anos`);
  }

  getValues(type: string, brandCode: number, modelCode: number, yearCode: string): Observable<any> {
    return this.http.get(`${this.path}/${type}/marcas/${brandCode}/modelos/${modelCode}/anos/${yearCode}`);
  }


}
