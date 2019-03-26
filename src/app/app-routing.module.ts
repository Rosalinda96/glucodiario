import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LocalstorageService } from './services/localstorage.service';
import { NavController } from '@ionic/angular';
import { GlucoService } from './services/glucodiario.services';


export const routes: Routes = [
  { path: '',
    // redirectTo: 'login', 
    redirectTo: (new LocalstorageService().cargarUltimoLogueo().length <= 0 || new LocalstorageService().cargarUltimoLogueo()[0] == undefined) ? "login" : "diario",
  pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'diario', loadChildren: './pages/control-diario/control-diario.module#ControlDiarioPageModule' },
  { path: 'agregar/:indexLista', loadChildren: './pages/agregar/agregar.module#AgregarPageModule' },
  { path: 'carbohidratos', loadChildren: './pages/carbohidratos/carbohidratos.module#CarbohidratosPageModule' },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'detalles/:id', loadChildren: './pages/detalles/detalles.module#DetallesPageModule' },
  { path: 'graficos/:indiceLista', loadChildren: './pages/graficos/graficos.module#GraficosPageModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  constructor(public navCtrl: NavController, public glucoService: GlucoService) {
    console.log(routes[0].redirectTo);
    if (this.glucoService.cargarUltimoLogueo().length == 0) {
      this.navCtrl.navigateBack('login');
    } else {
      this.navCtrl.navigateBack('diario');
    }
  }
}





// [{"lista":[],"user":"davgui","password":"871224","nombres":"David Guillermo","apellidos":"Pereira Batista","tipoDiabetes":"1","id":1552861865407,"insulinatotal":"70","ratio":6,"sensibilidad":25}]
