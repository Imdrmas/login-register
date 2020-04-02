import { Component, OnInit } from '@angular/core';
import {LoginInfo} from '../LoginInfo';
import {AuthService} from '../AuthService';
import {Router} from '@angular/router';
import {TokenStorageService} from '../TokenStorageService';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  roles: string[] = [];
  loginInfo: LoginInfo;
  showSpinner = false;

  constructor(private authService: AuthService, private router: Router,
              private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    if (this.tokenStorageService.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorageService.getAuthorities();
    }
  }

  onSubmit() {
    this.showSpinner = true;
    this.loginInfo = new LoginInfo(
      this.form.username,
      this.form.password
    );

    this.authService.login(this.loginInfo).subscribe(data => {
      this.tokenStorageService.saveToken(data.accessToken);
      this.tokenStorageService.saveUsername(data.username);
      this.tokenStorageService.saveAuthorities(data.authorities);

      this.isLoggedIn = true;
      this.isLoginFailed = false;
      this.roles = this.tokenStorageService.getAuthorities();
      this.router.navigate(['/profile/' + this.loginInfo.username]);

    }, error => {
      this.isLoginFailed = true;
      this.showSpinner = false;
    });
  }

}
