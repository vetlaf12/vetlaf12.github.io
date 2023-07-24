import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NgFor } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

export interface PeriodicElement {
  year: number;
  houseValue: number;
}

@Component({
  selector: 'app-price-calculation-table',
  templateUrl: './price-calculation-table.component.html',
  styleUrls: ['./price-calculation-table.component.css'],
})
export class PriceCalculationTableComponent implements OnChanges {
  @Input() periodValues: PeriodicElement[] = [];
  ngOnChanges(changes: SimpleChanges) {
    this.dataSource = this.periodValues;
  }

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
  ];
  dataSource = this.periodValues;

  displayedColumns = this.columns.map((c) => c.columnDef);
}
