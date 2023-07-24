import { Component } from '@angular/core';
import { PeriodicElement } from '../price-calculation-table/price-calculation-table.component';
import { InputElement } from '../input-form/input-form.component';
// import { IChangeEvent } from '../input-form/input-form.component';

@Component({
  selector: 'app-house-price-calculator',
  templateUrl: './house-price-calculator.component.html',
  styleUrls: ['./house-price-calculator.component.css'],
})
export class HousePriceCalculatorComponent {
  repaymentPeriod: number = 0;
  houseValue: number = 0;
  yearlyConsumerPriceFactor = 2;
  periodValues: PeriodicElement[] = [];

  inputFieldsChanged(value: InputElement) {
    if (typeof value.repaymentPeriod === 'number') {
      this.repaymentPeriod = value.repaymentPeriod;
    }
    if (typeof value.houseValue === 'number') {
      this.houseValue = value.houseValue;
    }
    this.recalculate();
  }

  recalculate() {
    //todo: validate input values
    let currentYear = new Date().getFullYear();
    let paymentPeriodCompleteYear = currentYear + this.repaymentPeriod;
    let updatedPeriodValues: PeriodicElement[] = [];

    let houseValue = this.houseValue;
    if (this.repaymentPeriod > 0) {
      for (let y = currentYear; y < paymentPeriodCompleteYear; y++) {
        houseValue =
          houseValue + (houseValue * this.yearlyConsumerPriceFactor) / 100;
        let periodValue: PeriodicElement = { year: y, houseValue: houseValue };
        updatedPeriodValues.push(periodValue);
      }
    }

    this.periodValues = updatedPeriodValues;
  }
}
