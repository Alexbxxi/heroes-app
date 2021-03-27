import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeroesService } from 'src/app/services/heroes.service';
import { HeroeModel } from '../models/heroe.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  public heroes: HeroeModel[] = [];
  public cargando: boolean = false;

  constructor(private heroesService: HeroesService, private router: Router) { }

  ngOnInit(): void {
    this.obtenerHeroes();
  }

  obtenerHeroes() {
    this.cargando = true;
    this.heroesService.obtenerHeroes().subscribe(resp => {
      console.log(resp);
      this.heroes = resp;
      this.cargando = false;
    });
  }

  editarHeroe(heroe: HeroeModel) {
    this.heroesService.heroe = heroe;
    this.router.navigate(['/heroe/' + heroe.id]);
  }

  eliminarHeroe(heroe: HeroeModel, index: number) {
    this.heroesService.eliminarHeroe(heroe)
      .subscribe(resp => {
        Swal.fire(
          'Registro eliminado exitosamente!'
        );
        this.heroes.splice(index, 1);
      })
  }

}
