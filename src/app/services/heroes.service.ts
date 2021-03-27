import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HeroeModel } from '../pages/models/heroe.model';
import { map } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  public heroe = new HeroeModel();

  public imageUrl: string = './assets/img/';

  private url = 'https://crud-d37fa-default-rtdb.firebaseio.com';

  constructor(private http: HttpClient, private firestore: AngularFirestore) { };

  crearHeroe(heroe: HeroeModel) {
    return this.http.post(`${this.url}/heroes.json`, heroe)
      .pipe(
        map((resp: any) => {
          heroe.id = resp.name;
          return heroe;
        })
      );
  };

  actualizarHeroe(heroe: HeroeModel) {
    const heroeTemp = {
      ...heroe
    };

    delete heroeTemp.id;

    return this.http.put(`${this.url}/heroes/${heroe.id}.json`, heroeTemp);
  };

  obtenerHeroes() {
    return this.http.get(`${this.url}/heroes.json`)
      .pipe(
        map((resp: any) => {
          var arrayHeroes = Object.keys(resp).map(key => ({ [key]: resp[key] }))
          let newArray = [];
          for (let index = 0; index < arrayHeroes.length; index++) {
            var x = Object.keys(resp)[index];
            var heroe: HeroeModel = arrayHeroes[index][x];
            heroe.id = x;
            newArray.push(heroe);
          }
          return newArray;
        })
      );
  };

  eliminarHeroe(heroe: HeroeModel) {
    return this.http.delete(`${this.url}/heroes/${heroe.id}.json`);
  };

}
