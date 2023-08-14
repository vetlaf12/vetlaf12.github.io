import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { PeriodicElement } from '../house-rental-price-calculator.service';

@Component({
  selector: 'app-price-calculation-table',
  templateUrl: './price-calculation-table.component.html',
  styleUrls: ['./price-calculation-table.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class PriceCalculationTableComponent implements OnChanges {
  @Input() periodValues: PeriodicElement[] = [];
  ngOnChanges(changes: SimpleChanges) {
    this.dataSource = this.periodValues;
  }

  dataSource = this.periodValues;

  columns = [
    {
      columnDef: 'year',
      header: 'År',
      cell: (element: PeriodicElement) => `${element.year}`,
    },
    {
      columnDef: 'houseValue',
      header: 'Boligverdi',
      cell: (element: PeriodicElement) => `${Math.floor(element.houseValue)}`,
    },
    {
      columnDef: 'mortgageAmount',
      header: 'Gjeld',
      cell: (element: PeriodicElement) => `${Math.floor(element.mortgageAmount)}`,
    },
    {
      columnDef: 'termAmount',
      header: 'Terminbeløp',
      cell: (element: PeriodicElement) => `${Math.floor(element.termAmount)}`,
    },
    {
      columnDef: 'installment',
      header: 'Avdrag',
      cell: (element: PeriodicElement) => `${Math.floor(element.installment)}`,
    },
    {
      columnDef: 'interestAmount',
      header: 'Renter',
      cell: (element: PeriodicElement) => `${Math.floor(element.interestAmount)}`,
    },
    {
      columnDef: 'taxDeduction',
      header: 'Fradrag skatt',
      cell: (element: PeriodicElement) => `${Math.floor(element.taxDeduction)}`,
    },
    {
      columnDef: 'variousExpenses',
      header: 'Kostnader',
      cell: (element: PeriodicElement) => `${Math.floor(element.variousExpenses)}`,
    },
    {
      columnDef: 'rentalincome',
      header: 'Leieinntekter',
      cell: (element: PeriodicElement) => `${Math.floor(element.rentalIncome)}`,
    },
    {
      columnDef: 'tax',
      header: 'Skatt',
      cell: (element: PeriodicElement) => `${Math.floor(element.tax)}`,
    },
    {
      columnDef: 'cashflow',
      header: 'Kontantstrøm',
      cell: (element: PeriodicElement) => `${Math.floor(element.cashFlow)}`,
    },
    {
      columnDef: 'netProfit',
      header: 'Netto fortjeneste',
      cell: (element: PeriodicElement) => `${Math.floor(element.netProfit)}`,
    },
    {
      columnDef: 'unrealizedCapital',
      header: 'Urealisert kapital',
      cell: (element: PeriodicElement) => `${Math.floor(element.unrealizedCapital)}`,
    },
    {
      columnDef: 'netYield',
      header: 'Netto Yield',
      cell: (element: PeriodicElement) => `${Math.floor(element.netYield)}`,
    },
  ];

  columnsToDisplay = this.columns.map((c) => c.columnDef);
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement: PeriodicElement | null = null;
}
