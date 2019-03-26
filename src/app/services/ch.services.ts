import { Injectable } from '@angular/core';
import { StatusBar } from '@ionic-native/status-bar/ngx';



@Injectable({ providedIn: 'root' })

export class CHService {

    carbohidratos: Carbohidratos[] = [
        {
            id:1,
            nombre: "Almojábana",
            medida: "1 unidad mediana",
            grPorcion: 100,
            gramos: 30,
            imagen: "assets/imgs/alimentos/almojabana.jpg",
            unidadPorcion: "gr",
            unidad: "gr",
            materia: "carbohidratos"
        },
        {
            id: 2,
            nombre: "Amaranto cocido",
            medida: "8 cucharadas soperas cocidas",
            grPorcion: 80,
            gramos: 15,
            imagen: "assets/imgs/alimentos/amaranto.jpg",
            unidadPorcion: "gr",
            unidad: "gr",
            materia: "carbohidratos"
        },
        {
            id: 3,
            nombre: "Arepa de maiz blanco cocido",
            medida: "1 unidad del tamaño de un CD y de 1/2 cm de grosor",
            grPorcion: 80,
            gramos:30,
            imagen: "assets/imgs/alimentos/arepademaizblancococido.jpg",
            unidadPorcion: "gr",
            unidad: "gr",
            materia: "carbohidratos"
        },
        {
            id: 4,
            nombre: "Arepa paisa",
            medida: "1 unidad del tamaño de un CD delgado",
            grPorcion: 40,
            gramos: 15,
            imagen: "assets/imgs/alimentos/arepapaisa.jpg",
            unidadPorcion: "gr",
            unidad: "gr",
            materia: "carbohidratos"
        },
        {
            id: 5,
            nombre: "Arepa redonda pequeña",
            medida: "1 unidad",
            grPorcion: 30,
            gramos: 10,
            imagen: "assets/imgs/alimentos/areparedondapequeña.jpg",
            unidadPorcion: "gr",
            unidad: "gr",
            materia: "carbohidratos"
        },
        {
            id: 6,
            nombre: "Arroz cocido",
            medida: "1 taza",
            grPorcion: 150,
            gramos: 45,
            imagen: "assets/imgs/alimentos/arrozcocido.jpg",
            unidadPorcion: "gr",
            unidad: "gr",
            materia: "carbohidratos"
        },
        {
            id: 7,
            nombre: "Avena cruda en hojuelas",
            medida: "3 cucharadas soperas rasas",
            grPorcion: 20,
            gramos: 15,
            imagen: "assets/imgs/alimentos/avenacrudaenhojuelas.jpg",
            unidadPorcion: "gr",
            unidad: "gr",
            materia: "carbohidratos"
        },
        {
            id: 8,
            nombre: "Buñuelo",
            medida: "1 unidad mediana",
            grPorcion: 80,
            gramos: 30,
            imagen: "assets/imgs/alimentos/buñuelo.jpg",
            unidadPorcion: "gr",
            unidad: "gr",
            materia: "carbohidratos"
        },
        {
            id: 9,
            nombre: "Cereal integral fitness (Nestle)",
            medida: "Una bolsa de tamaño personal",
            grPorcion: 35,
            gramos: 29,
            imagen: "assets/imgs/alimentos/cerealintegralfitness.jpg",
            unidadPorcion: "gr",
            unidad: "gr",
            materia: "carbohidratos"
        },
        {
            id: 10,
            nombre: "Cereal Corn flakes",
            medida: "1/2 taza",
            grPorcion: 19,
            gramos: 15,
            imagen: "assets/imgs/alimentos/cerealcornflakes.jpg",
            unidadPorcion: "gr",
            unidad: "gr",
            materia: "carbohidratos"
        },
        {
            id: 11,
            nombre: "Cebada Perlada cocida",
            medida: "3 cucharadas soperas rasas",
            grPorcion: 30,
            gramos: 23,
            imagen: "assets/imgs/alimentos/cebadaperladacocida.jpg",
            unidadPorcion: "gr",
            unidad: "gr",
            materia: "carbohidratos"
        },
        {
            id: 12,
            nombre: "Cuscus cocido",
            medida: "1 taza",
            grPorcion: 160,
            gramos: 45,
            imagen: "assets/imgs/alimentos/cuscuscocido.jpg",
            unidadPorcion: "gr",
            unidad: "gr",
            materia: "carbohidratos"
        },
        {
            id: 13,
            nombre: "Croissant mantequilla o queso",
            medida: "1 unidad mediana",
            grPorcion: 70,
            gramos: 33,
            imagen: "assets/imgs/alimentos/croissantmantequillaoqueso.jpg",
            unidadPorcion: "gr",
            unidad: "gr",
            materia: "carbohidratos"
        },
        {
            id: 14,
            nombre: "Empanada",
            medida: "1 unidad mediana",
            grPorcion: 52,
            gramos: 30,
            imagen: "assets/imgs/alimentos/empanada.jpg",
            unidadPorcion: "gr",
            unidad: "gr",
            materia: "carbohidratos"
        },
        {
            id: 15,
            nombre: "Envuelto de mazorca",
            medida: "1 unidad mediana",
            grPorcion: 100,
            gramos: 30,
            imagen: "assets/imgs/alimentos/envueltodemazorca.jpg",
            unidadPorcion: "gr",
            unidad: "gr",
            materia: "carbohidratos"
        }
        ,
        {
            id: 16,
            nombre: "Fécula de maíz",
            medida: "4 cucharadas soperas rasas",
            grPorcion: 30,
            gramos: 24,
            imagen: "assets/imgs/alimentos/feculademaiz.jpg",
            unidadPorcion: "gr",
            unidad: "gr",
            materia: "carbohidratos"
        }
        ,
        {
            id: 17,
            nombre: "Galleta de soda, saltina o integral",
            medida: "3 unidades",
            grPorcion: 20,
            gramos: 15,
            imagen: "assets/imgs/alimentos/galletadesodasaltinaointegral.jpg",
            unidadPorcion: "gr",
            unidad: "gr",
            materia: "carbohidratos"
        }
        ,
        {
            id: 18,
            nombre: "Granola",
            medida: "1/2 taza",
            grPorcion: 45,
            gramos: 30,
            imagen: "assets/imgs/alimentos/granola.jpg",
            unidadPorcion: "gr",
            unidad: "gr",
            materia: "carbohidratos"
        }
        ,
        {
            id: 19,
            nombre: "Harina de trigo",
            medida: "3 cucharadas soperas rasas",
            grPorcion: 20,
            gramos: 15,
            imagen: "assets/imgs/alimentos/harinadetrigo.jpg",
            unidadPorcion: "gr",
            unidad: "gr",
            materia: "carbohidratos"
        }
        ,
        {
            id: 20,
            nombre: "Crispeta/Palomitas de maíz",
            medida: "1 taza",
            grPorcion: 12,
            gramos: 5,
            imagen: "assets/imgs/alimentos/maizpirapreparado.jpg",
            unidadPorcion: "gr",
            unidad: "gr",
            materia: "carbohidratos"
        }
        ,
        {
            id: 21,
            nombre: "Mantecada/Ponqué/Torta sin crema",
            medida: "1 tajada mediana",
            grPorcion: 63,
            gramos: 35,
            imagen: "assets/imgs/alimentos/tortasincrema.jpg",
            unidadPorcion: "gr",
            unidad: "gr",
            materia: "carbohidratos"
        }
        ,
        {
            id: 22,
            nombre: "Mazorca cocida",
            medida: "1 unidad grande",
            grPorcion: 150,
            gramos: 30,
            imagen: "assets/imgs/alimentos/mazorcacocida.jpg",
            unidadPorcion: "gr",
            unidad: "gr",
            materia: "carbohidratos"
        }
        ,
        {
            id: 23,
            nombre: "Mazorca desgranada",
            medida: "1 cucharada sopera rasa",
            grPorcion: 15,
            gramos: 3,
            imagen: "assets/imgs/alimentos/mazorcadesgranada.jpg",
            unidadPorcion: "gr",
            unidad: "gr",
            materia: "carbohidratos"
        }
        ,
        {
            id: 24,
            nombre: "Pan tajado blanco/centeno/integral",
            medida: "1 tajada",
            grPorcion: 30,
            gramos: 15,
            imagen: "assets/imgs/alimentos/pantajadoblanco.jpg",
            unidadPorcion: "gr",
            unidad: "gr",
            materia: "carbohidratos"
        }
        ,
        {
            id: 25,
            nombre: "Pan blandito/rollo",
            medida: "1 unidad pequeña",
            grPorcion: 40,
            gramos: 20,
            imagen: "assets/imgs/alimentos/panblandito.jpg",
            unidadPorcion: "gr",
            unidad: "gr",
            materia: "carbohidratos"
        }
        ,
        {
            id: 26,
            nombre: "Pancake",
            medida: "1 unidad del tamaño de un CD y 1/2 cm de grosor",
            grPorcion: 30,
            gramos: 15,
            imagen: "assets/imgs/alimentos/pancake.jpg",
            unidadPorcion: "gr",
            unidad: "gr",
            materia: "carbohidratos"
        }
        ,
        {
            id: 27,
            nombre: "Pan perro",
            medida: "1 unidad mediana",
            grPorcion: 68,
            gramos: 35,
            imagen: "assets/imgs/alimentos/panperro.jpg",
            unidadPorcion: "gr",
            unidad: "gr",
            materia: "carbohidratos"
        }
        ,
        {
            id: 28,
            nombre: "Pan hamburguesa",
            medida: "1 unidad mediana",
            grPorcion: 92,
            gramos: 45,
            imagen: "assets/imgs/alimentos/panhamburguesa.jpg",
            unidadPorcion: "gr",
            unidad: "gr",
            materia: "carbohidratos"
        }
        ,
        {
            id: 29,
            nombre: "Pan de bono",
            medida: "1 unidad mediana",
            grPorcion: 40,
            gramos: 30,
            imagen: "assets/imgs/alimentos/pandebono.jpg",
            unidadPorcion: "gr",
            unidad: "gr",
            materia: "carbohidratos"
        }
        ,
        {
            id: 30,
            nombre: "Pan de yuca",
            medida: "1 unidad grande",
            grPorcion: 70,
            gramos: 30,
            imagen: "assets/imgs/alimentos/pandeyuca.jpg",
            unidadPorcion: "gr",
            unidad: "gr",
            materia: "carbohidratos"
        }
        ,
        {
            id: 31,
            nombre: "Pan pita",
            medida: "1 unidad del tamaño de un CD",
            grPorcion: 50,
            gramos: 30,
            imagen: "assets/imgs/alimentos/panpita.jpg",
            unidadPorcion: "gr",
            unidad: "gr",
            materia: "carbohidratos"
        }
        ,
        {
            id: 32,
            nombre: "Pasta",
            medida: "1 taza",
            grPorcion: 94,
            gramos: 45,
            imagen: "assets/imgs/alimentos/pasta.jpg",
            unidadPorcion: "gr",
            unidad: "gr",
            materia: "carbohidratos"
        },
        {
            id: 33,
            nombre: "Tostada/calado",
            medida: "1 unidad pequeña",
            grPorcion: 13,
            gramos: 10,
            imagen: "assets/imgs/alimentos/tostada.jpg",
            unidadPorcion: "gr",
            unidad: "gr",
            materia: "carbohidratos"
        }
        ,
        {
            id: 34,
            nombre: "Tortilla mexicana",
            medida: "1 unidad mediana",
            grPorcion: 30,
            gramos: 15,
            imagen: "assets/imgs/alimentos/tortillamexicana.jpg",
            unidadPorcion: "gr",
            unidad: "gr",
            materia: "carbohidratos"
        }
        ,
        {
            id: 35,
            nombre: "Taco mexicano vacío",
            medida: "1 unidad",
            grPorcion: 13,
            gramos: 8,
            imagen: "assets/imgs/alimentos/tacomexicanovacio.jpg",
            unidadPorcion: "gr",
            unidad: "gr",
            materia: "carbohidratos"
        }
        ,
        {
            id: 36,
            nombre: "Quinua cocida",
            medida: "7 cucharadas soperas rasas",
            grPorcion: 70,
            gramos: 15,
            imagen: "assets/imgs/alimentos/quinuacocida.jpg",
            unidadPorcion: "gr",
            unidad: "gr",
            materia: "carbohidratos"
        }
        ,
        {
            id: 37,
            nombre: "Waffle",
            medida: "1 unidad rectangular de 14cm x 7cm",
            grPorcion: 45,
            gramos: 15,
            imagen: "assets/imgs/alimentos/waffle.jpg",
            unidadPorcion: "gr",
            unidad: "gr",
            materia: "carbohidratos"
        }
        ,
        {
            id: 38,
            nombre: "Arracacha",
            medida: "1/2 unidad mediana",
            grPorcion: 75,
            gramos: 15,
            imagen: "assets/imgs/alimentos/arracacha.jpg",
            unidadPorcion: "gr",
            unidad: "gr",
            materia: "carbohidratos"
        }
        ,
        {
            id: 39,
            nombre: "Papa común",
            medida: " 1 unidad mediana",
            grPorcion: 77,
            gramos: 15,
            imagen: "assets/imgs/alimentos/papacomun.jpg",
            unidadPorcion: "gr",
            unidad: "gr",
            materia: "carbohidratos"
        }
        ,
        {
            id: 40,
            nombre: "Papa criolla",
            medida: "3 unidades pequeñas",
            grPorcion: 84,
            gramos: 15,
            imagen: "assets/imgs/alimentos/papacriolla.jpg",
            unidadPorcion: "gr",
            unidad: "gr",
            materia: "carbohidratos"
        }
        ,
        {
            id: 41,
            nombre: "Papa francesa",
            medida: "20 unidades delgadas",
            grPorcion: 80,
            gramos: 30,
            imagen: "assets/imgs/alimentos/papafrancesa.jpg",
            unidadPorcion: "gr",
            unidad: "gr",
            materia: "carbohidratos"
        }
        ,
        {
            id: 42,
            nombre: "Plátano coli o Guinéo con cáscara",
            medida: "1 unidad pequeña",
            grPorcion: 145,
            gramos: 15,
            imagen: "assets/imgs/alimentos/platanocoli.jpg",
            unidadPorcion: "gr",
            unidad: "gr",
            materia: "carbohidratos"
        }
        ,
        {
            id: 43,
            nombre: "Plátano harton",
            medida: "1/2 unidad mediana o 4 tajadas medianas",
            grPorcion: 100,
            gramos: 30,
            imagen: "assets/imgs/alimentos/platanoharton.jpg",
            unidadPorcion: "gr",
            unidad: "gr",
            materia: "carbohidratos"
        }
        ,
        {
            id: 44,
            nombre: "Ñame",
            medida: "1 trozo mediano",
            grPorcion: 76,
            gramos: 15,
            imagen: "assets/imgs/alimentos/name.jpg",
            unidadPorcion: "gr",
            unidad: "gr",
            materia: "carbohidratos"
        }
        ,
        {
            id: 45,
            nombre: "Yuca",
            medida: "1 astilla pequeña",
            grPorcion: 48,
            gramos: 15,
            imagen: "assets/imgs/alimentos/yuca.jpg",
            unidadPorcion: "gr",
            unidad: "gr",
            materia: "carbohidratos"
        }
        ,
        {
            id: 46,
            nombre: "Ouyuco/Chuguas",
            medida: "7 unidades grandes",
            grPorcion: 118,
            gramos: 15,
            imagen: "assets/imgs/alimentos/chuguas.jpg",
            unidadPorcion: "gr",
            unidad: "gr",
            materia: "carbohidratos"
        }
        ,
        {
            id: 47,
            nombre: "Arveja seca cocida",
            medida: "1 taza",
            grPorcion: 150,
            gramos: 30,
            imagen: "assets/imgs/alimentos/arveja.jpg",
            unidadPorcion: "gr",
            unidad: "gr",
            materia: "carbohidratos"
        }
        ,
        {
            id: 48,
            nombre: "Frijol rojo cocido",
            medida: "1 taza",
            grPorcion: 150,
            gramos: 30,
            imagen: "assets/imgs/alimentos/frijolrojococido.jpg",
            unidadPorcion: "gr",
            unidad: "gr",
            materia: "carbohidratos"
        }
        ,
        {
            id: 49,
            nombre: "Garbanzo cocido",
            medida: "1 taza",
            grPorcion: 150,
            gramos: 30,
            imagen: "assets/imgs/alimentos/garbanzo.jpg",
            unidadPorcion: "gr",
            unidad: "gr",
            materia: "carbohidratos"
        }
        ,
        {
            id: 50,
            nombre: "Lenteja cocida",
            medida: "1 taza",
            grPorcion: 150,
            gramos: 30,
            imagen: "assets/imgs/alimentos/lentejacocida.jpg",
            unidadPorcion: "gr",
            unidad: "gr",
            materia: "carbohidratos"
        }

        ,
        {
            id: 51,
            nombre: "Carve cocido",
            medida: "1 taza",
            grPorcion: 100,
            gramos: 33,
            imagen: "assets/imgs/alimentos/carvecocido.jpg",
            unidadPorcion: "gr",
            unidad: "gr",
            materia: "carbohidratos"
        }
        ,
        {
            id: 52,
            nombre: "Bienestarina",
            medida: "1 cucharada sopera colmada",
            grPorcion: 20,
            gramos: 12,
            imagen: "assets/imgs/alimentos/bienestarina.jpg",
            unidadPorcion: "gr",
            unidad: "gr",
            materia: "carbohidratos"
        }
        ,
        {
            id: 53,
            nombre: "Colombiaharina",
            medida: "1 cucharada sopera colmada",
            grPorcion: 11,
            gramos: 7,
            imagen: "assets/imgs/alimentos/colombiharina.jpg",
            unidadPorcion: "gr",
            unidad: "gr",
            materia: "carbohidratos"
        }
        ,
        {
            id: 54,
            nombre: "Leche entera",
            medida: "1 vaso",
            grPorcion: 200,
            gramos: 10,
            imagen: "assets/imgs/alimentos/lecheentera.jpg",
            unidadPorcion: "ml",
            unidad: "gr",
            materia: "CHOS"
        }
        ,
        {
            id: 55,
            nombre: "Leche semidescremada",
            medida: "1 vaso",
            grPorcion: 200,
            gramos: 10,
            imagen: "assets/imgs/alimentos/lechesemidescremada.jpg",
            unidadPorcion: "ml",
            unidad: "gr",
            materia: "CHOS"
        }
        ,
        {
            id: 56,
            nombre: "Leche deslactosada",
            medida: "1 vaso",
            grPorcion: 200,
            gramos: 10,
            imagen: "assets/imgs/alimentos/lechedeslactosada.jpg",
            unidadPorcion: "ml",
            unidad: "gr",
            materia: "CHOS"
        }
        ,
        {
            id: 57,
            nombre: "Leche en polvo entera",
            medida: "3 cucharadas colmadas",
            grPorcion: 27,
            gramos: 10,
            imagen: "assets/imgs/alimentos/lecheenpolvoentera.jpg",
            unidadPorcion: "gr",
            unidad: "gr",
            materia: "CHOS"
        }
        ,
        {
            id: 58,
            nombre: "Yogurt Finesse",
            medida: "1 vaso",
            grPorcion: 180,
            gramos: 11,
            imagen: "assets/imgs/alimentos/yogurtfinesse.jpg",
            unidadPorcion: "ml",
            unidad: "gr",
            materia: "CHOS"
        }
        ,
        {
            id: 59,
            nombre: "Yogurt slight Colanta",
            medida: "1 vaso",
            grPorcion: 200,
            gramos: 12,
            imagen: "assets/imgs/alimentos/yogurtslightcolanta.jpg",
            unidadPorcion: "ml",
            unidad: "gr",
            materia: "CHOS"
        }
        ,
        {
            id: 60,
            nombre: "Yogurt Benecol",
            medida: "1 unidad",
            grPorcion: 100,
            gramos: 4,
            imagen: "assets/imgs/alimentos/yogurbenecol.jpg",
            unidadPorcion: "ml",
            unidad: "gr",
            materia: "CHOS"
        },
        {
            id: 61,
            nombre: "Avena Finesse",
            medida: "1 vaso",
            grPorcion: 250,
            gramos: 15,
            imagen: "assets/imgs/alimentos/avenafinesse.jpg",
            unidadPorcion: "ml",
            unidad: "gr",
            materia: "CHOS"
        }
        ,
        {
            id: 62,
            nombre: "Yogurt pasco - tipo postre - sin azucar",
            medida: "1 vaso",
            grPorcion: 150,
            gramos: 5,
            imagen: "assets/imgs/alimentos/yogurtpascotipopostresinazucar.jpg",
            unidadPorcion: "ml",
            unidad: "gr",
            materia: "CHOS"
        }
        ,
        {
            id: 63,
            nombre: "Yogurt San Fernando Light",
            medida: "1 vaso",
            grPorcion: 160,
            gramos: 10,
            imagen: "assets/imgs/alimentos/yogurtsanfernandolight.jpg",
            unidadPorcion: "ml",
            unidad: "gr",
            materia: "CHOS"
        }
        ,
        {
            id: 64,
            nombre: 'Yogurt Slim Natural "Doña Leche"',
            medida: "1 vaso",
            grPorcion: 200,
            gramos: 12,
            imagen: "assets/imgs/alimentos/yogurtslimnaturaldoñaleche.png",
            unidadPorcion: "ml",
            unidad: "gr",
            materia: "CHOS"
        }
        ,
        {
            id: 65,
            nombre: "Yogurt Dietético de Coolechera",
            medida: "1 vaso",
            grPorcion: 150,
            gramos: 10,
            imagen: "assets/imgs/alimentos/yogurtdieteticodecoolechera.jpg",
            unidadPorcion: "ml",
            unidad: "gr",
            materia: "CHOS"
        }
        ,
        {
            id: 66,
            nombre: "Helado Light Mimos",
            medida: "1 bola",
            grPorcion: 70,
            gramos: 18,
            imagen: "assets/imgs/alimentos/heladolightmimos.jpg",
            unidadPorcion: "gr",
            unidad: "gr",
            materia: "CHOS"
        }
        ,
        {
            id: 67,
            nombre: "Paleta light Robin Hood",
            medida: "1 unidad",
            grPorcion: 60,
            gramos: 20,
            imagen: "assets/imgs/alimentos/paletalightrobinhood.jpg",
            unidadPorcion: "gr",
            unidad: "gr",
            materia: "CHOS"
        }
        ,
        {
            id: 68,
            nombre: "Aguacate",
            medida: "1/4 de unidad mediana",
            grPorcion: 80,
            gramos: 35,
            imagen: "assets/imgs/alimentos/aguacate.jpg",
            unidadPorcion: "gr",
            unidad: "gr",
            materia: "carbohidratos"
        }
        ,
        {
            id: 69,
            nombre: "Anón",
            medida: "1 unidad pequeña",
            grPorcion: 150,
            gramos: 15,
            imagen: "assets/imgs/alimentos/anon.jpg",
            unidadPorcion: "gr",
            unidad: "gr",
            materia: "carbohidratos"
        }
        ,
        {
            id: 70,
            nombre: "Banano común (platanito)",
            medida: "1/2 unidad mediana",
            grPorcion: 100,
            gramos: 15,
            imagen: "assets/imgs/alimentos/bananocomun.jpg",
            unidadPorcion: "gr",
            unidad: "gr",
            materia: "carbohidratos"
        }
        ,
        {
            id: 71,
            nombre: "Banano bocadillo (manzano)",
            medida: "1 unidad pequeña",
            grPorcion: 70,
            gramos: 15,
            imagen: "assets/imgs/alimentos/bananomanzano.jpg",
            unidadPorcion: "gr",
            unidad: "gr",
            materia: "carbohidratos"
        }
        ,
        {
            id: 72,
            nombre: "Chirimoya",
            medida: "1/2 unidad mediana",
            grPorcion: 150,
            gramos: 15,
            imagen: "assets/imgs/alimentos/chirimoya.jpg",
            unidadPorcion: "gr",
            unidad: "gr",
            materia: "carbohidratos"
        }
        ,
        {
            id: 73,
            nombre: "Chontaduro",
            medida: "1 unidad pequeña",
            grPorcion: 27,
            gramos: 10,
            imagen: "assets/imgs/alimentos/chontaduro.jpg",
            unidadPorcion: "gr",
            unidad: "gr",
            materia: "carbohidratos"
        }
        ,
        {
            id: 74,
            nombre: "Ciruela común",
            medida: "3 unidades pequeñas",
            grPorcion: 116,
            gramos: 15,
            imagen: "assets/imgs/alimentos/ciruelacomun.jpg",
            unidadPorcion: "gr",
            unidad: "gr",
            materia: "carbohidratos"
        }
        ,
        {
            id: 75,
            nombre: "Ciruela importada",
            medida: "1 unidad mediana",
            grPorcion: 150,
            gramos: 15,
            imagen: "assets/imgs/alimentos/ciruelaimportada.jpg",
            unidadPorcion: "gr",
            unidad: "gr",
            materia: "carbohidratos"
        }
        ,
        {
            id: 76,
            nombre: "Ciruela pasa",
            medida: "3 unidades medianas",
            grPorcion: 25,
            gramos: 15,
            imagen: "assets/imgs/alimentos/ciruelapasa.jpg",
            unidadPorcion: "gr",
            unidad: "gr",
            materia: "carbohidratos"
        }
        ,
        {
            id: 77,
            nombre: "Coco",
            medida: "3 cucharadas postreras",
            grPorcion: 15,
            gramos: 2.0,
            imagen: "assets/imgs/alimentos/coco.jpg",
            unidadPorcion: "gr",
            unidad: "gr",
            materia: "carbohidratos"
        }
        ,
        {
            id: 125,
            nombre: "Curuba",
            medida: "6 unidades medianas",
            grPorcion: 238,
            gramos: 15,
            imagen: "assets/imgs/alimentos/curuba.jpg",
            unidadPorcion: "gr",
            unidad: "gr",
            materia: "carbohidratos"
        }
        ,
        {
            id: 78,
            nombre: "Durazno nacional",
            medida: "2 unidades pequeñas",
            grPorcion: 147,
            gramos: 15,
            imagen: "assets/imgs/alimentos/duraznonacional.jpg",
            unidadPorcion: "gr",
            unidad: "gr",
            materia: "carbohidratos"
        }
        ,
        {
            id: 79,
            nombre: "Durazno importado (Nectarin)",
            medida: "1 unidad mediana",
            grPorcion: 120,
            gramos: 15,
            imagen: "assets/imgs/alimentos/duraznoimportado.jpg",
            unidadPorcion: "gr",
            unidad: "gr",
            materia: "carbohidratos"
        }
        ,
        {
            id: 80,
            nombre: "Feijoa",
            medida: "2 unidades medianas",
            grPorcion: 125,
            gramos: 15,
            imagen: "assets/imgs/alimentos/feijoa.jpg",
            unidadPorcion: "gr",
            unidad: "gr",
            materia: "carbohidratos"
        }
        ,
        {
            id: 81,
            nombre: "Fresa",
            medida: "13 unidades pequeñas",
            grPorcion: 200,
            gramos: 15,
            imagen: "assets/imgs/alimentos/fresa.jpg",
            unidadPorcion: "gr",
            unidad: "gr",
            materia: "carbohidratos"
        }
        ,
        {
            id: 82,
            nombre: "Granadilla",
            medida: "2 unidades medianas",
            grPorcion: 225,
            gramos: 15,
            imagen: "assets/imgs/alimentos/granadilla.jpg",
            unidadPorcion: "gr",
            unidad: "gr",
            materia: "carbohidratos"
        }
        ,
        {
            id: 83,
            nombre: "Higo",
            medida: "3 unidades medianas",
            grPorcion: 360,
            gramos: 15,
            imagen: "assets/imgs/alimentos/higo.jpg",
            unidadPorcion: "gr",
            unidad: "gr",
            materia: "carbohidratos"
        }
        ,
        {
            id: 84,
            nombre: "Mandarina",
            medida: "1 unidad grande o 2 pequeñas",
            grPorcion: 230,
            gramos: 15,
            imagen: "assets/imgs/alimentos/mandarina.jpg",
            unidadPorcion: "gr",
            unidad: "gr",
            materia: "carbohidratos"
        }
        ,
        {
            id: 85,
            nombre: "Mango de azucar",
            medida: "1 unuidad pequeña",
            grPorcion: 165,
            gramos: 15,
            imagen: "assets/imgs/alimentos/mangodeazucar.jpg",
            unidadPorcion: "gr",
            unidad: "gr",
            materia: "carbohidratos"
        }
        ,
        {
            id: 86,
            nombre: "Mango Tommy",
            medida: "3/4 de taza",
            grPorcion: 107,
            gramos: 15,
            imagen: "assets/imgs/alimentos/mangotommy.jpg",
            unidadPorcion: "gr",
            unidad: "gr",
            materia: "carbohidratos"
        }
        ,
        {
            id: 87,
            nombre: "Manzana",
            medida: "1 unidad pequeña",
            grPorcion: 130,
            gramos: 15,
            imagen: "assets/imgs/alimentos/manzana.jpg",
            unidadPorcion: "gr",
            unidad: "gr",
            materia: "carbohidratos"
        }
        ,
        {
            id: 88,
            nombre: "Melón",
            medida: "1 taza",
            grPorcion: 150,
            gramos: 15,
            imagen: "assets/imgs/alimentos/melon.jpg",
            unidadPorcion: "gr",
            unidad: "gr",
            materia: "carbohidratos"
        }
        ,
        {
            id: 89,
            nombre: "Moras",
            medida: "22 unidades",
            grPorcion: 235,
            gramos: 15,
            imagen: "assets/imgs/alimentos/moras.jpg",
            unidadPorcion: "gr",
            unidad: "gr",
            materia: "carbohidratos"
        }
        ,
        {
            id: 90,
            nombre: "Níspero sin semillas",
            medida: "2 unidadesd pequeñas",
            grPorcion: 110,
            gramos: 15,
            imagen: "assets/imgs/alimentos/nisperosinsemillas.jpg",
            unidadPorcion: "gr",
            unidad: "gr",
            materia: "carbohidratos"
        }
        ,
        {
            id: 91,
            nombre: "Papaya",
            medida: "1 taza picada",
            grPorcion: 140,
            gramos: 15,
            imagen: "assets/imgs/alimentos/papaya.jpg",
            unidadPorcion: "gr",
            unidad: "gr",
            materia: "carbohidratos"
        }
        ,
        {
            id: 92,
            nombre: "Pera",
            medida: "1 unidad mediana",
            grPorcion: 100,
            gramos: 15,
            imagen: "assets/imgs/alimentos/pera.jpg",
            unidadPorcion: "gr",
            unidad: "gr",
            materia: "carbohidratos"
        }
        ,
        {
            id: 93,
            nombre: "Piña",
            medida: "1/2 taza picada o una tajada delgada",
            grPorcion: 120,
            gramos: 15,
            imagen: "assets/imgs/alimentos/pina.jpg",
            unidadPorcion: "gr",
            unidad: "gr",
            materia: "carbohidratos"
        }
        ,
        {
            id: 94,
            nombre: "Pitahaya o fruta del dragón",
            medida: "1 unidad grande",
            grPorcion: 220,
            gramos: 15,
            imagen: "assets/imgs/alimentos/pitahaya.jpg",
            unidadPorcion: "gr",
            unidad: "gr",
            materia: "carbohidratos"
        }
        ,
        {
            id: 95,
            nombre: "Sandia o Patilla",
            medida: "1 tajada delgada",
            grPorcion: 180,
            gramos: 15,
            imagen: "assets/imgs/alimentos/patilla.jpg",
            unidadPorcion: "gr",
            unidad: "gr",
            materia: "carbohidratos"
        }
        ,
        {
            id: 96,
            nombre: "Tamarindo",
            medida: "1 y 1/2 cucharadas soperas",
            grPorcion: 50,
            gramos: 15,
            imagen: "assets/imgs/alimentos/tamarindo.jpg",
            unidadPorcion: "gr",
            unidad: "gr",
            materia: "carbohidratos"
        }
        ,
        {
            id: 97,
            nombre: "Tomate de árbol",
            medida: "2 unidades grandes",
            grPorcion: 335,
            gramos: 15,
            imagen: "assets/imgs/alimentos/tomatedearbol.jpg",
            unidadPorcion: "gr",
            unidad: "gr",
            materia: "carbohidratos"
        }
        ,
        {
            id: 98,
            nombre: "Toronja",
            medida: "1 unidad grande",
            grPorcion: 335,
            gramos: 15,
            imagen: "assets/imgs/alimentos/toronja.jpg",
            unidadPorcion: "gr",
            unidad: "gr",
            materia: "carbohidratos"
        }
        ,
        {
            id: 99,
            nombre: "Uchuva",
            medida: "13 unidades",
            grPorcion: 75,
            gramos: 15,
            imagen: "assets/imgs/alimentos/uchuva.jpg",
            unidadPorcion: "gr",
            unidad: "gr",
            materia: "carbohidratos"
        }
        ,
        {
            id: 100,
            nombre: "Uva nacional",
            medida: "20 unidades",
            grPorcion: 205,
            gramos: 15,
            imagen: "assets/imgs/alimentos/uvanacional.jpg",
            unidadPorcion: "gr",
            unidad: "gr",
            materia: "carbohidratos"
        }
        ,
        {
            id: 101,
            nombre: "Zapote",
            medida: "1 unidad mediana",
            grPorcion: 410,
            gramos: 15,
            imagen: "assets/imgs/alimentos/Zapote.jpg",
            unidadPorcion: "gr",
            unidad: "gr",
            materia: "carbohidratos"
        }
        ,
        {
            id: 102,
            nombre: "Verdura cocida",
            medida: "1 taza",
            grPorcion: 185,
            gramos: 10,
            imagen: "assets/imgs/alimentos/verduracocida.jpg",
            unidadPorcion: "gr",
            unidad: "gr",
            materia: "carbohidratos"
        }
        ,
        {
            id: 103,
            nombre: "Verdura cruda",
            medida: "1 taza",
            grPorcion: 100,
            gramos: 5,
            imagen: "assets/imgs/alimentos/verduracruda.jpg",
            unidadPorcion: "gr",
            unidad: "gr",
            materia: "carbohidratos"
        }
        ,
        {
            id: 104,
            nombre: "Arroz con pollo",
            medida: "1 taza",
            grPorcion: 170,
            gramos: 38,
            imagen: "assets/imgs/alimentos/arrozconpollo.jpg",
            unidadPorcion: "gr",
            unidad: "gr",
            materia: "carbohidratos"
        }
        ,
        {
            id: 105,
            nombre: "Pizza (Zenú)",
            medida: "1 tajada mediana",
            grPorcion: 130,
            gramos: 35,
            imagen: "assets/imgs/alimentos/pizzazenu.jpg",
            unidadPorcion: "gr",
            unidad: "gr",
            materia: "carbohidratos"
        }
        ,
        {
            id: 106,
            nombre: "Lasagna (Zenú)",
            medida: "1 porción mediana",
            grPorcion: 445,
            gramos: 47,
            imagen: "assets/imgs/alimentos/lasagnazenu.jpg",
            unidadPorcion: "gr",
            unidad: "gr",
            materia: "carbohidratos"
        }
        ,
        {
            id: 107,
            nombre: "Hamburguesa de pan bimbo",
            medida: "1 unidad mediana",
            grPorcion: 210,
            gramos: 45,
            imagen: "assets/imgs/alimentos/hamburguesadepanbimbo.jpg",
            unidadPorcion: "gr",
            unidad: "gr",
            materia: "carbohidratos"
        }
        ,
        {
            id: 108,
            nombre: "Nuggets de pollo (Zenú)",
            medida: "5 unidades",
            grPorcion: 85,
            gramos: 14,
            imagen: "assets/imgs/alimentos/nuggetsdepollozenu.jpg",
            unidadPorcion: "gr",
            unidad: "gr",
            materia: "carbohidratos"
        }
        ,
        {
            id: 109,
            nombre: "Tamal santanderiano sin hojas",
            medida: "1 unidad mediana",
            grPorcion: 200,
            gramos: 75,
            imagen: "assets/imgs/alimentos/tamalsantanderianosinhojas.jpg",
            unidadPorcion: "gr",
            unidad: "gr",
            materia: "carbohidratos"
        }
        ,
        {
            id: 110,
            nombre: "Tamal tolimense sin hojas",
            medida: "1 unidad mediana",
            grPorcion: 325,
            gramos: 60,
            imagen: "assets/imgs/alimentos/tamatolimensesinhojas.jpg",
            unidadPorcion: "gr",
            unidad: "gr",
            materia: "carbohidratos"
        }
        ,
        {
            id: 111,
            nombre: "Salvado de trigo",
            medida: "5 cucharadas rasas",
            grPorcion: 50,
            gramos: 32,
            imagen: "assets/imgs/alimentos/salvadodetrigo.jpg",
            unidadPorcion: "gr",
            unidad: "gr",
            materia: "carbohidratos"
        }
        ,
        {
            id: 112,
            nombre: "All bran",
            medida: "5 cucharadas",
            grPorcion: 40,
            gramos: 30,
            imagen: "assets/imgs/alimentos/allbran.jpg",
            unidadPorcion: "gr",
            unidad: "gr",
            materia: "carbohidratos"
        }
        ,
        {
            id: 113,
            nombre: "Tostada bimbo",
            medida: "3 unidades",
            grPorcion: 31,
            gramos: 21,
            imagen: "assets/imgs/alimentos/tostadabimbo.jpg",
            unidadPorcion: "gr",
            unidad: "gr",
            materia: "carbohidratos"
        }
        ,
        {
            id: 114,
            nombre: "Paleta en agua  - Mimos Light",
            medida: "1 unidad",
            grPorcion: 70,
            gramos: 4,
            imagen: "assets/imgs/alimentos/paletaenaguamimoslight.jpg",
            unidadPorcion: "gr",
            unidad: "gr",
            materia: "carbohidratos"
        }
        ,
        {
            id: 115,
            nombre: "Papas fritas (Margarita)",
            medida: "1 paquete",
            grPorcion: 25,
            gramos: 12,
            imagen: "assets/imgs/alimentos/papasfritasmargarita.jpg",
            unidadPorcion: "gr",
            unidad: "gr",
            materia: "carbohidratos"
        }
        ,
        {
            id: 116,
            nombre: "Rosquitas Cronch",
            medida: "1 paquete ",
            grPorcion: 19,
            gramos: 13,
            imagen: "assets/imgs/alimentos/rosquitascronch.jpg",
            unidadPorcion: "gr",
            unidad: "gr",
            materia: "carbohidratos"
        }
        ,
        {
            id: 117,
            nombre: "Tajaditas de plátano verde (Natuchips)",
            medida: "1 paquete",
            grPorcion: 28,
            gramos: 20,
            imagen: "assets/imgs/alimentos/tajaditasdeplatanoverdenatuchip.jpg",
            unidadPorcion: "gr",
            unidad: "gr",
            materia: "carbohidratos"
        }
        ,
        {
            id: 118,
            nombre: "Insta Crem",
            medida: "1 sobre",
            grPorcion: 4,
            gramos: 3,
            imagen: "assets/imgs/alimentos/instacrem.jpg",
            unidadPorcion: "gr",
            unidad: "gr",
            materia: "carbohidratos"
        }
        ,
        {
            id: 119,
            nombre: "Choco Lyne",
            medida: "1 pastilla",
            grPorcion: 10,
            gramos: 3,
            imagen: "assets/imgs/alimentos/chocolyne.jpg",
            unidadPorcion: "gr",
            unidad: "gr",
            materia: "carbohidratos"
        }
        ,
        {
            id: 120,
            nombre: "Maní",
            medida: "1 paquete de 50gr",
            grPorcion: 50,
            gramos: 10,
            imagen: "assets/imgs/alimentos/mani.jpg",
            unidadPorcion: "gr",
            unidad: "gr",
            materia: "carbohidratos"
        }
        ,
        {
            id: 121,
            nombre: "Marañón",
            medida: "1 paquete",
            grPorcion: 40,
            gramos: 10,
            imagen: "assets/imgs/alimentos/maranon.jpg",
            unidadPorcion: "gr",
            unidad: "gr",
            materia: "carbohidratos"
        }
        ,
        {
            id: 122,
            nombre: "Mezcla de nueces",
            medida: "1 paquete",
            grPorcion: 50,
            gramos: 11,
            imagen: "assets/imgs/alimentos/mezcladenueces.jpg",
            unidadPorcion: "gr",
            unidad: "gr",
            materia: "carbohidratos"
        }
        ,
        {
            id: 123,
            nombre: "Barra granola SPORT lyne",
            medida: "1 unidad",
            grPorcion: 23,
            gramos: 16,
            imagen: "assets/imgs/alimentos/barragranolasportlyne.jpg",
            unidadPorcion: "gr",
            unidad: "gr",
            materia: "carbohidratos"
        }
        ,
        {
            id: 124,
            nombre: "Arequipe de Antaño Light",
            medida: "2 cucharadas rasas",
            grPorcion: 25,
            gramos: 13.5,
            imagen: "assets/imgs/alimentos/arequipedeantanolight.jpg",
            unidadPorcion: "gr",
            unidad: "gr",
            materia: "carbohidratos"
        }


    ];

    constructor(private statusBar: StatusBar){
        //localStorage.clear();
        this.statusBar.overlaysWebView(false);
        this.statusBar.show();
        // this.cargarStorage();
    }



}


export interface Carbohidratos {
    id:number;
    nombre: string;
    medida: string;
    gramos: number;
    grPorcion: number;
    imagen: string;
    unidadPorcion: string;
    unidad: string;
    materia: string;
}