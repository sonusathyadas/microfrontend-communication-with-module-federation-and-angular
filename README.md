# Communication between micro-frontends with shared libraries

Angular is one of the popular Single Page Application framework. It is commonly used to build monolithic frontend applications. It supoorts the lazy loading of modules that allows browser to load the feature modules on demand. Angular internally uses Webpack as the bundling tool. Micro-frontend is a pattern that allows you to build the frontend applications as individual applications(remote) that can be integrated with in a shell(host) application. Module federation plugin of the Webpack allows you to load these micro-frontend applications in to a shell application.

This tutorial helps you to build Micro-frontends using Angular and Webpack Module Federation.

## Prerequisites
*) Angular CLI : Version 14.0.0 (use exact version)
*) Module Federation library for Angular (@angular-architects/module-federation): 14.3.0 (compatible to Angular 14.0.0)
*) Node 16.x or later
*) Visual Studio Code

## Buidling the angular workspace and create remote(MFE) and host(shell) projects
1) To create an angular workspace, open the command terminal and run the following command.
    ```bash
    ng new bookstore-ws --create-application false --skip-tests
    ```
2) Switch to the workspace folder and add two micro-frontend projects and a shell application to it.
    ```bash
    cd bookstore-ws
    ng g app book-mfe --skip-tests --routing
    ng g app auth-mfe --skip-tests --routing
    ng g app bookstore-shell --skip-tests --routing
    ```
3) We can also install the `bootstrap` and `jquery` libraries for the projects. Install the `bootstrap` and `jquery` to the workspace by running the following command.
    ```bash
    npm install --save bootstrap@5.2.2 jquery
    ```

4) Open the `angular.json` file and add register the `bootstrap` and `jquery` in the `styles` and `scripts` sections of all 3 projects. Below is the sample configuration for `bookstore-shell` project.
    ```json
    "styles": [
        "node_modules/bootstrap/dist/css/bootstrap.min.css",
        "projects/bookstore-shell/src/styles.css"
    ],
    "scripts": [
        "node_modules/jquery/dist/jquery.min.js",
        "node_modules/bootstrap/dist/js/bootstrap.min.js"
    ]
    ```

### Configure the Book-MFE project
1) Add a home component to the `book-mfe` project. Also add a feature module that can be lazily loaded.
    ```bash
    ng g c --project book-mfe components/home
    ng g module --project book-mfe book --routing
    ```

2) Add a component `BookListComponent` to the `book` module in the `book-mfe` project.
    ```bash
    ng g c --project book-mfe --module book book/components/book-list
    ```

3) Update the routing file in the `book` module to add the route for loading the `book-list` component. Open the `book-routing.module.ts` file and update the route with the following.
    ```typescript
    const routes: Routes = [
    {
        path:'list',
        component:BookListComponent
    }];
    ```
4) Now, we need to update the main routing file -`app-routing.module.ts`. Add the following routes to it.
    ```typescript
    const routes: Routes = [
      {
        path: '',
        component: HomeComponent,
        pathMatch: 'full'
      },
      {
        path: 'books',
        loadChildren: () => import('./book/book.module').then(m => m.BookModule)
      }
    ];
    ``` 
5) Open the `app.component.html` file and add the following html code to it.
    ```html
    <nav class="navbar navbar-expand-lg bg-primary bg-body-tertiary" data-bs-theme="dark">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">Books MFE</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" routerLink="">Home</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" routerLink="books/list">Books</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div class="container">
        <router-outlet></router-outlet>
      </div>
    ```
### Configure the Auth-MFE project
1) We also need to add a `HomeComponent` and a feature module to the `auth-mfe` project.
    ```bash
    ng g c --project auth-mfe components/home
    ng g module --project auth-mfe auth --routing
    ```

2) Add a component `LoginComponent` to the `auth` module in the `auth-mfe` project.
    ```bash
    ng g c --project auth-mfe --module auth auth/components/login
    ```

3) Update the routing file in the `auth` module to add the route for loading the `login` component. Open the `auth-routing.module.ts` file and update the route with the following.
    ```typescript
    const routes: Routes = [
      {
        path: 'login',
        component: LoginComponent
      }
    ];
    ```

4) Now, we need to update the main routing file -`app-routing.module.ts`. Add the following routes to it.
    ```typescript
    const routes: Routes = [
      {
        path: '',
        component: HomeComponent,
        pathMatch: 'full'
      },
      {
        path: 'auth',
        loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
      }
    ];
    ```
5) Open the `app.component.html` file and add the following html code to it. 
    ```html
    <nav class="navbar navbar-expand-lg bg-primary bg-body-tertiary" data-bs-theme="dark">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">Auth MFE</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" routerLink="">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="auth/login">Login</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <div class="container">
      <router-outlet></router-outlet>
    </div>
    ```
### Configure the BookStore-Shell prohect 
1) Add a home component to the `bookstore-shell` project. 
    ```bash
    ng g c --project bookstore-shell components/home
    ```
2) Open the `app-routing.module.ts` file and add the route for loading the `HomeComponent`.
    ```typescript
    const routes: Routes = [
      {
        path:'',
        component:HomeComponent,
        pathMatch:'full'
      }
    ];
    ```
3) Update the `app.component.html` file with the following code.
    ```html
    <nav class="navbar navbar-expand-lg bg-primary bg-body-tertiary" data-bs-theme="dark">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">Book Store</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" routerLink="">Home</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <div class="container">
      <router-outlet></router-outlet>
    </div>
    ```

### Run and test the projects
Run the following commands in different terminals for running projects.
    ```bash
    ng serve auth-mfe -o --port 4200
    ng serve book-mfe -o --port 4300    
    ng serve bookstore-shell -o --port 5000
    ```
## Configure the MFE and Shell apps with Module federation
1) Add the module federation to `book-mfe` project by running the following command.
    ```bash
    ng add @angular-architects/module-federation@14.3.0 --project book-mfe --type remote --port 4300
    ```
2) Open the `webpack.config.js` file in the `book-mfe` project folder and update the confiugration with the following.
    ```javascript
    const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

    module.exports = withModuleFederationPlugin({
    
      name: 'book-mfe',
    
      exposes: {
        './Module': './projects/book-mfe/src/app/book/book.module.ts',
      },
    
      shared: {
        ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
      },
    
    });
    ```
3) Now, we can add the module federation to `auth-mfe` project by running the following command.
    ```bash
    ng add @angular-architects/module-federation@14.3.0 --project auth-mfe --type remote --port 4200
    ```
4) Open the `webpack.config.js` file in the `auth-mfe` project folder and update the confiugration with the following.
    ```javascript
    const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

    module.exports = withModuleFederationPlugin({
    
      name: 'auth-mfe',
    
      exposes: {
        './Module': './projects/auth-mfe/src/app/auth/auth.module.ts',
      },
    
      shared: {
        ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
      },
    
    });
    ```

5) Finally, add the add the module federation to the shell project by running the following command.
    ```bash
    ng add @angular-architects/module-federation@14.3.0 --project bookstore-shell --type host --port 5000
    ```

6) Update the `webpack.config.js` with the following code. Make sure the ports are configured correctly.
    ```javascript
    const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

    module.exports = withModuleFederationPlugin({
    
      remotes: {
        "bookMfe": "http://localhost:4300/remoteEntry.js",
        "authMfe": "http://localhost:4200/remoteEntry.js",    
      },
    
      shared: {
        ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
      },
    
    });
    ```

7) Open the `app-routing.module.ts` file in the `bookstore-shell` project and update the routes with the following code.
    ```typescript
    const routes: Routes = [
      {
        path:'',
        component:HomeComponent,
        pathMatch:'full'
      },
      {
        path:'books',
        loadChildren:()=>import('bookMfe/Module').then(m=>m.BookModule)
      },
      {
        path:'auth',
        loadChildren:()=>import('authMfe/Module').then(m=>m.AuthModule)
      }
    ];
    ```

8) Create a file with the name `decl.d.ts` inside the `src` folder of the `bookstore-shell` project and add the following lines to it.
    ```typescript
    declare module 'bookMfe/Module';
    declare module 'authMfe/Module';
    ```
9) No, we can update the navigation urls in the `app.component.html` file of the `bookstore-shell` project.
    ```html
    <nav class="navbar navbar-expand-lg bg-primary bg-body-tertiary" data-bs-theme="dark">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">Book Store</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" routerLink="">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="auth/login">Login</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="books/list">Books</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <div class="container">
      <router-outlet></router-outlet>
    </div>
    ```

10) Run the following commands in different terminals for running projects.
    ```bash
    ng serve auth-mfe -o --port 4200
    ng serve book-mfe -o --port 4300    
    ng serve bookstore-shell -o --port 5000
    ```

11) Open the `bookstore-shell` project output in browser and navigate to the `Login` and `Books` hyperlinks. 

## Use the shared libraries 

1) Add new library project to the monorepo workspace.  
    ```bash
    ng g lib auth-lib
    ```

2) In the `tsconfig.json` in the workspace's root, adjust the path mapping for `auth-lib` so that it points to the libs entry point:
    ```json
    "compilerOptions": {
    "paths": {
      "auth-lib": [
        "projects/auth-lib/src/public-api.ts"
      ]
    },
    ....
    ```

3) As most IDEs only read global configuration files like the `tsconfig.json` once, restart the IDE.
4) Switch to your `auth-lib` project and open the file `auth-lib.service.ts` (`projects\auth-lib\src\lib\auth-lib.service.ts`). Update the code as follows.
    ```typescript
    import { Injectable } from '@angular/core';
    
    @Injectable({
      providedIn:'root'
    })
    export class AuthLibService {
      private userName?: string;
    
      public get user(): string|undefined {
        return this.userName;
      }
    
      constructor() {}
    
      public login(userName: string, password: string): void {
        // implement the user authentication logic here
        this.userName = userName;
      }
    }
    ```

5) Switch to `book-mfe` project and open its `book-list.component.ts` (`projects\book-mfe\src\app\book\components/book-list/book-list.component.ts`). Use the shared service to retrieve the current user's name.
    ```typescript
    import { Component, OnInit } from '@angular/core';
    import {AuthLibService} from 'auth-lib';
    
    @Component({
      selector: 'app-book-list',
      templateUrl: './book-list.component.html',
      styleUrls: ['./book-list.component.css']
    })
    export class BookListComponent implements OnInit {
    
      private user?:string;
    
      constructor(private authSvc:AuthLibService) {
        this.user = this.authSvc.user;
       }
    
      ngOnInit(): void {
      }
    
    }
    ```

6) Add a model for login in auth-mfe
    ng g interface auth/models/user-credential --project auth-mfe 

7) Add the following code to it
    ```typescript
    export interface UserCredential {
        username:string;
        password:string;
        rememberMe:boolean
    }

    ```

8) Open the `login-component.ts` in the `auth-mfe` project. (`projects/auth-mfe/src/app/auth/components/login.component.ts`). Add the import statement to it.
    ```typescript
    import { UserCredential } from '../../models/user-credential';
    ```

9) Update the `LoginComponent` class with the following.
    ```typescript
    export class LoginComponent implements OnInit {
      loginForm:UserCredential = {
        username:"",
        password:"",
        rememberMe:false
      }
    
      submitted=false;
    
      constructor(authSvc:AuthLibService) { }
    
      ngOnInit(): void {
      }
    
      onSubmit(){
        this.submitted = false;
      }
    
    }
    ```
10) Open the `login.component.html` and update the html code with the following.
    ```html
    <div class="container">
        <div class="row">
            <div class="col-md-4 col-sm-6 mx-auto">
                <h3>Sign In</h3>
                <form #loginForm="ngForm" (ngSubmit)="onSubmit(loginForm)">
                    <div class="mb-3">
                        <label for="username" class="form-label">User name</label>
                        <input type="username" class="form-control " name="username" id="username" required minlength="8"
                            [(ngModel)]="credential.username" #username="ngModel">
                        <div *ngIf="username.touched && username.errors" class="alert alert-danger">
                            <div *ngIf="username.errors!['required']">Username cannot be empty</div>
                            <div *ngIf="username.errors!['minlength']">Username must contain minimum 8 characters</div>
                        </div>
                    </div>
                    <div class="mb-3">
                        <label for="password" class="form-label">Password</label>
                        <input type="password" class="form-control" required minlength="8" [(ngModel)]="credential.password"
                            #passwd="ngModel" id="password" name="password">
                        <div *ngIf="passwd.touched && passwd.errors" class="alert alert-danger">
                            <div *ngIf="passwd.errors!['required']">Password cannot be empty</div>
                            <div *ngIf="passwd.errors!['minlength']">Password must contain minimum 8 characters</div>
                        </div>
                    </div>
                    <div class="mb-3 form-check">
                        <input type="checkbox" class="form-check-input" id="rememberMe" />
                        <label class="form-check-label" for="rememberMe" [(ngModel)]="credential.rememberMe"
                            #rememberMe="ngModel">Remember me</label>
                    </div>
                    <button type="submit" class="btn btn-primary">Login</button>
                </form>
            </div>
        </div>
    </div>
    ```

11) Now, we need to update the code in the `login.component.ts` to inject the `AuthLibService`. Validate the form on button click and call the `login ` method to validate and store the user credentails.
    ```typescript
    import { Component, OnInit } from '@angular/core';
    import { NgForm } from '@angular/forms';
    import { AuthLibService } from 'auth-lib';
    import { UserCredential } from '../../models/user-credential';
    
    @Component({
      selector: 'app-login',
      templateUrl: './login.component.html',
      styleUrls: ['./login.component.css']
    })
    export class LoginComponent implements OnInit {
    
      credential: UserCredential = {
        username: "",
        password: "",
        rememberMe: false
      }
    
      submitted = false;
    
      constructor(private authSvc: AuthLibService) { }
    
      ngOnInit(): void {
      }
    
      onSubmit(frm: NgForm) {
        Object.keys(frm.controls).forEach(field => {
          const control = frm.controls[field];
          control.markAsTouched({ onlySelf: true });
        });
        if (frm.valid) {
          this.submitted = false;
          this.authSvc.login(this.credential.username, this.credential.password);
          alert("Logged in successfully")  
        }
      }
    
    }

    ```

12) Restart the micro-frontends and the shell application.  Navigate to the `Books` list in the shell app and it will show `Welcome Guest` message. You can now click on `login` link to load Login page. Login with a username and password and click on the Login button. After the login is success, switch to the Books list page and you can see the `Welcome <USERNAME>` message. 