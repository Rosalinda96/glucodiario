import { Injectable } from '@angular/core';
import { ListaUser } from '../modelos';




@Injectable({
  providedIn: "root"
})
export class LocalstorageService {
  ultimoLogueo: ListaUser[] = [];
  constructor() {
    this.cargarUltimoLogueo();
  }

  cargarUltimoLogueo() {
    if (localStorage.getItem("usuarioLogeado")) {
      this.ultimoLogueo = JSON.parse(localStorage.getItem("usuarioLogeado"));
    } else {
      this.ultimoLogueo = [];
    }
    return this.ultimoLogueo;
  }

  guardarUltimoLogueo() {
    localStorage.setItem("usuarioLogeado", JSON.stringify(this.ultimoLogueo));
  }
}
