export class User {
  name: string;
  surname: string;
  age: number;
  id: string;
  birthday: Date;
  color: string;
  gender: string;

  constructor() {
    this.name = '';
    this.surname = '';
    this.age = 0;
    this.id = '';
    this.birthday = new Date();
    this.color = '';
    this.gender = '';
  }
}