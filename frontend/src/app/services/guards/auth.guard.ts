import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService,
              private router: Router) {}

  // canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
  //   //   return this.auth.getIsAuth().pipe(
  //   //     tap(isAuth => {
  //   //       if (!isAuth) {
  //   //         this.router.navigateByUrl('/auth/login');
  //   //       }
  //   //     })
  //   //   );
  //   // }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.auth.checkToken().pipe(
      tap(isAuth => {
        if (!isAuth) {
          this.router.navigateByUrl('/auth/login');
        }
      })
    );
  }

}
