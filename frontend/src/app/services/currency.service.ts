import { Injectable } from '@angular/core';
import currencyapi from '@everapi/currencyapi-js';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  constructor() { }

  getExchange(): any {
    const client = new currencyapi('cur_live_ELsHWbrSDYuX9WI5s0KakXgya0XtpZDXUjcGbINS');
    return client.latest({
      base_currency: 'BRL',
      currencies: 'COP'
    });
    // client.latest({
    //   base_currency: 'BRL',
    //   currencies: 'COP'
    // }).then((response: any) => {
    //   const value = response.data.COP.value;
    //   //console.log(value);
    //   return value;
    // });
  }
}
