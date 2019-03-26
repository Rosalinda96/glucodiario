

export class ListaItem{
  id: number;
    nombre: string
    desc: string;
    seleccionHG: boolean;
    seleccionVG: boolean;
    horaGlucometria: string;
    valorGlucometria: string
    valorColorNota: string;
    colorValor: string;
    promedio: number;

    constructor(nombre: string){
      this.nombre = nombre;
      this.desc = '';
      this.seleccionHG = false;
      this.seleccionVG = false;
      this.id = new Date().getTime();
    }
}