import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { FormArray } from '@angular/forms';
import { Validators } from '@angular/forms';

import { NgForm } from '@angular/forms';

import { User } from 'src/app/user';

@Component({
  selector: 'app-formulario' /*  */,
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css'],
})
export class FormularioComponent implements OnInit {
  agenda: FormGroup;

  array: User[] = [];
  arrayCheck: User | null = null;

  constructor() {
    this.agenda = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      surname: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      age: new FormControl('', [
        Validators.required,
        Validators.min(0),
        Validators.max(125),
      ]),
      id: new FormControl('', [
        Validators.required,
        Validators.minLength(9),
        Validators.maxLength(9),
      ]),
      birthday: new FormControl('', Validators.required),
      color: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      gender: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (!this.agenda.valid || this.arrayCheck != null) {
      return;
    }

    let user = new User();
    user.name = this.agenda.value.name;
    user.surname = this.agenda.value.surname;
    user.age = this.agenda.value.age;
    user.id = this.agenda.value.id;
    user.birthday = this.agenda.value.birthday;
    user.color = this.agenda.value.color;
    user.gender = this.agenda.value.gender;

    this.array.push(user);
    this.agenda.reset();
  }

  eliminar(event: MouseEvent, user: User): void {
    for (let i = this.array.length - 1; i >= 0; i--) {
      if (this.array[i] == user) {
        this.array.splice(i, 1);
      }
    }

    if (this.arrayCheck != null && this.arrayCheck == user) {
      this.agenda.reset();
      this.arrayCheck = null;
    }
  }

  modificar(event: MouseEvent, user: User): void {
    this.agenda.controls['name'].setValue(user.name);
    this.agenda.controls['surname'].setValue(user.surname);
    this.agenda.controls['age'].setValue(user.age);
    this.agenda.controls['id'].setValue(user.id);
    this.agenda.controls['birthday'].setValue(user.birthday);
    this.agenda.controls['color'].setValue(user.color);
    this.agenda.controls['gender'].setValue(user.gender);

    this.arrayCheck = user;
  }

  terminarModificacion(event: MouseEvent, user: User): void {
    for (let p of this.array) {
      if (p == user) {
        p.name = this.agenda.value.name;
        p.surname = this.agenda.value.surname;
        p.age = this.agenda.value.age;
        p.id = this.agenda.value.id;
        p.birthday = this.agenda.value.birthday;
        p.color = this.agenda.value.color;
        p.gender = this.agenda.value.gender;

        this.agenda.reset();
        this.arrayCheck = null;

        break;
      }
    }
  }
}
