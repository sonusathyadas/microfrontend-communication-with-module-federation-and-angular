import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

import { loadRemoteModule } from '@angular-architects/module-federation';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path: 'books',
    loadChildren: () => loadRemoteModule({
      type: 'manifest',
      remoteName: 'bookMfe',
      exposedModule: './Module'
    })
      .then(m => m.BookModule)
  },
  {
    path: 'auth',
    loadChildren: () => loadRemoteModule({
      type: 'manifest',
      remoteName: 'authMfe',
      exposedModule: './Module'
    })
      .then(m => m.AuthModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
