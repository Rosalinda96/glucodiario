import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { LoginPage } from './login.page';
import { TerminosCondicionesPage } from '../terminos-condiciones/terminos-condiciones.page';
import { TerminosCondicionesPageModule } from '../terminos-condiciones/terminos-condiciones.module';


const routes: Routes = [
  {
    path: '',
    component: LoginPage
  }
];

@NgModule({
  entryComponents:[TerminosCondicionesPage],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TerminosCondicionesPageModule,
    RouterModule.forChild(routes)
  ],
  declarations: [LoginPage]
})
export class LoginPageModule {}
