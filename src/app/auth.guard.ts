import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { OAuthService } from 'angular-oauth2-oidc';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private oauthService: OAuthService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    // validate authentication token
    const loginPromise = this.oauthService.tryLogin()
      .then(() => {

        // did B2C confirm its validity?
        if (this.oauthService.hasValidAccessToken())
          
          // accept request
          return true;
        
        // request authentication
        this.redirectToProviderLogin(next, state);
        return false;
      })
      .catch(() => {

        // TODO: log error

        // request authentication
        this.redirectToProviderLogin(next, state);
        return false;
      });
    
    return loginPromise;
  }

  private redirectToProviderLogin(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    // try to extract requested url, otherwise use current route
    const callbackUrl = next.queryParams['callbackUrl'] || state.url;

    // redirect to external provider login
    this.oauthService.initImplicitFlow(callbackUrl);
  }
}
