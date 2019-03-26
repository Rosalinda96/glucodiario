import { Lista } from './lista.model';


export class ListaUser {
         id: number;
         nombres: string;
         apellidos: string;
         fechaNacimiento: Date;
         tipoDiabetes: string;
         insulinatotal: number;
         user: string;
         password: string;
         ratio: number;
         sensibilidad: number;
         lista: Lista[];

  constructor(user: string, password: string, nombres: string, apellidos: string, tipoDiabetes: string, insulinatotal: number = 40, lista: Lista[] = []) {
           this.user = user;
           this.password = password;
           this.nombres = nombres;
           this.apellidos = apellidos;
           this.tipoDiabetes = tipoDiabetes;
           this.id = new Date().getTime();
           this.insulinatotal = insulinatotal;
           this.ratio = Math.floor(450 / this.insulinatotal);
           this.sensibilidad = Math.floor(1800 / this.insulinatotal);
           this.lista = lista;
         }
       }


;
