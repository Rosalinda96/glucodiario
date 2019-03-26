import { Component, OnInit } from '@angular/core';
import { Carbohidratos, CHService } from 'src/app/services/ch.services';
import { ListaUser } from 'src/app/modelos';
import { NavController, AlertController, ToastController, ModalController } from '@ionic/angular';
import { GlucoService } from 'src/app/services/glucodiario.services';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: "app-carbohidratos",
  templateUrl: "./carbohidratos.page.html",
  styleUrls: ["./carbohidratos.page.scss"]
})
export class CarbohidratosPage implements OnInit {
  comidas: Carbohidratos[] = this.chService.carbohidratos;
  searchQuery: string = "";
  items: Carbohidratos[];
  datosUser: ListaUser;

  constructor(
    public glucoService: GlucoService,
    private navCtrl: NavController,
    private activatedRoute: ActivatedRoute,
    public alertCtrl: AlertController,
    private toastCtrl: ToastController,
    public chService: CHService,
    private modalCtrl: ModalController
  ) {
    this.initializeItems();
    this.datosUser = this.glucoService.cargarUltimoLogueo()[0];
  }

  ngOnInit() {}

  validarTipoDiabetes() {
    var validacion: boolean = false;
    if (this.datosUser.tipoDiabetes == "1") {
      validacion = true;
    }
    return validacion;
  }

  initializeItems() {
    this.items = this.comidas;
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != "") {
      this.items = this.items.filter(item => {
        return item.nombre.toLowerCase().indexOf(val.toLowerCase()) > -1;
      });
    }
  }

  verDetalle(item: Carbohidratos) {
    this.navCtrl.navigateBack("detalles/" + item.id.toString());
  }

  iraControlDiario() {
    this.navCtrl.navigateBack("/diario");
  }

  async unidadesInsulina(item: Carbohidratos) {
    if (this.datosUser.tipoDiabetes == "1") {
      let cantidadInsulina: number =
        Math.round((item.gramos / this.datosUser.ratio) * 100) / 100;

      const alert = await this.alertCtrl.create({
        header: "Dosis de insulina",
        subHeader: cantidadInsulina + " dl/mg",
        message:
          item.medida +
          " de " +
          item.nombre +
          " equivale a " +
          item.grPorcion +
          " " +
          item.unidad +
          ", y contiene " +
          item.materia +
          ".",
        buttons: ["OK"],
        cssClass: "fondoAgregar"
      });
      await alert.present();
    }
  }

  async calcular() {
    const alert = await this.alertCtrl.create({
      header: "Alert",
      subHeader: "Subtitle",
      message: "This is an alert message.",
      inputs: [
        {
          type: "radio",
          label: "Calcular bolus",
          value: "bolus",
          checked: true
        },
        {
          type: "radio",
          label: "Calcular Corrección",
          value: "correccion",
          checked: false
        }
      ],
      buttons: [
        {
          text: "Cancelar",
          role: "cancel",
          cssClass: "secondary",
          handler: () => {
            // console.log('Confirm Cancel');
          }
        },
        {
          text: "Ir",
          handler: async data => {
            if (data == "bolus") {
              console.log("Pasar bolus");
              const prompt = await this.alertCtrl.create({
                header: "Bolus",
                message:
                  "Ingrese los gramos de carbohidratos que va a consumir",
                inputs: [
                  {
                    name: "carbohidratos",
                    placeholder: "gr de carbohidratos",
                    type: "number"
                  }
                ],
                buttons: [
                  {
                    text: "Cancelar",
                    handler: dataBolus => {
                      console.log("Cancel clicked");
                    }
                  },
                  {
                    text: "Calcular",
                    handler: async dataBolus => {
                      console.log(dataBolus);
                      if (dataBolus.carbohidratos == "") {
                        let toast = await this.toastCtrl.create({
                          message:
                            "El campo de los carbohidratos no debe se vacío",
                          duration: 3000,
                          position: "top"
                        });
                        await toast.present();
                      } else {
                        let cantidadInsulina: number =
                          Math.round(
                            (parseInt(dataBolus.carbohidratos) /
                              this.datosUser.ratio) *
                              100
                          ) / 100;
                        const alert = await this.alertCtrl.create({
                          header: cantidadInsulina.toString(),
                          // subHeader: 'Unidades de insulina',
                          message: `Esta es la cantidad de insulina a suministrar para ${
                            dataBolus.carbohidratos
                          } gr de carbohidratos.`,
                          buttons: ["OK"]
                        });
                        alert.present();
                      }
                    }
                  }
                ]
              });
              await prompt.present();
            } else if (data == "correccion") {
              const prompt = await this.alertCtrl.create({
                header: "Corrección",
                message: "Ingrese la glicemia actual y la meta de corrección",
                inputs: [
                  {
                    name: "glisemiaActual",
                    placeholder: "Glicemia actual",
                    type: "number"
                  },
                  {
                    name: "meta",
                    placeholder: "Meta",
                    type: "number"
                  }
                ],
                buttons: [
                  {
                    text: "Cancelar",
                    handler: dataCorreccion => {}
                  },
                  {
                    text: "Calcular",
                    handler: async dataCorreccion => {
                      console.log(dataCorreccion.glisemiaActual);
                      console.log(dataCorreccion.meta);
                      if (
                        dataCorreccion.glisemiaActual == "" ||
                        dataCorreccion.meta == ""
                      ) {
                        let toast = await this.toastCtrl.create({
                          message: "Los campos no deben ser vacíos",
                          duration: 3000,
                          position: "top"
                        });
                        await toast.present();
                      } else {
                        let cantidadInsulina: number =
                          Math.round(
                            ((parseInt(dataCorreccion.glisemiaActual) -
                              parseInt(dataCorreccion.meta)) /
                              this.datosUser.sensibilidad) *
                              100
                          ) / 100;
                        const alert = await this.alertCtrl.create({
                          header: cantidadInsulina.toString(),
                          message:
                            "Para una glicemia actual de " +
                            dataCorreccion.glisemiaActual +
                            " mg/dl y una meta de " +
                            dataCorreccion.meta +
                            " mg/dl, usted debe colocarse estas unds de insulina.",
                          buttons: ["OK"]
                        });
                        await alert.present();
                      }
                    }
                  }
                ]
              });
              await prompt.present();
            }
          }
        }
      ]
    });

    await alert.present();
  }
  salir() {
    // // this.navCtrl.setRoot(PageLoginPage);
    // this.navCtrl.setRoot(MyApp);
  }
}

