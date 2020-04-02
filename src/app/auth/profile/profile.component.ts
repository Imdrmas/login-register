import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../AuthService';
import {TokenStorageService} from '../TokenStorageService';
import {ProfileInfo} from '../ProfileInfo';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  username: string;
  profileInfo: ProfileInfo = new ProfileInfo();

  constructor(private route: ActivatedRoute, private authService: AuthService,
              private tokenService: TokenStorageService, private router: Router) { }

  ngOnInit(): void {
    this.username = this.route.snapshot.params.username;
    this.authService.getUserByUsername(this.username).subscribe(info => {
      this.profileInfo = info;
    });
  }
  logout() {
    this.tokenService.signOut();
    this.router.navigateByUrl('/');
  }
}
