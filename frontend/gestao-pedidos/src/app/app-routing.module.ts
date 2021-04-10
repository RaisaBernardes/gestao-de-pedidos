import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';
import { CardapioComponent } from './cardapio/cardapio.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'cadastro', component: SignUpComponent },
  { path: 'login', component: LoginComponent },
  { path: 'cardapio/:item', component: CardapioComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
