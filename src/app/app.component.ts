import { Component } from '@angular/core';
import { OAuthService, NullValidationHandler, OAuthErrorEvent, AuthConfig } from 'angular-oauth2-oidc';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	title = 'auth-test';
	constructor(private oauthService: OAuthService, private router: Router) {
		this.configureAuth();
	}

	configureAuth() {

		// build configuration
		const authConfig: AuthConfig = {
			issuer: environment.auth.issuer,
			loginUrl: environment.auth.loginUrl,
			redirectUri: environment.auth.redirectUri,
			silentRefreshRedirectUri: environment.auth.silentRefreshRedirectUri,
			clientId: environment.auth.clientId,
			scope: environment.auth.scope,
			logoutUrl: environment.auth.logoutUrl,
			nonceStateSeparator: environment.auth.nonceStateSeparator
		};

		// configuration authentication using configuration class
		this.oauthService.configure(authConfig);

		// default to signup/signin policy on every initialization
		this.oauthService.customQueryParams = {
			'p': environment.auth.signUpSignInPolicy
		};

		// B2C does not provide a discovery document with JWKS keys, so disable JWKS validation
		this.oauthService.tokenValidationHandler = new NullValidationHandler();

		// enable token silent refresh
		this.oauthService.setupAutomaticSilentRefresh();

		// subscribe to events emitted by the auth service
		this.oauthService.events.subscribe(e => {

			switch (e.type) {
				case "token_error": {

					// cast event
					const tokenError = <OAuthErrorEvent>e;

					// extract B2C error code
					const errorDescription: string = tokenError.params['error_description']
					const errorCode = errorDescription.substring(0, errorDescription.indexOf(':'));

					// extract redirectUrl from state
					const state = (<string>tokenError.params['state']).split(',');
					const redirectUrl = state.length >= 2 ? state[1] : '/';

					switch (errorCode) {

						// AADB2C90118: The user has forgotten their password
						case 'AADB2C90118':
							{
								// switch to the password reset policy
								this.oauthService.customQueryParams = {
									'p': environment.auth.passwordResetPolicy
								};
								break;
							}

						default: {

							// switch to the signin/signup policy
							this.oauthService.customQueryParams = {
								'p': environment.auth.signUpSignInPolicy
							};
							break;
						}
					}

					// send user back to app for processing
					this.router.navigate([environment.auth.redirectUri], {
						queryParams: {
							callbackUrl: redirectUrl,
							errorCode: errorCode
						}
					});

					break;
				}
			}
		});
	}
}
