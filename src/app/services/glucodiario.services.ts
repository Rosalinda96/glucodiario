import { Injectable } from "@angular/core";
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ListaUser, ListaItem, Lista } from '../modelos';
import { ServicesUsuarioServiceProvider } from './services-usuario-service';


@Injectable({ providedIn: 'root' })

export class GlucoService {
  listas: Lista[] = [];
  lista: Lista;
  listaUser: ListaUser[] = [];
  datosUser: ListaUser;
  grlucometrias: ListaItem[] = [];
  items: ListaItem[] = [];
  item:ListaItem;
  ultimoLogueo: ListaUser[] = [];

  constructor(private statusBar: StatusBar, private usuarioService: ServicesUsuarioServiceProvider) {
    //localStorage.clear();
    this.statusBar.overlaysWebView(false);
    this.statusBar.show();
    this.cargarStorage();
    this.cargarUltimoLogueo();
  }

  guardarStorage() {
    localStorage.setItem("data", JSON.stringify(this.listaUser));
  }

  cargarStorage() {
    if (localStorage.getItem("data")) {
      this.listaUser = JSON.parse(localStorage.getItem("data"));
    } else {
      this.listaUser = [];
    }
    return this.listaUser;
  }


  cargarUltimoLogueo(){
    if (localStorage.getItem("dataLogueo")) {
      this.ultimoLogueo = JSON.parse(localStorage.getItem("dataLogueo"));
    } else {
      this.ultimoLogueo = [];
    }
    return this.ultimoLogueo;
  }


  guardarUltimoLogueo(){
    localStorage.setItem("dataLogueo", JSON.stringify(this.ultimoLogueo));
  }


  agregarUser(listaUser: ListaUser) {
    //listaUser = this.exportarLista();
    this.listaUser.push(listaUser);
    this.cargarUltimoLogueo().push(listaUser);
    this.guardarUltimoLogueo();
    return this.cargarUltimoLogueo()[0]
  }

  agregarLista(data: string, listas: Lista[], datosUser: ListaUser) {
    
    this.lista = new Lista(data);
    listas.push(this.lista);

    this.datosUser = new ListaUser(datosUser.user, datosUser.password, datosUser.nombres, datosUser.apellidos, datosUser.tipoDiabetes, datosUser.insulinatotal, listas); 
                                  
    datosUser = this.datosUser;
    this.cargarUltimoLogueo().pop();
    this.guardarUltimoLogueo();
    this.cargarUltimoLogueo().push(datosUser);
    this.guardarUltimoLogueo();
      return;
  }

  borrarlista(lista: Lista, datosUser: ListaUser, indexLista: number) {

    datosUser.lista.splice(indexLista, 1);
    this.cargarUltimoLogueo()[0].lista.splice(indexLista, 1);
    this.guardarUltimoLogueo();
    return;
  }

  editarLista(datosUser: ListaUser, indexLista: number, tituloLista: string) {
    datosUser.lista[indexLista].titulo = tituloLista;
    this.cargarUltimoLogueo()[0].lista[indexLista].titulo = tituloLista;
    this.guardarUltimoLogueo();
    return;
  }

  // =====================

  agregarDia(datosUser: ListaUser, lista: Lista, indexLista: number, nuevoDia: ListaItem) {

    if (datosUser.lista[indexLista].items == undefined){
      console.log('Entró en el if');
      datosUser.lista[indexLista].items = [];
      datosUser.lista[indexLista].items.push(nuevoDia);
      this.cargarUltimoLogueo()[0] = datosUser;
      this.guardarUltimoLogueo();
    }else{
      console.log('Entro en el else');
      datosUser.lista[indexLista].items.push(nuevoDia);
      this.cargarUltimoLogueo()[0].lista[indexLista].items.push(nuevoDia);
      this.guardarUltimoLogueo();
    }
    
     return;
  }

  // ===========================

  borrarDia(datosUser: ListaUser, indexLista: number, indexItem: number){
    datosUser.lista[indexLista].items.splice(indexItem, 1);
    this.cargarUltimoLogueo()[0].lista[indexLista].items.splice(indexItem, 1);
    this.guardarUltimoLogueo();
    return;
  }


  agregarHora(datosUser: ListaUser, listaItem: ListaItem, hora: string, indexLista: number){
    
    listaItem.horaGlucometria = hora;
    
    for (let i = 0; i < this.cargarUltimoLogueo()[0].lista[indexLista].items.length; i++){
      if (this.cargarUltimoLogueo()[0].lista[indexLista].items[i].id == listaItem.id){
        datosUser.lista[indexLista].items[i] = listaItem;
        this.cargarUltimoLogueo()[0].lista[indexLista].items[i] = listaItem;
        this.guardarUltimoLogueo();
        return;
       }
    }
  }

  agregarValorGlucometria(datosUser: ListaUser, listaItem: ListaItem, valorGlucometria: string, indexLista: number){

    listaItem.valorColorNota = valorGlucometria;

    for (let i = 0; i < this.cargarUltimoLogueo()[0].lista[indexLista].items.length; i++) {
      if (this.cargarUltimoLogueo()[0].lista[indexLista].items[i].id == listaItem.id) {
        datosUser.lista[indexLista].items[i] = listaItem;
        this.cargarUltimoLogueo()[0].lista[indexLista].items[i] = listaItem;
        this.guardarUltimoLogueo();

        if (parseInt(listaItem.valorGlucometria) > 150) {
          listaItem.colorValor = "#FE2E2E";
          datosUser.lista[indexLista].items[datosUser.lista[indexLista].items.length - 1].colorValor = "#FE2E2E";
          this.cargarUltimoLogueo()[0].lista[indexLista].items[datosUser.lista[indexLista].items.length - 1].colorValor = "#FE2E2E";
          this.guardarUltimoLogueo();
        } else if (parseInt(listaItem.valorGlucometria) <= 150 && parseInt(listaItem.valorGlucometria) >= 80) {
          listaItem.colorValor = "#81F781";
          datosUser.lista[indexLista].items[datosUser.lista[indexLista].items.length - 1].colorValor = "#81F781";
          this.cargarUltimoLogueo()[0].lista[indexLista].items[datosUser.lista[indexLista].items.length - 1].colorValor = "#81F781";
          this.guardarUltimoLogueo();
        } else {
          listaItem.colorValor = "#81DAF5";
          datosUser.lista[indexLista].items[datosUser.lista[indexLista].items.length - 1].colorValor = "#81DAF5";
          this.cargarUltimoLogueo()[0].lista[indexLista].items[datosUser.lista[indexLista].items.length - 1].colorValor = "#81DAF5";
          this.guardarUltimoLogueo();
        }
        return;
      }
    }
  }

  agregarNota(datosUser: ListaUser, lista: Lista, indexLista: number, listaItem: ListaItem, nota: string, indexItem: number){
    datosUser.lista[indexLista].items[indexItem].desc = nota;
    this.cargarUltimoLogueo()[0].lista[indexLista].items[indexItem].desc = nota;
    this.guardarUltimoLogueo();
    if (this.cargarUltimoLogueo()[0].lista[indexLista].items[indexItem].desc.length <= 0) {
          listaItem.valorColorNota = "#FFFFFF";
          datosUser.lista[datosUser.lista.indexOf(lista)].items[indexItem].valorColorNota = "#FFFFFF";
          this.cargarUltimoLogueo()[0].lista[datosUser.lista.indexOf(lista)].items[indexItem].valorColorNota = "#FFFFFF";
          this.guardarUltimoLogueo();
        } else {
          listaItem.valorColorNota = "#D0A9F5";
          datosUser.lista[datosUser.lista.indexOf(lista)].items[indexItem].valorColorNota = "#D0A9F5";
          this.cargarUltimoLogueo()[0].lista[datosUser.lista.indexOf(lista)].items[indexItem].valorColorNota = "#D0A9F5";
          this.guardarUltimoLogueo();
        }
        return;
  }



  editarDia(datosUser: ListaUser, lista: Lista, indexLista: number, dia: ListaItem, nombre: string, indexItem: number) {
    console.log(indexItem);
    datosUser.lista[indexLista].items[indexItem].nombre = nombre;
    this.cargarUltimoLogueo()[0].lista[indexLista].items[indexItem].nombre = nombre;
    this.guardarUltimoLogueo();
    return;
  }

  editarHora(datosUser: ListaUser, indexLista:number, indexItem: number, item: ListaItem, hora: string,){
    datosUser.lista[indexLista].items[indexItem].horaGlucometria = hora;
    this.cargarUltimoLogueo()[0].lista[indexLista].items[indexItem].horaGlucometria = hora;
    this.guardarUltimoLogueo();
    return;
  }

  editarValorGlucometria(datosUser: ListaUser, listaItem: ListaItem, valorGlucometria: string, indexLista: number, indexItem: number){

    datosUser.lista[indexLista].items[indexItem].valorGlucometria = valorGlucometria;
    this.cargarUltimoLogueo()[0].lista[indexLista].items[indexItem].valorGlucometria = valorGlucometria;
    this.guardarUltimoLogueo();

    if (parseInt(datosUser.lista[indexLista].items[indexItem].valorGlucometria) > 150){
      datosUser.lista[indexLista].items[indexItem].colorValor = "#FE2E2E";
      this.cargarUltimoLogueo()[0].lista[indexLista].items[indexItem].colorValor = "#FE2E2E";
    } else if (parseInt(datosUser.lista[indexLista].items[indexItem].valorGlucometria) <= 150 && parseInt(datosUser.lista[indexLista].items[indexItem].valorGlucometria) >= 80){
      datosUser.lista[indexLista].items[indexItem].colorValor = "#81F781";
      this.cargarUltimoLogueo()[0].lista[indexLista].items[indexItem].colorValor = "#81F781";
    }else{
      datosUser.lista[indexLista].items[indexItem].colorValor = "#81DAF5";
      this.cargarUltimoLogueo()[0].lista[indexLista].items[indexItem].colorValor = "#81DAF5";
    }
    this.guardarUltimoLogueo();
    return;
  }


  eliminarUsuario(user: ListaUser){
    this.cargarUltimoLogueo().pop();
    this.guardarUltimoLogueo();
    this.usuarioService.eliminarUsuario(user);
  }

  exportardatosUsuarioEditar(user: string){
    let usuario: ListaUser;
    for (let i = 0; i < this.exportarLista().length; i++) {
      if (this.exportarLista()[i].user === user) {
        usuario = this.exportarLista()[i];
        break;
      } else {
      }
    }
    return usuario;
  }

  editarUsuario(user: string, nombre: string, ape: string, pass: string){
    for (let i = 0; i < this.exportarLista().length; i++) {
      if (this.exportarLista()[i].user === user) {

        this.exportarLista()[i].nombres = nombre;
        this.guardarStorage();
        this.exportarLista()[i].apellidos = ape;
        this.guardarStorage();
        this.exportarLista()[i].password = pass;
        
        this.guardarStorage();
        this.cargarStorage();
        break;
      } else {
        console.log("No se encontró");
      }
    }
  }

  editarInsulinaTotal(datosUser: ListaUser, insulinaTotal: number){
    datosUser.insulinatotal = insulinaTotal;
    datosUser.ratio = Math.floor(450 / insulinaTotal);
    datosUser.sensibilidad = Math.floor(1800 / insulinaTotal);
    this.cargarUltimoLogueo()[0].insulinatotal = insulinaTotal;
    this.guardarUltimoLogueo();
    this.cargarUltimoLogueo()[0].ratio = Math.floor(450 / insulinaTotal);
    this.guardarUltimoLogueo();
    this.cargarUltimoLogueo()[0].sensibilidad = Math.floor(1800 / insulinaTotal);
    this.guardarUltimoLogueo();

    this.usuarioService.editarUsuario(datosUser);
  }

  exportarLista() {
    this.cargarStorage();
    return this.listaUser;
  }

}
