import { Component, Input, EventEmitter, Output } from '@angular/core';

export interface InputElement {
  houseValue: number;
  mortgageAmount: number;
  repaymentPeriod?: number;
  loanInterest: number;
  monthlyJointCosts: number;
  rentalIncome: number;
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

  getCurrentInputFields(): InputElement {
    let inputElement: InputElement = {
      houseValue: this.houseValue,
      mortgageAmount: this.mortgageAmount,
      loanInterest: this.loanInterest,
      monthlyJointCosts: this.monthlyJointCosts,
      rentalIncome: this.rentalIncome,
      repaymentPeriod: this.repaymentPeriod,
    };
    return inputElement;
  }
}
