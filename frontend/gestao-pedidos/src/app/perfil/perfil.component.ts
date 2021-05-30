import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import Swal from 'sweetalert2';
import { UsuarioService } from '../services/usuario.service';
import { UsuarioDTO, Endereco } from '../shared/model.module';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  enderecoUsuario: FormGroup;
  usuario: UsuarioDTO = new UsuarioDTO();
  enderecos: Endereco[] = new Array();
  revealDisplay: boolean = false;
  isLoading: boolean = true;

  constructor(private cookieService: CookieService, private usuarioService: UsuarioService,  private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {

    if(!this.checkUserLogged()) {
      this.router.navigateByUrl('/');
    }

    this.usuarioService.getUserLogged().subscribe((data) => {
      const {cdUsuario, nome, email, telefone} = data.userLogged;
      this.usuario.nome = nome;
      this.usuario.telefone = telefone;
      this.usuario.email = email;
      this.usuario.cdUsuario = cdUsuario;
    })

    this.usuarioService.fetchEnderecoUsuario().subscribe((data) => {
      this.enderecos = this.enderecos.concat(data);
    })

    this.isLoading = false;
    
    this.emptyForm();
  }

  revealDisplayEndereco() {
    this.revealDisplay = ( this.revealDisplay ? false : true );
  }

  get f() {
    return this.enderecoUsuario.controls;
  }

  addEndereco() {
    this.enderecoUsuario.markAllAsTouched();

    if (this.enderecoUsuario.invalid) {
      return
    } else {
      var endereco = this.enderecoUsuario.getRawValue() as Endereco;
      endereco.userCdUsuario = this.usuario.cdUsuario;

      this.usuarioService.addEnderecoUsuario(endereco).subscribe((data) => {
        this.enderecoUsuario.reset();
        Swal.fire({title:"Endereço cadastrado com sucesso!", icon: 'success'})
        
        this.usuarioService.fetchEnderecoUsuario().subscribe((data) => {
          this.enderecos = new Array();
          this.enderecos = this.enderecos.concat(data);
        })
      })
    }
  }


  private emptyForm() {
    this.enderecoUsuario = this.fb.group({
      logradouro: ['', [Validators.required, Validators.minLength(8)]],
      numero: ['', [Validators.required, Validators.minLength(1)]],
      complemento: [''],
      bairro: ['', [Validators.required, Validators.minLength(3)]],
      cidade: ['', [Validators.required, Validators.minLength(3)]],
      estado: ['', [Validators.required, Validators.minLength(2)]]
   })
  }

  checkUserLogged(): boolean {
    return this.cookieService.check('SessionCookie');
  }

}
