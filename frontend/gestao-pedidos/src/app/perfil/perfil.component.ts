import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  constructor(private usuarioService: UsuarioService,  private fb: FormBuilder) { }

  ngOnInit(): void {
    this.usuarioService.getUserLogged().subscribe((data) => {
      const {nome, email, telefone} = data.userLogged;
      this.usuario.nome = nome;
      this.usuario.telefone = telefone;
      this.usuario.email = email;
      this.usuario.cdUsuario = data.userLogged.cdUsuario;

      console.log(this.usuario)
    })

    this.usuarioService.fetchEnderecoUsuario().subscribe((data) => {
      this.enderecos = this.enderecos.concat(data);
    })

    this.emptyForm();
  }

  revealDisplayEndereco() {
    this.revealDisplay = ( this.revealDisplay ? false : true );
  }

  addEndereco() {
    this.enderecoUsuario.markAllAsTouched();

    if (this.enderecoUsuario.invalid) {
      return
    } else {
      var endereco = this.enderecoUsuario.getRawValue() as Endereco;
      endereco.userCdUsuario = this.usuario.cdUsuario;
      console.log(endereco);

      this.usuarioService.addEnderecoUsuario(endereco).subscribe((data) => {
        window.location.reload();
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

}
