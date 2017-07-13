import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  alertas: any = [];

  //urlVehiculos: any = 'http://192.168.0.58:8080/pillpa/device/getAllAlertasGrua';
  //urlDesactivar: any = 'http://192.168.0.58:8080/pillpa/device/desactivarAlertas?id=';
  
  urlVehiculos: any = 'http://pillpa.cloud.runaid.com.ar:8888/pillpa/device/getAllAlertasGrua';
  urlDesactivar: any = 'http://pillpa.cloud.runaid.com.ar:8888/pillpa/device/desactivarAlertas?id=';


  constructor(public navCtrl: NavController,
    public http: Http) {
    //this.refresh();

  }

  remolcar(id) {
    console.log('parametro "id" de remolcar(id)');
    console.log(id);
    Promise.all([this.desactivarAlertas(id)])
      .then(() => this.refresh());
  }

  desactivarAlertas(idAlerta) {
    console.log('parametro "idAlerta" de desactivarAlertas(idAlerta)');
    console.log(idAlerta);
    let urlEspecificaRemolcado = this.urlDesactivar + idAlerta;
    this.http.get(urlEspecificaRemolcado).map(res => res.json()).subscribe(data => {
      console.log('desactivarAlertas(idAlerta)-JSON.parse(JSON.stringify(data)):');
      console.log(JSON.parse(JSON.stringify(data)));
      this.refresh();
    });

  }

  refresh() {
    //this.asignaJsonDuro()
    console.log('entra a refresh');
    this.http.get(this.urlVehiculos).map(res => res.json()).subscribe(data => {
      this.alertas = JSON.parse(JSON.stringify(data));
      console.log('getAllAlertasGrua()-JSON.parse(JSON.stringify(data))');
      console.log(JSON.parse(JSON.stringify(data)));
    });
    
  }



  asignaJsonDuro() {
    console.log('entra a asignaJsonDuro()');
    this.alertas = [
      {
        calle: 'Mitre',
        altura: '500',
        patente: 'ubd-366',
        descripcion: 'Fiat-128',
        id: '01'
      },
      {
        calle: 'Pringles',
        altura: '850',
        patente: 'add-879',
        descripcion: 'VW-Gol',
        id: '02'
      },
      {
        calle: 'Illia',
        altura: '324',
        patente: 'dfg-654',
        descripcion: 'Renault-11',
        id: '03'
      },
      {
        calle: 'Junin',
        altura: '671',
        patente: 'ghj-987',
        descripcion: 'Fiat Toro',
        id: '04'
      },
    ];
    this.alertas = JSON.parse(this.alertas);
    console.log('this.ordenes');
    console.log(this.alertas);
  }


}
/*[calle: '', altura: '', patente: '', descripcion: '', id: 0] */