import { Component } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { Router } from '@angular/router';

/*

!! MUST BE A PROTECTED COMPONENT !!

Used for provider authentication redirect handling as a pass-through component.
If a valid token is received, the component will automatically be redirected to
the originally requested URL or home if none was specified, otherwise restart
authentication flow.

*/
@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent {

  constructor(private oauthService: OAuthService, private router: Router) {

    // validate authentication token
    this.oauthService.tryLogin()
      .then(() => {

        // did B2C confirm its validity?
        if (this.oauthService.hasValidAccessToken()) {

          // redirect user to originally requested URL
          var redirectUrl = this.oauthService.state || "/";
          this.router.navigate([redirectUrl]);
        }
        else {
          // request authentication
          this.oauthService.initImplicitFlow();
        }
      })
      .catch(() => {

        // TODO: log error

        // request authentication
        this.oauthService.initImplicitFlow();
      })
  }
}
