export class RegisterInfo {
  name: string;
  username: string;
  email: string;
  password: string;
  gender: string;
  birthdate: any;
  heightInCm: number;
  currentWeight: number;
  caloriesDaily: number;
  role: string[];

  constructor(name: string,
              username: string,
              email: string,
              password: string,
              gender: string,
              birthdate: any,
              heightInCm: number,
              currentWeight: number,
              caloriesDaily: number) {
    this.name = name;
    this.username = username;
    this.email = email;
    this.password = password;
    this.gender = gender;
    this.birthdate = birthdate;
    this.heightInCm = heightInCm;
    this.currentWeight = currentWeight;
    this.caloriesDaily = caloriesDaily;
    this.role = ['user'];
  }

}
