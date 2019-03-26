import { Component, OnInit } from '@angular/core';
import { Carbohidratos, CHService } from 'src/app/services/ch.services';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: "app-detalles",
  templateUrl: "./detalles.page.html",
  styleUrls: ["./detalles.page.scss"]
})
export class DetallesPage implements OnInit {
  id: number;
  alimento: Carbohidratos;

  constructor(
    private activatedRoute: ActivatedRoute,
    private chService: CHService,
    private navCtrl: NavController
  ) {
    this.id = Number(this.activatedRoute.snapshot.paramMap.get("id"));
    for(let i=0; i<this.chService.carbohidratos.length; i++){
      if(this.id === this.chService.carbohidratos[i].id){
        this.alimento = this.chService.carbohidratos[i];
        return;
      }
    }
    console.log("detalle", this.alimento);
  }

  ngOnInit() {}
  cerrar(){
    this.navCtrl.navigateBack("carbohidratos");
  }
}
