import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HeroesService } from 'src/app/services/heroes.service';
import { HeroeModel } from '../models/heroe.model';
import { AngularFireStorage } from '@angular/fire/storage';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {

  constructor(public heroesService: HeroesService, private storage: AngularFireStorage, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id: string = this.route.snapshot.params.id;
    if (id != 'nuevo') {
      this.heroesService.heroe.id = id;
      console.log(id);
    } else {
      this.heroesService.heroe.id = null;
    }
  }

  onUpload(e) {
    const id = Math.random().toString(36).substring(2);
    const file = e.target.files[0];
    const filePath = `upload/${id}`;
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    console.log(file.name);
    this.heroesService.imageUrl = this.heroesService.imageUrl + file.name;
  };

  guardar(form: NgForm) {
    if (form.invalid) {
      console.log('Formulario no válido');
      return;
    }
    if (this.heroesService.heroe.id != null) {
      if (this.heroesService.imageUrl != './assets/img/') {
        this.heroesService.heroe.img = this.heroesService.imageUrl;
      }
      this.heroesService.actualizarHeroe(this.heroesService.heroe)
        .subscribe(resp => {
          this.heroesService.imageUrl = './assets/img/';
          Swal.fire(
            'Registro actualizado exitosamente!'
          );
          this.router.navigate(['/heroes']);
          console.log(resp);
        });
    } else {
      this.heroesService.crearHeroe(this.heroesService.heroe)
        .subscribe(resp => {
          console.log(resp);
          this.heroesService.heroe = resp;
          this.heroesService.heroe.img = this.heroesService.imageUrl;
          // actualiza el id
          this.heroesService.actualizarHeroe(this.heroesService.heroe)
            .subscribe(resp => {
              console.log(resp);
              this.heroesService.imageUrl = './assets/img/';
              Swal.fire(
                'Registro creado exitosamente!'
              );
              this.router.navigate(['/heroes']);
            });
        });
    }
  }
}
