import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Usuario } from '../shared/model.module';

import Swal from 'sweetalert2';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginUsuario: FormGroup;
  btDisabled: boolean = false; // for button

  constructor(private cookieService: CookieService, private authService: AuthService, private fb: FormBuilder, private router: Router,  private activRoute: ActivatedRoute) { }

  ngOnInit(): void {
  
    if (this.checkUserLogged) {
      this.router.navigateByUrl('/');
    }

    this.emptyForm();
  }

  get f() {
    return this.loginUsuario.controls;
  }

  restart(): void {
    this.loginUsuario.reset();
 }

  private emptyForm() {
    this.loginUsuario = this.fb.group({
      email: ['', [Validators.required, Validators.minLength(5)]],
      senha: ['', [Validators.required, Validators.minLength(6)]]
   })
  }

  private createForm(user: any) {
    this.loginUsuario = this.fb.group({
      email: [user.email, [Validators.required, Validators.minLength(5)]],
      senha: [user.senha, [Validators.required, Validators.minLength(6)]]
   })
  }

  async submit(): Promise<void> {
    this.loginUsuario.markAllAsTouched();
    if (this.loginUsuario.invalid) {
      return;
    } else {
      this.btDisabled = true;
      const user = this.loginUsuario.getRawValue() as Usuario;

      this.authService.login(user).subscribe((data) => {

        if (data.status === false) {
          Swal.fire(
            {
              title: "Erro!",
              html: "<p>" + data.result + "<p>",
              confirmButtonText: "Ok",
              icon: "error"
            });
        } else {
          Swal.fire(
            {
              title: "Login efetuado com sucesso!",
              confirmButtonText: "Ok",
              icon: "success"
            });
            sessionStorage.setItem('tp_usuario', data.result.tp_usuario);
            sessionStorage.setItem('nome', data.result.nome);
            this.router.navigateByUrl("/")
          }
          }, (err) => {
            Swal.fire(
              {
                title: "Erro!",
                html: "<p>Houve um problema na conexão com o servidor.<br>Tente novamente mais tarde.",
                confirmButtonText: "Ok",
                icon: "error"
              });

          });

          this.btDisabled = false;
      
    }

  }

  checkUserLogged(): boolean {
    return this.cookieService.check('SessionCookie');
  }
  
}
