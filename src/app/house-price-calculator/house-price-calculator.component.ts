import { Component } from '@angular/core';
import { InputElement } from '../input-form/input-form.component';
import {
  HouseRentalPriceCalculatorService,
  PeriodicElement,
} from '../house-rental-price-calculator.service';

@Component({
  selector: 'app-house-price-calculator',
  templateUrl: './house-price-calculator.component.html',
  styleUrls: ['./house-price-calculator.component.css'],
  providers: [HouseRentalPriceCalculatorService],
})
export class HousePriceCalculatorComponent {
  constructor(
    private houseRentalPriceCalculationService: HouseRentalPriceCalculatorService
  ) {}

  repaymentPeriod: number = 0;
  houseValue: number = 0;
  rentalIncome: number = 0;
  monthlyJointCosts: number = 0;
  tvAndInternetCosts: number = 0;
  insuranceCosts: number = 0;
  yearlyMunicipalTaxes: number = 0;
  mortgageAmount: number = 0;
  vacancyRate: number = 0;
  takeoverCosts: number = 0;
  yearlyConsumerPriceFactor = 2;
  loanInterest: number = 0;
  propertyTax: number = 0;
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
    if (typeof value.tvAndInternetCosts === 'number') {
      this.tvAndInternetCosts = value.tvAndInternetCosts;
    }
    if (typeof value.insuranceCosts === 'number') {
      this.insuranceCosts = value.insuranceCosts;
    }
    if (typeof value.yearlyMunicipalTaxes === 'number') {
      this.yearlyMunicipalTaxes = value.yearlyMunicipalTaxes;
    }
    if(typeof value.mortgageAmount === 'number') {
      this.mortgageAmount = value.mortgageAmount;
    }
    if(typeof value.loanInterest === 'number') {
      this.loanInterest = value.loanInterest;
    }
    if(typeof value.vacancyRate === 'number') {
      this.vacancyRate = value.vacancyRate;
    }
    if(typeof value.takeoverCosts === 'number') {
      this.takeoverCosts = value.takeoverCosts;
    }
    if(typeof value.propertyTax === 'number') {
      this.propertyTax = value.propertyTax;
    }
    

    this.periodValues = this.houseRentalPriceCalculationService.recalculate(
      this.houseValue,
      this.rentalIncome,
      this.repaymentPeriod,
      this.yearlyConsumerPriceFactor,
      this.monthlyJointCosts,
      this.tvAndInternetCosts,
      this.insuranceCosts,
      this.yearlyMunicipalTaxes,
      this.loanInterest,
      this.mortgageAmount,
      this.vacancyRate,
      this.takeoverCosts,
      this.propertyTax
    );
  }
}
