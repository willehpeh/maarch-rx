import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isAuth$: Observable<boolean>;

  constructor(private auth: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.isAuth$ = this.auth.getIsAuth();
  }

  onLogout() {
    this.auth.logout().subscribe(() => this.router.navigateByUrl('auth/login'));
  }

}
