import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatCardModule } from "@angular/material/card";
import { MatGridListModule } from '@angular/material/grid-list';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatGridListModule,
    MatChipsModule,
    MatDividerModule,
    MatTooltipModule,
    MatDialogModule,
  ],
  exports: [
    MatButtonModule,
    MatIconModule,
    CommonModule,
    MatCardModule,
    MatGridListModule,
    MatChipsModule,
    MatDividerModule,
    MatTooltipModule,
    MatDialogModule,
  ],
})
export class MaterialCardModule { }
