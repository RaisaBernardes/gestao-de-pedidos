import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, AbstractControl, ValidationErrors } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Usuario } from '../shared/model.module';

import Swal from 'sweetalert2';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  cadastroUsuario: FormGroup;
  invalidPwd: boolean = false;

  constructor(private cookieService: CookieService, private fb: FormBuilder, private authService: AuthService, private router: Router,  private activRoute: ActivatedRoute) { }

  get f() {
    return this.cadastroUsuario.controls;
  }

  ngOnInit(): void {

    if (this.checkUserLogged()) {
      this.router.navigateByUrl('/');
    }

    this.emptyForm();
  }

  private emptyForm() {
    this.cadastroUsuario = this.fb.group({
      nome: ['', [Validators.required]],
      telefone: ['', [Validators.required]],
      logradouro: ['', [Validators.required]],
      numero: ['', [Validators.required]],
      email: ['', [Validators.required]],
      senha: ['', [Validators.required]],
      senhaConfirma: ['', [Validators.required]],
      complemento: [''],
      bairro: ['', [Validators.required]],
      cidade: ['', [Validators.required]],
      estado: ['', [Validators.required]]

   })
  }

  submit() {
    this.cadastroUsuario.markAllAsTouched();
    if (this.cadastroUsuario.invalid) {
      return;
    } else {

      const userRaw = this.cadastroUsuario.getRawValue();


      if (userRaw.senha != userRaw.senhaConfirma) {
        this.invalidPwd = true;
        console.log(this.invalidPwd)
        return;
      }

      delete userRaw['senhaConfirma'];
      this.invalidPwd = false;

      let user = new Usuario();
      user = {...userRaw, tp_usuario: 'CLIENTE'};

      console.log(user);
      
      this.authService.cadastrar(user).subscribe((data) => {
        if (data.status === false) {
          Swal.fire(
            {title: "Erro!", 
             html: "<p>"+data.result+"<p>",
             confirmButtonText: "Ok",
             confirmButtonColor: '#000000',
             icon: "error"})
        } else {
          Swal.fire(
            {title: "Usuário cadastrado com sucesso!",
             confirmButtonText: "Ok",
             icon: "success",
             confirmButtonColor: '#000000'})
             this.router.navigateByUrl('/login');
        }
        //to-do: ARMAZENAR OS DADOS VINDOS NUM SESSIONSTORAGE
      }, (err) => {
        Swal.fire(
          {
            title: "Erro!",
            html: "<p>Houve um problema na conexão com o servidor.<br>Tente novamente mais tarde.",
            confirmButtonText: "Ok",
            confirmButtonColor: '#000000',
            icon: "error"
          });
      });

      }
      
    }


    checkUserLogged(): boolean {
      return this.cookieService.check('SessionCookie');
    }
      
  }


