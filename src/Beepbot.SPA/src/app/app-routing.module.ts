import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './core/guards/auth.guard';
import { CallbackComponent } from './auth/callback/callback.component';
import { SoundboardComponent } from './soundboard/soundboard.component';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', pathMatch: 'full', redirectTo: '/home' },
      { path: 'home', component: HomeComponent },
      { path: 'soundboard', component: SoundboardComponent }
    ],
  },
  {
    path: 'auth',
    children: [
      { path: '', pathMatch: 'full', redirectTo: '/auth/login' },
      { path: 'login', component: LoginComponent },
      { path: 'callback', component: CallbackComponent },
    ],
  },
  {
    path: '**',
    redirectTo: '/home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
