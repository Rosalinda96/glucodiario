import { Component, OnInit, ViewChild } from '@angular/core';
import { Lista, ListaUser, ListaItem } from 'src/app/modelos';
import { NavController, AlertController, MenuController, ToastController, IonList } from "@ionic/angular";
import { ActivatedRoute } from "@angular/router";
import { GlucoService } from 'src/app/services/glucodiario.services';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { File } from "@ionic-native/file/ngx";
import { ServicesUsuarioServiceProvider } from 'src/app/services/services-usuario-service';
import { Network } from "@ionic-native/network/ngx";

@Component({
  selector: "app-control-diario",
  templateUrl: "./control-diario.page.html",
  styleUrls: ["./control-diario.page.scss"]
})
export class ControlDiarioPage implements OnInit {
  @ViewChild("list") list: IonList;
  ngOnInit() {}

  promedio: number[] = [];
  mes: number = new Date().getMonth() + 1;
  lista: Lista;
  datosUser: ListaUser;
  indexLista: number;
  items: ListaItem;

  conectado = true;

  constructor(
    public navCtrl: NavController,
    public activatedRoute: ActivatedRoute,
    public glucoService: GlucoService,
    public alertCtrl: AlertController,
    private statusBar: StatusBar,
    public menu: MenuController,
    private toastCtrl: ToastController,
    private file: File,
    private usuarioService: ServicesUsuarioServiceProvider,
    private network: Network
  ) {
    this.statusBar.overlaysWebView(false);
    this.statusBar.show();
    this.glucoService.cargarStorage();
    this.datosUser = this.glucoService.cargarUltimoLogueo()[0];

    // ***********************

    if (network.type === "none" || network.type === "unknow") {
      this.avisaDesconexion();
    }

    const disconnectSicription = network.onDisconnect().subscribe(() => {
      if (this.conectado) {
        this.avisaDesconexion();
      }
    });

    const connectSicription = network.onConnect().subscribe(() => {
      setTimeout(() => {
        if (!this.conectado) {
          this.avisaConexion();
          // Carga de datos a la nube cuando se inicie la app
          this.glucoService.guardarUltimoLogueo();
          this.usuarioService.editarUsuario(this.glucoService.cargarUltimoLogueo()[0]);
        }
      }, 3000);
    });
  }

  

  // ------------------------------   internet ---------------------

  avisaConexion() {
    this.conectado = true;
  }

  avisaDesconexion() {
    this.conectado = false;
  }

  // ==================================================================

  async presentToast(mensaje: string = "Los campos no pueden ser vacíos") {
    let toast = await this.toastCtrl.create({
      message: mensaje,
      duration: 3000,
      position: "middle",
      cssClass: "fondoToast"
    });
    await toast.present();
  }

  // -------------------------------

  async presenteAlert(
    header: string = "",
    subHeader: string = "",
    message: string = ""
  ) {
    const alert = await this.alertCtrl.create({
      header: header,
      subHeader: subHeader,
      message: message,
      buttons: ["Ok"]
    });

    await alert.present();
  }

  validarTipoDiabetes() {
    var validacion: boolean = false;
    if (this.datosUser.tipoDiabetes == "1") {
      validacion = true;
    }
    return validacion;
  }

  promedioMes() {
    let cont: number = 0;

    this.datosUser.lista.forEach(meses => {
      let mes: number = 0;
      cont = cont + 1;

      if (meses.items != undefined) {
        for (let i = 0; i < meses.items.length; i++) {
          mes = mes + parseInt(meses.items[i].valorGlucometria);
        }

        mes = Math.round(mes / meses.items.length);

        if (isNaN(mes)) {
          mes = 0;
        } else {
          this.promedio[cont] = mes;
        }
      } else {
        meses.items = [];
      }
    });
    return this.promedio;
  }

  //-----------------------------

  listaSelecionada(lista: Lista, indexLista: number) {
    this.navCtrl.navigateBack("/agregar/" + indexLista.toString());
    return;
  }

  async agregarLista() {
    let sugerenciaEnero: boolean = false;
    let sugerenciaFebrero: boolean = false;
    let sugerenciaMarzo: boolean = false;
    let sugerenciaAbril: boolean = false;
    let sugerenciaMayo: boolean = false;
    let sugerenciaJunio: boolean = false;
    let sugerenciaJulio: boolean = false;
    let sugerenciaAgosto: boolean = false;
    let sugerenciaSeptiembre: boolean = false;
    let sugerenciaOctubre: boolean = false;
    let sugerenciaNoviembre: boolean = false;
    let sugerenciaDiciembre: boolean = false;

    if (this.mes == 1) {
      sugerenciaEnero = true;
    } else if (this.mes == 2) {
      sugerenciaFebrero = true;
    } else if (this.mes == 3) {
      sugerenciaMarzo = true;
    } else if (this.mes == 4) {
      sugerenciaAbril = true;
    } else if (this.mes == 5) {
      sugerenciaMayo = true;
    } else if (this.mes == 6) {
      sugerenciaJunio = true;
    } else if (this.mes == 7) {
      sugerenciaJulio = true;
    } else if (this.mes == 8) {
      sugerenciaAgosto = true;
    } else if (this.mes == 9) {
      sugerenciaSeptiembre = true;
    } else if (this.mes == 10) {
      sugerenciaOctubre = true;
    } else if (this.mes == 11) {
      sugerenciaNoviembre = true;
    } else if (this.mes == 12) {
      sugerenciaDiciembre = true;
    }

    const alert = await this.alertCtrl.create({
      cssClass: "fondoAgregar",
      header: "Mes",
      inputs: [
        {
          name: "enero",
          type: "radio",
          label: "Enero",
          value: "Enero",
          checked: sugerenciaEnero
        },
        {
          name: "febrero",
          type: "radio",
          label: "Febrero",
          value: "Febrero",
          checked: sugerenciaFebrero
        },
        {
          name: "marzo",
          type: "radio",
          label: "Marzo",
          value: "Marzo",
          checked: sugerenciaMarzo
        },
        {
          name: "abril",
          type: "radio",
          label: "Abril",
          value: "Abril",
          checked: sugerenciaAbril
        },
        {
          name: "mayo",
          type: "radio",
          label: "Mayo",
          value: "Mayo",
          checked: sugerenciaMayo
        },
        {
          name: "junio",
          type: "radio",
          label: "Junio",
          value: "Junio",
          checked: sugerenciaJunio
        },
        {
          name: "julio",
          type: "radio",
          label: "Julio",
          value: "Julio",
          checked: sugerenciaJulio
        },
        {
          name: "agosto",
          type: "radio",
          label: "Agosto",
          value: "Agosto",
          checked: sugerenciaAgosto
        },
        {
          name: "septiembre",
          type: "radio",
          label: "Septiembre",
          value: "Septiembre",
          checked: sugerenciaSeptiembre
        },
        {
          name: "octubre",
          type: "radio",
          label: "Octubre",
          value: "Octubre",
          checked: sugerenciaOctubre
        },
        {
          name: "noviembre",
          type: "radio",
          label: "Noviembre",
          value: "Noviembre",
          checked: sugerenciaNoviembre
        },
        {
          name: "diciembre",
          type: "radio",
          label: "Diciembre",
          value: "Diciembre",
          checked: sugerenciaDiciembre
        }
      ],
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          cssClass: "secondary",
          handler: data => {}
        },
        {
          text: "Ok",
          handler: data => {
            if (
              this.datosUser.lista == undefined ||
              this.datosUser.lista == null
            ) {
              this.datosUser.lista = [];
            }

            this.glucoService.agregarLista(data, this.datosUser.lista, this.datosUser);
          }
        }
      ]
    });

    await alert.present();
  }

  // -----------------------------

  async borrarLista(lista: Lista, index: number) {
    this.list.closeSlidingItems();
    const alert = await this.alertCtrl.create({
      header: "Borrar lista",
      message: "Seguro que desea eliminar el mes de la lista?",
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          cssClass: "secondary",
          handler: blah => {}
        },
        {
          text: "Eliminar",
          handler: () => {
            this.glucoService.borrarlista(lista, this.datosUser, index);
            this.glucoService.cargarStorage();
            return;
          }
        }
      ]
    });
    await alert.present();
  }

  // ---------------------------------------

  async editarLista(lista: Lista, indexLista: number) {
    this.list.closeSlidingItems();

    let alert = await this.alertCtrl.create({
      cssClass: "fondoAgregar",
      header: "Editar Lista",
      inputs: [
        {
          type: "radio",
          label: "Enero",
          value: "Enero",
          checked: true
        },
        {
          type: "radio",
          label: "Febrero",
          value: "Febrero",
          checked: false
        },
        {
          type: "radio",
          label: "Marzo",
          value: "Marzo",
          checked: false
        },
        {
          type: "radio",
          label: "Abril",
          value: "Abril",
          checked: false
        },
        {
          type: "radio",
          label: "Mayo",
          value: "Mayo",
          checked: false
        },
        {
          type: "radio",
          label: "Junio",
          value: "Junio",
          checked: false
        },
        {
          type: "radio",
          label: "Julio",
          value: "Julio",
          checked: false
        },
        {
          type: "radio",
          label: "Agosto",
          value: "Agosto",
          checked: false
        },
        {
          type: "radio",
          label: "Septiembre",
          value: "Septiembre",
          checked: false
        },
        {
          type: "radio",
          label: "Octubre",
          value: "Octubre",
          checked: false
        },
        {
          type: "radio",
          label: "Noviembre",
          value: "Noviembre",
          checked: false
        },
        {
          type: "radio",
          label: "Diciembre",
          value: "Diciembre",
          checked: false
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
          text: "Editar",
          handler: tituloLista => {
            this.glucoService.editarLista(
              this.datosUser,
              indexLista,
              tituloLista
            );
            return;
          }
        }
      ]
    });
    await alert.present();
  }

  // ------------------------------------------------------

  indiceLista: number;
  verGrafico(lista: Lista, i: number) {
    this.list.closeSlidingItems();
    this.indiceLista = i;

    this.navCtrl.navigateBack("graficos/" + this.indiceLista.toString());
  }

  irAComidas() {
    this.navCtrl.navigateBack("carbohidratos");
  }

  async calcular() {
    let alert = await this.alertCtrl.create({
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
          text: "Cancelar",
          role: "cancel",
          cssClass: "secondary",
          handler: () => {}
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
                    type: "number",
                    id: 'carbohidratos'
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
                          header: "Unidades de unsulina",
                          subHeader:
                            "Para " +
                            dataBolus.carbohidratos +
                            " gr de carbohidratos usted debe colocarse" +
                            cantidadInsulina +
                            " und de insulina.",
                          buttons: ["OK"]
                        });
                        await alert.present();
                      }
                    }
                  }
                ]
              });
              prompt.present().then(() => {
                document.getElementById('carbohidratos').focus();
              });
            } else if (data == "correccion") {
              const prompt = await this.alertCtrl.create({
                header: "Corrección",
                message: "Ingrese la glicemia actual y la meta de corrección",
                inputs: [
                  {
                    name: "glisemiaActual",
                    placeholder: "Glicemia actual",
                    type: "number",
                    id: 'glisemiaActual'
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
                        toast.present();
                      } else {
                        let cantidadInsulina: number =
                          Math.round(
                            ((parseInt(dataCorreccion.glisemiaActual) -
                              parseInt(dataCorreccion.meta)) /
                              this.datosUser.sensibilidad) *
                              100
                          ) / 100;
                        const alert = await this.alertCtrl.create({
                          header: "Unidades de unsulina",
                          subHeader:
                            "Para una glicemia actual de " +
                            dataCorreccion.glisemiaActual.bold() +
                            " mg/dl y una meta de " +
                            dataCorreccion.meta +
                            " mg/dl, usted debe colocarse " +
                            cantidadInsulina +
                            " und de insulina.",
                          buttons: ["OK"]
                        });
                        alert.present();
                      }
                    }
                  }
                ]
              });
              await prompt.present().then(() => {
                document.getElementById("glisemiaActual").focus();
              });
            }
          }
        }
      ]
    });

    await alert.present();
  }

  // -----------------------------------

  saveFile() {
    this.file
      .writeFile(
        this.file.externalRootDirectory,
        "Download/Gluco.txt",
        JSON.stringify(this.glucoService.cargarUltimoLogueo()[0])
      )
      .then(
        data => {
          this.presentToast(
            "Se guardó en " +
              this.file.externalRootDirectory +
              " --> Download/Gluco.txt"
          );
        },
        err => {
          this.presentToast(
            'Error al descargar dato, verifique  que no haya un archivo llamado "Gluco.txt" en la carpeta de descatga'
          );
          this.toggleMenu();
        }
      );
  }

  subirANube() {
    this.glucoService.guardarUltimoLogueo();
    this.usuarioService.editarUsuario(
      this.glucoService.cargarUltimoLogueo()[0]
    );
    this.presentToast("Sus datos están actualizados en la nube");
    this.toggleMenu();
  }

  // -----------------------------------------------------

  async editarUsuario() {
    this.usuarioService.getUsuario(this.datosUser.user).then(usuario => {
      if (!usuario) {
        this.presenteAlert(
          "Error al consultar este usuario en la base de datos"
        );
      } else {
        let user: ListaUser = Object(usuario);
        this.formularioEditar(
          user.user,
          user.nombres,
          user.apellidos,
          user.password,
          user.password
        );
      }
    });
  }

  async formularioEditar(
    usuario: string = "",
    nombres: string = "",
    apellidos: string = "",
    user: string = "",
    pass1: string = "",
    pass2: string = ""
  ) {
    let alert = await this.alertCtrl.create({
      header: "Editar usuario",
      subHeader: usuario,
      message:
        "Verifique los campos y obligatorios (Nombres, Apellidos y Contraseña",
      cssClass: "alert",
      inputs: [
        {
          label: "Nombre",
          name: "nombre",
          placeholder: "Escriba su(s) nombre(s)",
          value: nombres,
          id: "nombre"
        },
        {
          label: "Apellidos",
          name: "apellidos",
          placeholder: "Escriba sus apellidos",
          value: apellidos
        },
        {
          label: "",
          name: "pass1",
          placeholder: "Escriba su contraseña",
          type: "password",
          value: pass1,
          min: 6
        },
        {
          label: "",
          name: "pass2",
          placeholder: "Vuelva a esccibir su contraseña",
          type: "password",
          value: pass2
        }
      ],
      buttons: [
        {
          text: "Cancelar",
          role: "cancel",
          handler: data => {
            this.presentToast("Usted canceló la edición de su usuario");
            this.toggleMenu();
          }
        },
        {
          text: "Editar",
          handler: data => {
            if (
              data.nombre == "" ||
              data.apellidos == "" ||
              data.pass1 == "" ||
              data.pass2 == ""
            ) {
              this.presentToast("Existen campos que no deben quedar vacíos");
              this.formularioEditar(
                usuario,
                data.nombres,
                data.apellidos,
                data.password,
                data.password2
              );
            } else {
              this.datosUser.nombres = data.nombre;
              this.datosUser.apellidos = data.apellidos;
              this.datosUser.password = data.pass1;
              this.glucoService.cargarUltimoLogueo()[0] = this.datosUser;
              this.glucoService.guardarUltimoLogueo();
              this.usuarioService.editarUsuario(this.datosUser);
              this.presentToast("El usuario ha sido editado exitósamente");
            }
          }
        }
      ]
    });
    await alert.present().then(() => {
      document.getElementById("nombre").focus();
    });
  }

  // ----------------------------------------------------

  async editarCoeficientes() {
    this.toggleMenu();
    if (this.datosUser.tipoDiabetes == "2") {
      const alert = await this.alertCtrl.create({
        header: "Este usuario no tiene coefiecientes que editar",
        subHeader: "Los diabeticos tipo 2 no tienen coeficientes que editar",
        cssClass: "alert",
        buttons: ["OK"]
      });
      await alert.present();
    } else {
      let alert = await this.alertCtrl.create({
        header:
          "Ratio=" +
          this.datosUser.ratio +
          ". " +
          "Sensibilidad=" +
          this.datosUser.sensibilidad,
        subHeader: "Ingrese las unidades totales de insulina al día.",
        cssClass: "alert",
        inputs: [
          {
            name: "insulinaTotal",
            placeholder: "Insiluna Total diaria",
            type: "number",
            value: this.datosUser.insulinatotal.toString(),
            id: "insulinaTotal"
          }
        ],

        buttons: [
          {
            text: "Cancelar",
            role: "cancel",
            handler: data => {}
          },
          {
            text: "Editar",
            handler: data => {
              this.glucoService.editarInsulinaTotal(
                this.datosUser,
                data.insulinaTotal
              );
              this.presentToast("La ratio y la sensibilidad han sido editadas");
            }
          }
        ]
      });
      await alert.present().then(() => {
        document.getElementById("insulinaTotal").focus();
      });
    }
  }

  // -----------------------------------------

  async importarDelTelefono() {
    this.toggleMenu();
    this.file.readAsText(this.file.externalRootDirectory + "Download/", "Gluco.txt")
      .then(
        async data => {
          if (data) {
              let usuario: ListaUser = JSON.parse(data);
              if(usuario.user == this.datosUser.user){
              this.datosUser = usuario;
              this.glucoService.cargarUltimoLogueo()[0] = usuario;
              this.glucoService.guardarUltimoLogueo();
            }else{
              this.presentToast('El archivo de importacion no pertenece al usuario actual');
              return;
            }
          } else {
            this.presentToast(
              "No existe alchivo de importacíon, asegúrese de que haya un archivo en /Downdload/data.txt"
            );
          }
        },
        err => {
          this.presentToast(
            "No existe alchivo de importacíon, asegúrese de que haya un archovo en /Downdload/data.txt"
          );
        }
      );
  }

  // --------------------------------------------------------

  openPage(opcion: string) {
    switch (opcion) {
      case "salir":
        this.menu.toggle();
        this.glucoService.cargarUltimoLogueo().pop();
        this.glucoService.guardarUltimoLogueo();
        this.navCtrl.navigateBack("login");
        break;

      case "exportar":
        this.saveFile();
        this.toggleMenu();
        break;

      case "nube":
        this.subirANube();
        this.menu.toggle();
        break;

      case "editarUser":
        this.editarUsuario();
        break;

      case "editaCoeficientes":
        this.editarCoeficientes();
        break;

      case "importarDelTelefono":
        this.importarDelTelefono();
        break;

      default:
        break;
    }
  }

  // -------------------------------------

  toggleMenu() {
    this.menu.toggle();
  }
}
