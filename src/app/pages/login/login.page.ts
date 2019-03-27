import { Component, OnInit, ViewChild } from "@angular/core";
import { GlucoService } from "src/app/services/glucodiario.services";
import {  MenuController, NavController, AlertController, ToastController, LoadingController, IonSlides, } from "@ionic/angular";
import { ListaUser } from "src/app/modelos";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { ServicesUsuarioServiceProvider } from "src/app/services/services-usuario-service";
import { File } from "@ionic-native/file/ngx";
import { FileOpener } from "@ionic-native/file-opener/ngx";
import { Network } from "@ionic-native/network/ngx";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"]
})
export class LoginPage implements OnInit {
  @ViewChild("slideLogin") slides: IonSlides;

  slideOpts = {
    effect: "flip"
    // allowSlideNext: false,
    // allowSlidePrev: false
  };

  listaUser: ListaUser;
  datosUser: ListaUser;
  nuevoUsuario: ListaUser;
  id: number;
  nombres: string;
  apellidos: string;
  tipoDiabetes: string;
  insulinaTotal: number;
  user: string;
  password: string;
  password2: string;
  loadingProperty: any;
  conectado = true;

  constructor(
    private glucoService: GlucoService,
    public menu: MenuController,
    private statusBar: StatusBar,
    public navCtrl: NavController,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private usuarioService: ServicesUsuarioServiceProvider,
    private file: File,
    private fileOpener: FileOpener,
    private network: Network
  ) {
    this.statusBar.show();
    this.glucoService.cargarUltimoLogueo();
    this.glucoService.guardarUltimoLogueo();
    this.statusBar.overlaysWebView(false);

    // ***********************

    if (this.network.type === "none" || this.network.type === "unknow") {
      this.avisaDesconexion();
    }

    const disconnectSicription = this.network.onDisconnect().subscribe(() => {
      if (this.conectado) {
        this.avisaDesconexion();
      }
    });

    const connectSicription = this.network.onConnect().subscribe(() => {
      setTimeout(() => {
        if (!this.conectado) {
          this.avisaConexion();
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

  ngOnInit() {
    this.slides.lockSwipes(true);
    this.slides.scrollbar = false;
  }

  // ---------------------------------

  async mostraAlerta(
    header: string = "",
    subHeader: string = "",
    mensaje: string = ""
  ) {
    const alert = await this.alertCtrl.create({
      header: header,
      subHeader: subHeader,
      message: mensaje,
      buttons: ["OK"]
    });
    await alert.present();
  }

  // ------------------------------

  async loading(mensaje: string, duracion: number) {
    this.loadingProperty = await this.loadingCtrl.create({
      message: mensaje,
      duration: duracion
    });
    return await this.loadingProperty.present();
  }

  // --------------------------------

  ionViewDidLoad() {
    // this.slides.paginationType = "fraction";
    // this.slides.lockSwipes(true);
    // this.slides.freeMode = true;
  }

  // --------------------------------

  mostrarInput() {
    this.presentPrompt();
  }

  // --------------------------------

  async presentPrompt() {
    let alert = await this.alertCtrl.create({
      header: "Ingrese el usuario",
      cssClass: "alert",
      inputs: [
        {
          name: "username",
          placeholder: "Usuario",
          id: "username"
        },
        {
          name: "pass",
          placeholder: "Contraseña",
          type: "password"
        }
      ],
      buttons: [
        {
          text: "Cancelar",
          role: "cancel",
          handler: data => {
            console.log("Cancel clicked");
          }
        },
        {
          text: "Login",
          handler: data => {
            if (data.username === "" || data.pass === "") {
              this.mostrarInput();
              this.presentToast();
            } else {
              this.verifiacarUsuario(data.username, data.pass);
            }
          }
        }
      ]
    });
    await alert.present().then(() => {
      document.getElementById("username").focus();
    });
  }

  // --------------------------------

  async presentToast(mensaje: string = "Los campos no pueden ser vacíos") {
    let toast = await this.toastCtrl.create({
      message: mensaje,
      duration: 2000,
      position: "middle",
      cssClass: "fondoToast"
    });
    await toast.present();
  }

  // --------------------------------

  async verifiacarUsuario(usuario: String, pass: string) {
    let loading = await this.loadingCtrl.create({
      message: "Verificando",
      duration: 2000
    });
    await loading.present();
    setTimeout(() => {
      let validacion: boolean = false;

      let usuarios: ListaUser[] = [];
      this.usuarioService.getUsuario(usuario);
      this.usuarioService.getUsuarios().then(usuariosFirebase => {
        usuarios = Object(usuariosFirebase);
        console.log("firebase", usuariosFirebase);
        // loading.dismiss();   ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        let indexUsuario: number = 0;
        for (let i = 0; i < usuarios.length; i++) {
          if (usuario === usuarios[i].user && pass === usuarios[i].password) {
            indexUsuario = i;
            validacion = true;
            break;
          } else {
            validacion = false;
          }
        }

        if (validacion) {
          this.glucoService.cargarUltimoLogueo().pop();
          this.glucoService.cargarUltimoLogueo().push(usuarios[indexUsuario]);
          this.glucoService.guardarUltimoLogueo();
          this.slides.lockSwipes(false);
          this.slides.slideTo(1);
          this.slides.lockSwipes(true);
        } else {
          this.presentToast(
            "Error al ingresar  verifique sus suario y contraseña"
          );
          // console.log(validacion);
          setTimeout(() => {
            this.presentPrompt();
          }, 2100);
        }
      });
    }, 1500);
  }

  // -------------------------------------

  ingresar() {
    this.navCtrl.navigateBack("/diario");
  }

  // ---------------------------------------

  async agregarUsuario(
    nombres: string = "",
    apellidos: string = "",
    user: string = "",
    pass1: string = "",
    pass2: string = ""
  ) {
    let alert = await this.alertCtrl.create({
      header: "Cree su usuario de GlucoDiario",
      subHeader:
        "Verifique los campos y obligatorios (Nombres, Apellidos, Usuario y Contraseña",
      cssClass: "fondoAgregar",
      keyboardClose: true,
      translucent: true,
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
          name: "username",
          placeholder: "Escriba su usuario",
          value: user,
          min: 6
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
            this.presentToast("Usted canceló la creación de su usuario");
            this.alertCtrl.dismiss();
            return;
          }
        },
        {
          text: "Siguiente >>",
          handler: data => {
            this.nombres = data.nombre;
            this.apellidos = data.apellidos;
            this.user = data.username;
            this.password = data.pass1;
            this.password2 = data.pass2;
            if (
              this.nombres == "" ||
              this.apellidos == "" ||
              this.user == "" ||
              this.password == "" ||
              this.password2 == ""
            ) {
              this.presentToast("Verifique nuevamente y no deje campos vacíos");
              this.agregarUsuario(
                this.nombres,
                this.apellidos,
                this.user,
                this.password,
                this.password2
              );
            } else {
              if (data.pass1 != data.pass2) {
                this.presentToast(
                  "La contraseña y su confirmación no coinsiden"
                );
                this.agregarUsuario(
                  this.nombres,
                  this.apellidos,
                  this.user,
                  "",
                  ""
                );
              } else {
                let usuarios: ListaUser[] = [];

                this.usuarioService
                  .getUsuarios()
                  .then(async usuariosFireBase => {
                    if (usuariosFireBase) {
                      usuarios = Object(usuariosFireBase);

                      if (usuarios.length == 0) {
                        this.menu.toggle();
                        this.alerta2();
                      } else {
                        let encontrado: boolean = false;
                        for (let i = 0; i < usuarios.length; i++) {
                          if (this.user == usuarios[i].user) {
                            encontrado = true;
                          }
                        }
                        if (encontrado) {
                          this.presentToast(
                            "Este usuario ya existe en la base de datos"
                          );
                          this.agregarUsuario(
                            this.nombres,
                            this.apellidos,
                            "",
                            this.password,
                            this.password2
                          );
                          return;
                        } else {
                          this.alerta2();
                        }
                      }
                    } else {
                      this.presentToast(
                        "Error al conectarse a la base de datos"
                      );
                    }
                  });
              }
            }
          }
        }
      ]
    });
    await alert.present().then(() => {
      document.getElementById("nombre").focus();
    });
  }

  async alerta2() {
    let alert2 = await this.alertCtrl.create({
      header: "Cree su usuario de GlucoDiario",
      subHeader: "Seleccione su tipo de diabetes",
      cssClass: "alert",
      inputs: [
        {
          name: "tipo1",
          type: "radio",
          label: "Tipo 1",
          value: "1",
          checked: true
        },
        {
          name: "tipo2",
          type: "radio",
          label: "Tipo 2",
          value: "2"
        }
      ],
      buttons: [
        {
          text: "<< Atrás",
          role: "cancel",
          handler: data2 => {
            this.agregarUsuario(
              this.nombres,
              this.apellidos,
              this.user,
              this.password,
              this.password2
            );
            return;
          }
        },
        {
          text: "Registrar",
          handler: data2 => {
            this.tipoDiabetes = data2;
            if (this.tipoDiabetes == "1") {
              this.alerta3();
            } else {
              this.tipoDiabetes = "2";
              this.insulinaTotal = 40;
              // ingresar diabetico tipo 2
              let nuevoUser = new ListaUser(
                this.user,
                this.password,
                this.nombres,
                this.apellidos,
                this.tipoDiabetes,
                this.insulinaTotal,
                []
              );
              // this.glucoService.cargarUltimoLogueo().push(nuevoUser);
              // this.glucoService.guardarUltimoLogueo();
              this.usuarioService.crearUsuario(nuevoUser);
              this.toggleMenu();
              this.presentToast(
                "El usuario ha sido registrado en la base de datos con éxito"
              );
              // this.navCtrl.navigateBack("/login");
              return;
            }
          }
        }
      ]
    });
    alert2.present();
  }

  async alerta3() {
    let alert3 = await this.alertCtrl.create({
      header: "Cree su usuario de GlucoDiario",
      subHeader:
        "Ingrese las unidades de insulina (acción lenta y accion rápida) que se coloca a diario",
      cssClass: "alert",
      inputs: [
        {
          label: "Unidades de insulina total en el dia",
          name: "insulinaTotal",
          placeholder: "Unidades de insulina total en el dia",
          type: "number",
          id: "insulinaTotal"
        }
      ],
      buttons: [
        {
          text: "Cancelar",
          role: "cancel",
          handler: data3 => {
            this.presentToast("Usted canceló la creación de su usuario");
            this.alerta2();
          }
        },
        {
          text: "Registrar",
          handler: data3 => {
            this.insulinaTotal = data3.insulinaTotal;
            if (this.insulinaTotal <= 0) {
              this.presentToast("El campo no debe estar vacío");
            }
            // Ingresar diabetico tipo 1
            let nuevoUser = new ListaUser(
              this.user,
              this.password,
              this.nombres,
              this.apellidos,
              this.tipoDiabetes,
              this.insulinaTotal,
              []
            );
            // this.glucoService.cargarUltimoLogueo().push(nuevoUser);
            // this.glucoService.guardarUltimoLogueo();
            this.usuarioService.crearUsuario(nuevoUser);
            this.toggleMenu();
            this.presentToast(
              "El usuario ha sido registrado en la base de datos con éxito"
            );
            // this.navCtrl.navigateBack("/login");
            return;
          }
        }
      ]
    });
    alert3.present().then(() => {
      document.getElementById("insulinaTotal").focus();
    });
  }

  async eliminarUsuario() {
    let alert = await this.alertCtrl.create({
      header: "Asegúrese de estar conectado a internet para este procedimiento",
      subHeader:
        "Es requerido que ingrese el usuario la contaseña y el teléfono del usuario que desea dar de baja.Eliminar",
      cssClass: "alert",
      inputs: [
        {
          name: "username",
          placeholder: "Usuario",
          id: "username"
        },
        {
          name: "pass",
          placeholder: "Contraseña",
          type: "password"
        }
      ],
      buttons: [
        {
          text: "Cancelar",
          role: "cancel",
          handler: data => {
            console.log("Cancel clicked");
          }
        },
        {
          text: "Eliminar",
          handler: data => {
            if (data.username === "" || data.pass === "") {
              this.eliminarUsuario();
              this.presentToast();
            } else {
              this.usuarioService
                .getUsuario(data.username)
                .then(user => {
                  let usuario: ListaUser;
                  usuario = Object(user);
                  if (
                    data.username == usuario.user &&
                    data.pass == usuario.password
                  ) {
                    this.confirmacionEliminacionUsuario(usuario);
                  } else {
                    this.presentToast(
                      "Las credenciales ingresadas NO pertenecen a ningún usuario registrado"
                    );
                  }
                })
                .catch(error => {
                  this.presentToast(error);
                });
            }
          }
        }
      ]
    });
    await alert.present().then(() => {
      document.getElementById("username").focus();
    });
  }

  async confirmacionEliminacionUsuario(usuario: ListaUser) {
    let alert = await this.alertCtrl.create({
      header: "Está seguro que desea eliminar este usuario?",
      subHeader:
        'Si se dá de baja a este usuario, no podrá usar GlucoDiario y sus datos serán borrados del sistema.<br><br> Si no está seguro del procedimiento "carcelar" para salir',
      cssClass: "alerteliminacion",
      buttons: [
        {
          text: "Cancelar",
          handler: () => {
            //  Se cancela la eliminacion del usuario y retorna a la pagina de login
          }
        },
        {
          text: "Eliminar",
          handler: () => {
            // En esta parte ya se procese a eliminar el usuario
            this.glucoService.eliminarUsuario(usuario);
            this.presentToast(
              'El usuario "' + usuario.user + '" fué eliminada con éxito'
            );
            this.navCtrl.navigateBack("/login");
          }
        }
      ]
    });
    await alert.present();
  }

  // -------------------------------------

  abrirManual() {
    let filename: string = 'Manual.pdf';
    this.file.copyFile(this.file.applicationDirectory + 'www/assets/', filename, this.file.externalCacheDirectory, filename)
      .then(_ => {
        this.fileOpener.open(this.file.externalCacheDirectory + filename, 'application/pdf')
          .then(_ => {
            console.log('Todo bien');
          })
          .catch(e => this.presentToast("Error opening file: " + JSON.stringify(e)));
      })
      .catch(e => {
        this.presentToast("Error copying file: " + JSON.stringify(e));
      });
  }

  toggleMenu() {
    this.menu.toggle();
  }

  openPage(opcion: string) {
    switch (opcion) {
      case "registro":
        this.agregarUsuario("", "", "", "", "");
        this.menu.toggle();
        break;

      case "eliminarUsuario":
        this.eliminarUsuario();
        break;

      default:
        break;
    }
  }
}
