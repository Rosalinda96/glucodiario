import { ListaItem } from "./lista-item.model";


export class Lista{
    id: number;
    titulo: string;
    creadaEn: Date;
    terminadaEn: Date;
    items: ListaItem[];

    constructor(titulo: string, items: ListaItem[] = []){
       this.titulo = titulo;
       this.creadaEn = new Date();
       this.id = new Date().getTime();
       this.items = items;

    }
}