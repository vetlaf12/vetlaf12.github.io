import { Component, Input, EventEmitter, Output } from '@angular/core';

export interface InputElement {
  houseValue: number;
  mortgageAmount: number;
  repaymentPeriod?: number;
  loanInterest: number;
  monthlyJointCosts: number;
  rentalIncome: number;
  tvAndInternetCosts: number;
  insuranceCosts: number;
  yearlyMunicipalTaxes: number;
  vacancyRate: number;
}

@Component({
  selector: 'app-input-form',
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.css'],
})
export class InputFormComponent {
  houseValue: number = 0;
  mortgageAmount: number = 0;
  repaymentPeriod: number = 0;
  loanInterest: number = 0;
  tvAndInternetCosts: number = 0;
  insuranceCosts: number = 0;
  yearlyMunicipalTaxes: number = 0;
  vacancyRate: number = 0;
  monthlyJointCosts: number = 0;
  rentalIncome: number = 0;

  @Output() change = new EventEmitter<InputElement>();

  repaymentPeriodChanged(target: EventTarget | null) {
    this.repaymentPeriod = Number((target as HTMLInputElement).value);
    let inputElement: InputElement = this.getCurrentInputFields();
    this.change.emit(inputElement);
  }

  houseValueChanged(target: EventTarget | null) {
    this.houseValue = Number((target as HTMLInputElement).value);
    let inputElement: InputElement = this.getCurrentInputFields();
    this.change.emit(inputElement);
  }

  monthlyJointCostsChanged(target: EventTarget | null){
    this.monthlyJointCosts = Number((target as HTMLInputElement).value);
    let inputElement: InputElement = this.getCurrentInputFields();
    this.change.emit(inputElement);
  }

  rentalIncomeChanged(target: EventTarget | null){
    this.rentalIncome = Number((target as HTMLInputElement).value);
    let inputElement: InputElement = this.getCurrentInputFields();
    this.change.emit(inputElement);
  }

  mortgageAmountChanged(target: EventTarget | null){
    this.mortgageAmount = Number((target as HTMLInputElement).value);
    let inputElement: InputElement = this.getCurrentInputFields();
    this.change.emit(inputElement);
  }

  loanInterestChanged(target: EventTarget | null){
    this.loanInterest = Number((target as HTMLInputElement).value);
    let inputElement: InputElement = this.getCurrentInputFields();
    this.change.emit(inputElement);
  }

  tvAndInternetCostsChanged(target: EventTarget | null){
    this.tvAndInternetCosts = Number((target as HTMLInputElement).value);
    let inputElement: InputElement = this.getCurrentInputFields();
    this.change.emit(inputElement);
  }

  insuranceCostsChanged(target: EventTarget | null){
    this.insuranceCosts = Number((target as HTMLInputElement).value);
    let inputElement: InputElement = this.getCurrentInputFields();
    this.change.emit(inputElement);
  }

  yearlyMunicipalTaxesChanged(target: EventTarget | null){
    this.yearlyMunicipalTaxes = Number((target as HTMLInputElement).value);
    let inputElement: InputElement = this.getCurrentInputFields();
    this.change.emit(inputElement);
  }

  vacancyRateChanged(target: EventTarget | null){
    this.vacancyRate = Number((target as HTMLInputElement).value);
    let inputElement: InputElement = this.getCurrentInputFields();
    this.change.emit(inputElement);
  }
  

  getCurrentInputFields(): InputElement {
    let inputElement: InputElement = {
      houseValue: this.houseValue,
      mortgageAmount: this.mortgageAmount,
      loanInterest: this.loanInterest,
      monthlyJointCosts: this.monthlyJointCosts,
      rentalIncome: this.rentalIncome,
      repaymentPeriod: this.repaymentPeriod,
      tvAndInternetCosts: this.tvAndInternetCosts,
      insuranceCosts: this.insuranceCosts,
      yearlyMunicipalTaxes: this.yearlyMunicipalTaxes,
      vacancyRate: this.vacancyRate
    };
    return inputElement;
  }
}
