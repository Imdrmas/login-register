import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../AuthService';
import {Router} from '@angular/router';
import {LoginInfo} from '../LoginInfo';
import {RegisterInfo} from '../RegisterInfo';
import {ProgressSpinnerMode} from '@angular/material/progress-spinner';
import {ThemePalette} from '@angular/material/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: any = {};
  isSignedUp = false;
  signUpInfo: RegisterInfo;
  showSpinner = false;
  isSignUpFailed = false;
  errorMessage = false;
  rolesLength: number;

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.authService.findAllUsers().subscribe(roles => {
      this.rolesLength = roles.length;
    });
  }

  onSubmit() {
    this.showSpinner = true;
    this.signUpInfo = new RegisterInfo(
      this.form.name,
      this.form.username,
      this.form.email,
      this.form.password
    );


    this.authService.register(this.signUpInfo).subscribe(data => {
      this.isSignedUp = true;
      console.log('Register Successfully');
      this.showSpinner = false;
      this.isSignedUp = true;
      this.isSignUpFailed = false;
      this.router.navigate(['/profile/', this.signUpInfo.id]);
    }, error => {
      this.errorMessage = error.error.message;
      this.isSignUpFailed = true;
    });
  }

  cancel() {
    this.router.navigateByUrl('/login');
  }
}
