import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, IonList, AlertController, ToastController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Lista, ListaItem, ListaUser } from 'src/app/modelos';
import { GlucoService } from 'src/app/services/glucodiario.services';

@Component({
  selector: "app-agregar",
  templateUrl: "./agregar.page.html",
  styleUrls: ["./agregar.page.scss"]
})
export class AgregarPage implements OnInit {
  @ViewChild("list") list: IonList;

  
  lista: Lista;
  indexLista: number;
  item: ListaItem;

  datosUser: ListaUser;
  dias: string = "";
  seleccionHG: boolean;
  seleccionVG: boolean;
  glucometria: string = "";
  hora: number = new Date().getHours();
  day: number = new Date().getDate();
  dia: ListaItem;

  constructor(
    public glucoService: GlucoService,
    private navCtrl: NavController,
    private activatedRoute: ActivatedRoute,
    public alertCtrl: AlertController,
    private toastCtrl: ToastController
  ) {
    this.datosUser = this.glucoService.cargarUltimoLogueo()[0];
    this.indexLista = Number(this.activatedRoute.snapshot.paramMap.get("indexLista"));
    this.lista = this.datosUser.lista[this.indexLista];

    this.dias = this.day.toString();
  }

  ngOnInit() {}

  async agregarDia() {
    // Validamos que el valor de dias no sea un campo vacio
    if (this.dias.length === 0) {
      return;
    } else if (parseInt(this.dias) <= 0 || parseInt(this.dias) > 31) {
      // Validamis que el valor de dias no sea mayor a 31
      let toast = await this.toastCtrl.create({
        message: "Día inválido para el mes",
        duration: 3000,
        cssClass: "fondoToast",
        position: "middle"
      });

      await toast.present();

      await toast.onDidDismiss().then((data) => {
      this.dias = '';
      });
    
    } else {
      const nuevoDia: ListaItem = new ListaItem(this.dias);
      this.glucoService.agregarDia(this.datosUser, this.lista, this.indexLista, nuevoDia);
     
      this.dias = "";

      // aqui se invoca el metodo selecionarHora que su vez invoca el metodo anadirValor
      // en estos metodos se remplasa el parametro "dia" que viene del html por nuevoDia que es el objeto que se crea en esta funcion

      let sugerenciaAD: boolean = false;
      let sugerenciaDD: boolean = false;
      let sugerenciaAA: boolean = false;
      let sugerenciaDA: boolean = false;
      let sugerenciaAC: boolean = false;
      let sugerenciaDC: boolean = false;

      if (this.hora > 4 && this.hora <= 8) {
        sugerenciaAD = true;
      } else if (this.hora > 8 && this.hora <= 10) {
        sugerenciaDD = true;
      } else if (this.hora > 10 && this.hora <= 12) {
        sugerenciaAA = true;
      } else if (this.hora > 12 && this.hora <= 15) {
        sugerenciaDA = true;
      } else if (this.hora > 15 && this.hora <= 19) {
        sugerenciaAC = true;
      } else if (this.hora > 17 && this.hora <= 24) {
        sugerenciaDC = true;
      }

      let alert1 = await this.alertCtrl.create({
        cssClass: "fondoAgregar",
        header: "Glucometría",
        inputs: [
          {
            type: "radio",
            label: "Antes de desayuno",
            value: "Antes de desayuno",
            checked: sugerenciaAD
          },
          {
            type: "radio",
            label: "Despues de desayuno",
            value: "Despues de desayuno",
            checked: sugerenciaDD
          },
          {
            type: "radio",
            label: "Antes de Almuerzo",
            value: "Antes de Almuerzo",
            checked: sugerenciaAA
          },
          {
            type: "radio",
            label: "Despues de Almuerzo",
            value: "Despues de Almuerzo",
            checked: sugerenciaDA
          },
          {
            type: "radio",
            label: "Antes de Cena",
            value: "Antes de Cena",
            checked: sugerenciaAC
          },
          {
            type: "radio",
            label: "Despues de Cena",
            value: "Despues de Cena",
            checked: sugerenciaDC
          }
        ],
        buttons: [
          {
            text: "Cancelar",
            role: "cancel",
            cssClass: "secondary",
            handler: data => { }
          },
          {
            text: "Guardar",
            handler: async data => {

              this.glucoService.agregarHora(this.datosUser, nuevoDia, data, this.indexLista);
              let alert2 = await this.alertCtrl.create({
                header: "Ingrese el valor de la Glucometrìa",
                message: nuevoDia.horaGlucometria,
                inputs: [
                  {
                    name: "titulo",
                    type: "number",
                    placeholder: "Valor",
                    value: nuevoDia.valorGlucometria,
                    id: "titulo"
                  }
                ],
                buttons: [
                  {
                    text: "Cancelar",
                    role: "cancel",
                    cssClass: "secondary",
                    handler: () => {}
                  },
                  {
                    text: "Guardar",
                    handler: data => {
                      if (data.titulo.length === 0) {
                        return;
                      } else {
                        nuevoDia.valorGlucometria = data.titulo;
                        this.glucoService.agregarValorGlucometria(
                          this.datosUser,
                          nuevoDia,
                          nuevoDia.valorGlucometria,
                          this.indexLista
                        );
                      }
                    }
                  }
                ]
              });
              alert2.present().then(() => {
                document.getElementById("titulo").focus();
              });
            }
          }
        ]
      });  
      await alert1.present();     
    }   // cierre del else
  }

  //------------------------------------------------

  async editarHora(dia: ListaItem, indexItem: number) {  
    this.list.closeSlidingItems();

    let sugerenciaAD: boolean = false;
    let sugerenciaDD: boolean = false;
    let sugerenciaAA: boolean = false;
    let sugerenciaDA: boolean = false;
    let sugerenciaAC: boolean = false;
    let sugerenciaDC: boolean = false;


    if (this.hora > 4 && this.hora <= 8) {
      sugerenciaAD = true;
    } else if (this.hora > 8 && this.hora <= 10) {
      sugerenciaDD = true;
    } else if (this.hora > 10 && this.hora <= 12) {
      sugerenciaAA = true;
    } else if (this.hora > 12 && this.hora <= 15) {
      sugerenciaDA = true;
    } else if (this.hora > 15 && this.hora <= 19) {
      sugerenciaAC = true;
    } else if (this.hora > 17 && this.hora <= 24) {
      sugerenciaDC = true;
    }

    let alert = await this.alertCtrl.create({
      cssClass: "fondoAgregar",
      header: "Glucometría",
      inputs: [
        {
          type: "radio",
          label: "Antes de desayuno",
          value: "Antes de desayuno",
          checked: sugerenciaAD
        },
        {
          type: "radio",
          label: "Despues de desayuno",
          value: "Despues de desayuno",
          checked: sugerenciaDD
        },
        {
          type: "radio",
          label: "Antes de Almuerzo",
          value: "Antes de Almuerzo",
          checked: sugerenciaAA
        },
        {
          type: "radio",
          label: "Despues de Almuerzo",
          value: "Despues de Almuerzo",
          checked: sugerenciaDA
        },
        {
          type: "radio",
          label: "Antes de Cena",
          value: "Antes de Cena",
          checked: sugerenciaAC
        },
        {
          type: "radio",
          label: "Despues de Cena",
          value: "Despues de Cena",
          checked: sugerenciaDC
        }
      ],
      buttons: [
        {
          text: "Cancelar",
          role: "cancel",
          cssClass: "secondary",
          handler: () => {
            return;
          }
        },
        {
          text: "Ok",
          handler: data => {
            this.glucoService.editarHora(this.datosUser, this.indexLista, indexItem, dia, data);
          }
        }
      ]
    });

    await alert.present();
  }

  //------------------------------------------------

  async editarValor(dia: ListaItem, indexItem: number) {  
    this.list.closeSlidingItems();    
    const alerta = await this.alertCtrl.create({
      header: "Ingrese el valor de la Glucometrìa",
      message: dia.horaGlucometria,
      cssClass: "fondoAgregar",
      inputs: [
        {
          name: "titulo",
          placeholder: "Valor",
          type: "number",
          value: dia.valorGlucometria,
          id: 'titulo'
        }
      ],
      buttons: [
        {
          text: "Cancelar"
        },
        {
          text: "Guardar",
          handler: data => {
            if (data.titulo.length === 0) {
              return;
            } else {
              dia.valorGlucometria = data.titulo;
              this.glucoService.editarValorGlucometria(this.datosUser, dia, data.titulo, this.indexLista, indexItem);
            }
          }
        }
      ]
    });
    await alerta.present().then(() => {
      document.getElementById("titulo").focus();
    });
  }

  //------------------------------------------------


  async anadirNotas(dia: ListaItem, indexItem: number) {
           
    const alerta = await this.alertCtrl.create({
      header: "Día: " + dia.nombre,
      subHeader: dia.horaGlucometria,
      message: dia.valorGlucometria + " mg/dL",
      cssClass: "fondoAgregar",
      inputs: [
        {
          name: "nota",
          placeholder: "Nota",
          value: dia.desc,
          id: 'nota'
        }
      ],
      buttons: [
        {
          text: "Cancelar",
          role: "cancel"
        },
        {
          text: "Guardar",
          handler: data => {
            this.glucoService.agregarNota(this.datosUser, this.lista, this.indexLista, dia, data.nota, indexItem);
            this.glucoService.cargarUltimoLogueo()[0];
            this.glucoService.guardarStorage();
          }
        }
      ]
    });
    this.list.closeSlidingItems();
    await alerta.present().then(() => {
     document.getElementById('nota').focus();
    });
  }

  //------------------------------------------------

  async mostrarNota(dia: ListaItem) {
    if (dia.desc.length <= 0) {
      return;
    } else {
      console.log(dia.desc);
      let alert = await this.alertCtrl.create({
        header: "Día: " + dia.nombre,
        subHeader: dia.desc,
        cssClass: "fondoAgregar",
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
          }
        ]
      });
     await alert.present();
    }
  }

  //------------------------------------------------

  async borrarDia(indexItem: number, dia: ListaItem) {


    this.dia = dia;
    const confirm = await this.alertCtrl.create({
      header: "Eliminar mes",
      message: "Seguro que desea eliminar el día de la lista?",
      cssClass: "fondoAgregar",
      buttons: [
        {
          text: "Eliminar",
          handler: () => {
            this.glucoService.borrarDia( this.datosUser, this.indexLista, indexItem);
          }
        },
        {
          text: "Cancelar",
          handler: () => {
            // slidingItem.close();
          }
        }
      ]
    });
    await confirm.present();
    this.list.closeSlidingItems();
  }

  //------------------------------------------------

  async editarDia(dia: ListaItem, indexItem: number) {
    this.list.closeSlidingItems();

    const alerta = await this.alertCtrl.create({
      header: dia.nombre,
      message: "Editar el día",
      cssClass: "fondoAgregar",
      inputs: [
        {
          name: "nombre",
          placeholder: "Nombre del día",
          type: "number",
          value: dia.nombre
        }
      ],
      buttons: [
        {
          text: "Cancelar"
        },
        {
          text: "Guardar",
          handler: data => {
            if (data.nombre.length === 0) {
              return;
            }
            this.glucoService.editarDia(this.datosUser, this.lista, this.indexLista, dia, data.nombre, indexItem);
          }
        }
      ]
    });

    await alerta.present();
  }

  validarTipoDiabetes() {
    var validacion: boolean = false;
    if (this.datosUser.tipoDiabetes == "1") {
      validacion = true;
    }
    return validacion;
  }

 async calcular() {
    const alert = await this.alertCtrl.create({
      header: "Calcular",
      cssClass: "fondoAgregar",
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
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            // console.log('Confirm Cancel');
          }
        }, {
          text: 'Ir',
          handler: async (data) => {
            if (data == "bolus") {
              console.log("Pasar bolus");
              const prompt = await this.alertCtrl.create({
                header: "Bolus",
                message: "Ingrese los gramos de carbohidratos que va a consumir",
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
                          message: "El campo de los carbohidratos no debe se vacío",
                          duration: 3000,
                          position: "top"
                        });
                        await toast.present();
                      } else {
                        let cantidadInsulina: number =
                          Math.round((parseInt(dataBolus.carbohidratos) / this.datosUser.ratio) * 100) / 100;
                        const alert = await this.alertCtrl.create({
                          header: cantidadInsulina.toString(),
                          // subHeader: 'Unidades de insulina',
                          message: `Esta es la cantidad de insulina a suministrar para ${dataBolus.carbohidratos} gr de carbohidratos.`,
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
                    handler: dataCorreccion => { }
                  },
                  {
                    text: "Calcular",
                    handler: async dataCorreccion => {
                      console.log(dataCorreccion.glisemiaActual);
                      console.log(dataCorreccion.meta);
                      if ( dataCorreccion.glisemiaActual == "" || dataCorreccion.meta == "") {
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
                          message: "Para una glicemia actual de " + dataCorreccion.glisemiaActual + " mg/dl y una meta de " + dataCorreccion.meta + " mg/dl, usted debe colocarse estas unds de insulina.",
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

  irAComidas() {
    this.navCtrl.navigateBack("/carbohidratos");
  }

  iraControlDiario() {
    this.navCtrl.navigateBack("/diario");
  }
}
