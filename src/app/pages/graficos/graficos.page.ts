import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart } from "chart.js";
import { NavController } from '@ionic/angular';
import { GlucoService } from 'src/app/services/glucodiario.services';
import { Lista, ListaUser } from 'src/app/modelos';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: "app-graficos",
  templateUrl: "./graficos.page.html",
  styleUrls: ["./graficos.page.scss"]
})
export class GraficosPage implements OnInit {
  indiceLista: number;

  grafico: Lista;
  arregloGlucometrias: any[] = [];
  arregloDias: any[] = [];

  graficoPasado: Lista;
  // numeroMesAnterior: number;
  arregloGlucometriasAnterior: any[] = [];
  arregloDiasAnterior: any[] = [];

  @ViewChild('lineCanvas') lineCanvas;
  @ViewChild('barCanvas') barCanvas;
  @ViewChild('pieCanvas') pieCanvas;
  @ViewChild('doughnutCanvas') doughnutCanvas;

  barChart: any;
  lineChart: any;
  pieChart: any;
  doughnutChart: any;
  datosUser: ListaUser;

  colorGluco: string;
  arregloColorGluco: string[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private glucoServices: GlucoService
  ) {
    this.datosUser = this.glucoServices.cargarUltimoLogueo()[0];
    this.indiceLista = Number(this.activatedRoute.snapshot.paramMap.get("indiceLista"));
    this.graficoPasado = this.datosUser.lista[this.indiceLista - 1];
    this.grafico = this.glucoServices.cargarUltimoLogueo()[0].lista[this.indiceLista];


    this.grafico.items.forEach(element => {
      let horaAbreviada: string = "";
      if (element.horaGlucometria == "Antes de desayuno") {
        horaAbreviada = "Des-";
      } else if (element.horaGlucometria == "Despues de desayuno") {
        horaAbreviada = "Des+";
      } else if (element.horaGlucometria == "Antes de Almuerzo") {
        horaAbreviada = "Alm-";
      } else if (element.horaGlucometria == "Despues de Almuerzo") {
        horaAbreviada = "Alm+";
      } else if (element.horaGlucometria == "Antes de Cena") {
        horaAbreviada = "Cena-";
      } else if (element.horaGlucometria == "Despues de Cena") {
        horaAbreviada = "Cena+";
      }
      this.arregloDias.push(element.nombre + " " + horaAbreviada);
    });


    // Llenando el areglo de glucometrias
    this.grafico.items.forEach(element => {
      //convertir la glucometrias en numerico
      let glucoNumerico: number = parseInt(element.valorGlucometria);
      this.arregloGlucometrias.push(glucoNumerico);

      // condicion para asignar color a glucometria
      if (parseInt(element.valorGlucometria) <= 20) {
        this.colorGluco = "#8605F7";
      } else if (parseInt(element.valorGlucometria) > 20 && parseInt(element.valorGlucometria) <= 30) {
        this.colorGluco = "#7B05F7";
      } else if (parseInt(element.valorGlucometria) > 30 && parseInt(element.valorGlucometria) <= 40) {
        this.colorGluco = "#5A05F7";
      } else if (parseInt(element.valorGlucometria) > 40 && parseInt(element.valorGlucometria) <= 50) {
        this.colorGluco = "#1B05F7";
      } else if (parseInt(element.valorGlucometria) > 50 && parseInt(element.valorGlucometria) <= 60) {
        this.colorGluco = "#054BF7";
      } else if (parseInt(element.valorGlucometria) > 60 && parseInt(element.valorGlucometria) <= 70) {
        this.colorGluco = "#058DF7";
      } else if (parseInt(element.valorGlucometria) > 70 && parseInt(element.valorGlucometria) <= 80) {
        this.colorGluco = "#05F4F7";
      } else if (parseInt(element.valorGlucometria) > 80 && parseInt(element.valorGlucometria) <= 90) {
        this.colorGluco = "#05F7AA";
      } else if (parseInt(element.valorGlucometria) > 90 && parseInt(element.valorGlucometria) <= 100) {
        this.colorGluco = "#05F773";
      } else if (parseInt(element.valorGlucometria) > 100 && parseInt(element.valorGlucometria) <= 110) {
        this.colorGluco = "#05F744";
      } else if (parseInt(element.valorGlucometria) > 110 && parseInt(element.valorGlucometria) <= 120) {
        this.colorGluco = "#05F744";
      } else if (parseInt(element.valorGlucometria) > 120 && parseInt(element.valorGlucometria) <= 130) {
        this.colorGluco = "#05F744";
      } else if (parseInt(element.valorGlucometria) > 130 && parseInt(element.valorGlucometria) <= 140) {
        this.colorGluco = "#D6F705";
      } else if (parseInt(element.valorGlucometria) > 140 && parseInt(element.valorGlucometria) <= 150) {
        this.colorGluco = "#F7E505";
      } else if (parseInt(element.valorGlucometria) > 30 && parseInt(element.valorGlucometria) <= 40) {
        this.colorGluco = "#F7A305";
      } else if (parseInt(element.valorGlucometria) > 150 && parseInt(element.valorGlucometria) <= 160) {
        this.colorGluco = "#F78205";
      } else if (parseInt(element.valorGlucometria) > 160 && parseInt(element.valorGlucometria) <= 170) {
        this.colorGluco = "#F75605";
      } else if (parseInt(element.valorGlucometria) > 170 && parseInt(element.valorGlucometria) <= 180) {
        this.colorGluco = "#F73905";
      } else if (parseInt(element.valorGlucometria) > 180 && parseInt(element.valorGlucometria) <= 190) {
        this.colorGluco = "#F71F05";
      } else if (parseInt(element.valorGlucometria) > 190 && parseInt(element.valorGlucometria) <= 200) {
        this.colorGluco = "#F70505";
      } else if (parseInt(element.valorGlucometria) > 200) {
        this.colorGluco = "#5A05F7";
      }
      this.arregloColorGluco.push(this.colorGluco);
    });  



    // -=================
    // Se bvalida que exista un arreglo de glucometria en el mes anterior
    if (this.graficoPasado) {
      // Llenando el arreglo dias Anterior
      this.graficoPasado.items.forEach(element => {
        this.arregloDiasAnterior.push(element.nombre);
      });
      // Llenando el areglo de glucometrias anterior
      this.graficoPasado.items.forEach(element => {
        //convertir la glucometrias en numerico (anterior)
        let glucoNumerico: number = parseInt(element.valorGlucometria);
        this.arregloGlucometriasAnterior.push(glucoNumerico);
      });
    }  
  }

  ngOnInit() {}



  ngAfterViewInit() {
    setTimeout(() => {
      this.barChart = this.getBarChart();
      this.lineChart = this.getLineChart();
    }, 150);
    setTimeout(() => {
      this.pieChart = this.getPieChart();
      this.doughnutChart = this.getDoughnutChart();
    }, 250);
  }

  // ========

  getChart(context, chartType, data, options?) {
    return new Chart(context, {
      data,
      options,
      type: chartType
    });
  }

  // ========

  getLineChart() {
    // creamos una variable y validamos que exista un mes anterior
    let data = {};
    if (this.indiceLista == 0) {
      data = data = {
        //dias
        labels: this.arregloDias,
        datasets: [
          {
            label: this.grafico.titulo,
            fill: false,
            lineTension: 0.1,
            backgroundColor: "#51238d",
            borderColor: "#51238d",
            borderCapStyle: "butt",
            borderJoinStyle: "miter",
            pointRadius: 1,
            pointHitRadius: 10,
            // glucometrias
            data: this.arregloGlucometrias,
            scanGaps: false
          }
        ]
      };
    } else {
      data = {
        //dias
        labels: this.arregloDias,
        datasets: [
          {
            label: this.grafico.titulo,
            fill: false,
            lineTension: 0.1,
            backgroundColor: "#51238d",
            borderColor: "#51238d",
            borderCapStyle: "butt",
            borderJoinStyle: "miter",
            pointRadius: 1,
            pointHitRadius: 10,
            // glucometrias
            data: this.arregloGlucometrias,
            scanGaps: false
          },
          {
            label: this.graficoPasado.titulo,
            fill: false,
            lineTension: 0.1,
            backgroundColor: "rgb(244, 247, 5)",
            borderColor: "rgb(244, 247, 5)",
            borderCapStyle: "butt",
            borderJoinStyle: "miter",
            pointRadius: 1,
            pointHitRadius: 10,
            data: this.arregloGlucometriasAnterior,
            scanGaps: false
          }
        ]
      };
    }

    return this.getChart(this.lineCanvas.nativeElement, 'line', data);
  }

  // ======
  getBarChart() {

    const data = {
      labels: this.arregloDias,
      datasets: [{
        label: 'Valor de glucometrías',
        data: this.arregloGlucometrias,
        backgroundColor: this.arregloColorGluco,
        borderWidth: 1
      }]
    };

    const options = {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    };

    return this.getChart(this.barCanvas.nativeElement, 'bar', data, options);
  }

  // =========
  getPieChart() {
    const data = {
      labels: this.arregloDias,
      datasets: [{
        data: this.arregloGlucometrias,
        backgroundColor: this.arregloColorGluco
      }]
    };

    return this.getChart(this.pieCanvas.nativeElement, 'pie', data);
  }

  // ==========
  getDoughnutChart() {
    const data = {
      labels: this.arregloDias,
      datasets: [{
        label: 'Prueba gráfica',
        data: this.arregloGlucometrias,
        backgroundColor: this.arregloColorGluco
      }]
    };

    return this.getChart(this.doughnutCanvas.nativeElement, 'doughnut', data);
  }
}
