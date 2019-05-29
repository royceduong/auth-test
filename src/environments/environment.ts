// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  auth: {
    issuer: 'https://phenomenexb2c.b2clogin.com/964b7d74-24a3-4446-9a32-5c58d965b7b2/v2.0/',
    loginUrl: 'https://PhenomenexB2C.b2clogin.com/PhenomenexB2C.onmicrosoft.com/oauth2/v2.0/authorize',
    redirectUri: 'http://localhost:4200',
    onErrorRedirectUrl: '/',
    silentRefreshRedirectUri: 'http://localhost:4200/assets/silent-refresh.html',
    clientId: 'f5d45e7e-2f65-41c2-815e-8c9ee003e760',
    scope: 'https://PhenomenexB2C.onmicrosoft.com/f5d45e7e-2f65-41c2-815e-8c9ee003e760/user_impersonation',
    logoutUrl: 'https://PhenomenexB2C.b2clogin.com/PhenomenexB2C.onmicrosoft.com/oauth2/v2.0/logout?p=B2C_1_PhxSignUpSignIn',
    nonceStateSeparator: ',',
    signUpSignInPolicy: 'B2C_1_PhxSignUpSignIn',
    passwordResetPolicy: 'B2C_1_PwdReset'
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
