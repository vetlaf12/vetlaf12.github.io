import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {NgFor, NgIf} from '@angular/common';
import {MatTableModule} from '@angular/material/table';

/**
 * @title Table with expandable rows
 */
@Component({
  selector: 'app-price-calculation-table',
   templateUrl: './price-calculation-table.component.html',
   styleUrls: ['./price-calculation-table.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
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
      columnDef: 'år',
      header: 'År',
      cell: (element: PeriodicElement) => `${element.year}`,
    },
    {
      columnDef: 'boligverdi',
      header: 'Boligverdi',
      cell: (element: PeriodicElement) => `${Math.floor(element.houseValue)}`,
    },
    {
      columnDef: 'felleskostnader',
      header: 'Felleskostnader',
      cell: (element: PeriodicElement) => `${Math.floor(element.monthlyJointCosts)}`,
    },
    {
      columnDef: 'leieinntekter',
      header: 'Leieinntekter',
      cell: (element: PeriodicElement) => `${Math.floor(element.rentalIncome)}`,
    },
  ];

  columnsToDisplay = this.columns.map((c) => c.columnDef);
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement: PeriodicElement | null = null;

    
}

export interface PeriodicElement {
  year: number;
  houseValue: number;
  rentalIncome: number;
  monthlyJointCosts: number;
  expandableMonthValues: MonthPeriodicElement[];
}

export interface MonthPeriodicElement {
  month: string,
}



