import { Component } from '@angular/core';
import { MonthPeriodicElement, PeriodicElement } from '../price-calculation-table/price-calculation-table.component';
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
  rentalIncome: number = 0;
  monthlyJointCosts: number = 0;
  yearlyConsumerPriceFactor = 2;
  periodValues: PeriodicElement[] = [];

  inputFieldsChanged(value: InputElement) {
    if (typeof value.repaymentPeriod === 'number') {
      this.repaymentPeriod = value.repaymentPeriod;
    }
    if (typeof value.houseValue === 'number') {
      this.houseValue = value.houseValue;
    }
    if (typeof value.rentalIncome === 'number') {
      this.rentalIncome = value.rentalIncome;
    }
    if (typeof value.monthlyJointCosts === 'number') {
      this.monthlyJointCosts = value.monthlyJointCosts;
    }
    this.recalculate();
  }

  recalculate() {
    //todo: validate input values
    let currentYear = new Date().getFullYear();
    let paymentPeriodCompleteYear = currentYear + this.repaymentPeriod;
    let updatedPeriodValues: PeriodicElement[] = [];

    let houseValue = this.houseValue;
    let rentalIncome = this.rentalIncome;
    if (this.repaymentPeriod > 0) {
      for (let y = currentYear; y < paymentPeriodCompleteYear; y++) {
        houseValue = houseValue + (houseValue * this.yearlyConsumerPriceFactor) / 100;
        rentalIncome = rentalIncome + (rentalIncome * this.yearlyConsumerPriceFactor) / 100;


        //monthValues:
        let monthValues = this.getMonthValues();

        let periodValue: PeriodicElement = { year: y, houseValue: houseValue, rentalIncome: rentalIncome, monthlyJointCosts: this.monthlyJointCosts, expandableMonthValues: monthValues };

        updatedPeriodValues.push(periodValue);
      }
    }

    this.periodValues = updatedPeriodValues;
  }

  getMonthValues(){
    let monthValues: MonthPeriodicElement[] = [];
    let months: string[] = ["Jan", "Feb", "Mar", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Nov", "Des"];
    for(let i = 0; i < months.length; i++){
      let monthValue: MonthPeriodicElement = {month: months[i]}
      monthValues.push(monthValue);
    }
    return monthValues;
  }
}
