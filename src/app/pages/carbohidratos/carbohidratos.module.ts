import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CarbohidratosPage } from './carbohidratos.page';

const routes: Routes = [
  {
    path: '',
    component: CarbohidratosPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CarbohidratosPage]
})
export class CarbohidratosPageModule {}
