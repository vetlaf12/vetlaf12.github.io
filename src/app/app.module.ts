import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InputFormComponent } from './input-form/input-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { NgFor } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { PriceCalculationTableComponent } from './price-calculation-table/price-calculation-table.component';
import { HousePriceCalculatorComponent } from './house-price-calculator/house-price-calculator.component';

@NgModule({
  declarations: [
    AppComponent,
    InputFormComponent,
    PriceCalculationTableComponent,
    HousePriceCalculatorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatTableModule,
    NgFor,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
