import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MaterialModule } from './shared/material.module';

import { AppComponent } from './app.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';

import {AuthService} from './services/auth.service';
import { CardapioComponent } from './cardapio/cardapio.component';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    FooterComponent,
    HomeComponent,
    SignUpComponent,
    LoginComponent,
    CardapioComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule, 
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
