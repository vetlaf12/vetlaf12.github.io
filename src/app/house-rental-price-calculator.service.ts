import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HouseRentalPriceCalculatorService {
  repaymentStartYear: number;
  paymentPeriodCompleteYear: number;
  startMonth: number;
  endMonth: number;
  outstandingLoan: number = 0;
  totalMortgageAmount: number = 0;


  constructor() {
    let date = new Date();
    this.paymentPeriodCompleteYear = 0;
    this.repaymentStartYear = date.getMonth() == 11 ? date.getFullYear() + 1 : date.getFullYear();
    this.startMonth = date.getMonth() == 11 ? 1 : date.getMonth() + 1;
    this.endMonth = this.startMonth == 1 ? 11 : this.startMonth - 1;
  }

  recalculate(
    housingPrice: number,
    monthlyRentalIncome: number,
    repaymentPeriodYears: number,
    yearlyConsumerPriceFactor: number,
    monthlyJointCosts: number,
    tvAndInternetCosts: number,
    insuranceCosts: number,
    yearlyMunicipalTaxes: number,
    loanInterest: number,
    mortgageAmount: number,
    vacancyRate: number
  ): PeriodicElement[] {
    //todo: validate input values

    this.paymentPeriodCompleteYear = this.repaymentStartYear + repaymentPeriodYears;
    let updatedPeriodValues: PeriodicElement[] = [];
    this.outstandingLoan = mortgageAmount;
    this.totalMortgageAmount = mortgageAmount;
    let houseValue = housingPrice;
    let rentalIncome = monthlyRentalIncome - (monthlyRentalIncome * vacancyRate) / 100;
    let totalTerms = repaymentPeriodYears * 12;
    let monthlyMunicipalTaxes = yearlyMunicipalTaxes / 12;
    if (repaymentPeriodYears > 0) {
      for (let year = this.repaymentStartYear; year <= this.paymentPeriodCompleteYear; year++) {
        if (year != this.repaymentStartYear) {
          houseValue = houseValue + (houseValue * yearlyConsumerPriceFactor) / 100;
          rentalIncome = rentalIncome + (rentalIncome * yearlyConsumerPriceFactor) / 100;
        }

        let monthValues = this.getMonthValues(
          year,
          monthlyJointCosts,
          tvAndInternetCosts,
          insuranceCosts,
          monthlyMunicipalTaxes,
          houseValue,
          yearlyConsumerPriceFactor,
          rentalIncome,
          loanInterest,
          totalTerms
        );

        let yearlyJointCosts = monthValues.reduce((sumJointCosts, monthValue) =>sumJointCosts + monthValue.variousExpenses, 0);
        let yearlyRentalIncome = monthValues.reduce((sumRentalIncome, monthValue) => sumRentalIncome + monthValue.rentalIncome, 0);
        let termAmount = monthValues.reduce((sumTermAmount, monthValue) => sumTermAmount + monthValue.termAmountForMonth, 0);
        let yearlyVariousExpenses = yearlyJointCosts;
        let cashFlow = yearlyRentalIncome - yearlyVariousExpenses - termAmount;
        let periodValue: PeriodicElement = {
          year: year,
          houseValue: houseValue,
          rentalIncome: yearlyRentalIncome,
          variousExpenses: yearlyVariousExpenses, //add various expences here
          expandableMonthValues: monthValues,
          cashFlow: cashFlow,
          mortgageAmount: this.outstandingLoan,
          termAmount: termAmount,
          unrealizedCapital: houseValue - this.outstandingLoan
        };

        updatedPeriodValues.push(periodValue);
      }
    }
    return updatedPeriodValues;
  }

  getMonthValues(
    year: number,
    monthlyJointCosts: number,
    tvAndInternetCosts: number,
    insuranceCosts: number,
    monthlyMunicipalTaxes: number,
    periodStartHousingValue: number,
    yearlyConsumerPriceFactor: number,
    monthlyRentalIncome: number,
    loanInterest: number,
    totalTerms: number
  ) {
    let termAmountForMonth = 0;
    let monthlyLoanInterest = loanInterest / 12;
    let loanInterestDecimal = monthlyLoanInterest / 100;
    let installment = 0;
    
    

    let monthlyConsumerPriceFactor = yearlyConsumerPriceFactor / 12;
    let monthHousingValue = periodStartHousingValue;
    let monthValues: MonthPeriodicElement[] = [];
    let months: string[] = ['Jan','Feb','Mar','Apr','Mai','Jun','Jul','Aug','Sep','Okt','Nov','Des',];
    for (let i = 0; i < months.length; i++) {
      let variousExpenses = monthlyJointCosts + tvAndInternetCosts + insuranceCosts + monthlyMunicipalTaxes;
      if ((i < this.startMonth && year == this.repaymentStartYear) || (i > this.endMonth && year == this.paymentPeriodCompleteYear)) continue;
      if (i != 0) { monthHousingValue = monthHousingValue + (monthHousingValue * monthlyConsumerPriceFactor) / 100;}

      termAmountForMonth = this.totalMortgageAmount * loanInterestDecimal * (((1 + loanInterestDecimal) ** totalTerms)/((1 + loanInterestDecimal) ** totalTerms - 1));
      let interestAmountForMonth = this.outstandingLoan * loanInterestDecimal;
      installment = termAmountForMonth - interestAmountForMonth;
      this.outstandingLoan = this.outstandingLoan - installment;
      let monthValue: MonthPeriodicElement = {
        month: months[i],
        variousExpenses: Math.floor(variousExpenses),
        housingValue: Math.floor(monthHousingValue),
        rentalIncome: Math.floor(monthlyRentalIncome),
        outstandingLoan: Math.floor(this.outstandingLoan),
        termAmountForMonth: Math.floor(termAmountForMonth),
        interestAmount: interestAmountForMonth, //renter
        installment: installment,//avdrag,
        unrealizedCapital: Math.floor(monthHousingValue - this.outstandingLoan),
        cashFlow: Math.floor(monthlyRentalIncome - termAmountForMonth - variousExpenses)
      };
      monthValues.push(monthValue);
    }
    return monthValues;
  }

  getLoanInstallmentForMonth(): number{
    return 0;
  }
}

export interface PeriodicElement {
  year: number;
  houseValue: number;
  mortgageAmount: number;
  termAmount: number;
  variousExpenses: number;
  rentalIncome: number;
  cashFlow: number;
  unrealizedCapital: number;
  expandableMonthValues: MonthPeriodicElement[];
}

export interface MonthPeriodicElement {
  month: string;
  housingValue: number;
  outstandingLoan: number;
  installment: number;
  interestAmount: number;
  variousExpenses: number;
  rentalIncome: number;
  termAmountForMonth: number;
  unrealizedCapital: number;
  cashFlow: number;
}
