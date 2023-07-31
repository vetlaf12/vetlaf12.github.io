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
    loanInterest: number,
    mortgageAmount: number
  ): PeriodicElement[] {
    //todo: validate input values

    this.paymentPeriodCompleteYear = this.repaymentStartYear + repaymentPeriodYears;
    let updatedPeriodValues: PeriodicElement[] = [];
    this.outstandingLoan = mortgageAmount;
    let houseValue = housingPrice;
    let rentalIncome = monthlyRentalIncome;
    let totalTerms = repaymentPeriodYears * 12;
    if (repaymentPeriodYears > 0) {
      for (let year = this.repaymentStartYear; year <= this.paymentPeriodCompleteYear; year++) {
        if (year != this.repaymentStartYear) {
          houseValue = houseValue + (houseValue * yearlyConsumerPriceFactor) / 100;
          rentalIncome = rentalIncome + (rentalIncome * yearlyConsumerPriceFactor) / 100;
        }

        let monthValues = this.getMonthValues(
          year,
          monthlyJointCosts,
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
          termAmount: termAmount
        };

        updatedPeriodValues.push(periodValue);
      }
    }
    return updatedPeriodValues;
  }

  getMonthValues(
    year: number,
    monthlyJointCosts: number,
    periodStartHousingValue: number,
    yearlyConsumerPriceFactor: number,
    monthlyRentalIncome: number,
    loanInterest: number,
    totalTerms: number
  ) {
    let termAmountForMonth = 0;
    let monthlyLoanInterest = loanInterest / 12;
    let loanInterestDecimal = monthlyLoanInterest / 100;
    let interestAmountForMonth = 0;
    let outstandingLoan = this.outstandingLoan;
    let installment = 0;
    
    

    let monthlyConsumerPriceFactor = yearlyConsumerPriceFactor / 12;
    let monthHousingValue = periodStartHousingValue;
    let monthValues: MonthPeriodicElement[] = [];
    let months: string[] = ['Jan','Feb','Mar','Apr','Mai','Jun','Jul','Aug','Sep','Okt','Nov','Des',];
    for (let i = 0; i < months.length; i++) {
      let variousExpenses = monthlyJointCosts;
      console.log('this.endMonth: ',this.endMonth);
      console.log('this.paymentPeriodCompleteYear', this.paymentPeriodCompleteYear);
      if ((i < this.startMonth && year == this.repaymentStartYear) || (i > this.endMonth && year == this.paymentPeriodCompleteYear)) continue;
      if (i != 0) { monthHousingValue = monthHousingValue + (monthHousingValue * monthlyConsumerPriceFactor) / 100;}

      termAmountForMonth = outstandingLoan * loanInterestDecimal * (((1 + loanInterestDecimal) ** totalTerms)/((1 + loanInterestDecimal) ** totalTerms - 1));

      let monthValue: MonthPeriodicElement = {
        month: months[i],
        variousExpenses: variousExpenses,
        housingValue: Math.floor(monthHousingValue),
        rentalIncome: Math.floor(monthlyRentalIncome),
        outstandingLoan: Math.floor(outstandingLoan),
        termAmountForMonth: Math.floor(termAmountForMonth),
        interestAmount: interestAmountForMonth, //renter
        installment: installment//avdrag
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
}
