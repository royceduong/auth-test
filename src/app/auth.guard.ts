import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { OAuthService } from 'angular-oauth2-oidc';
import { environment } from '../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private oauthService: OAuthService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    let loginPromise = this.oauthService.tryLogin().then(() => {
      if (this.oauthService.hasValidAccessToken())
        return true;

      return this.redirectToLogin(next, state);

    }).catch((e) => {
      console.error(e);
      return this.redirectToLogin(next, state);
    });

    return loginPromise;
  }

  private redirectToLogin(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const callbackUrl = next.queryParams['callbackUrl'] || state.url;
    console.log('callbackUrl', callbackUrl)
    this.oauthService.initImplicitFlow(callbackUrl);

    return false;
  }
}
