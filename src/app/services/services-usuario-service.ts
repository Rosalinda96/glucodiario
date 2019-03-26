
import { Injectable } from '@angular/core';
import { ListaUser } from '../modelos';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: "root"
})
export class ServicesUsuarioServiceProvider {
  constructor(private afDB: AngularFireDatabase) {
    console.log("Hello ServicesUsuarioServiceProvider Provider");
  }

  getUsuarios() {
    return new Promise((resolve, reject) => {
      this.afDB.list("/usuarios/").valueChanges().subscribe(data => {
          if (data) {
            resolve(data);
          } else {
            reject("Error al conetarse a la base de datos");
          }
        });
    });
  }

  getUsuario(user){
    return new Promise((resolve, reject) => {
    this.afDB.object("/usuarios/" + user).valueChanges().subscribe(data => {
          if (data) {
            resolve(data);
          } else {
            reject("Este usario no se encontró en la base de datos");
          }
        });
    });
  }

  verificarUsuario(user: string) {
    return new Promise((resolve, reject) => {
      this.afDB.object("/usuarios/" + user).valueChanges().subscribe(data => {
          if (data) {
            resolve(data);
          } else {
            reject("no salió");
          }
        });
    });
  }

  crearUsuario(usuario: ListaUser) {
    this.afDB.database.ref("/usuarios/" + usuario.user).set(usuario);
  }

  editarUsuario(usuario: ListaUser) {
    let usuarioEditado = this.afDB.database.ref("/usuarios/" + usuario.user).set(usuario);
    if (usuarioEditado == undefined || usuarioEditado == null) {
      return false;
    } else {
      return true;
    }
  }

  eliminarUsuario(usuario: ListaUser) {
    return this.afDB.database.ref("/usuarios/" + usuario.user).remove();
  }
}
