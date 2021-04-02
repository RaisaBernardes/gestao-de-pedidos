import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, AbstractControl, ValidationErrors } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  cadastroUsuario: FormGroup;

  constructor(private fb: FormBuilder, private router: Router,  private activRoute: ActivatedRoute) { }

  get f() {
    return this.cadastroUsuario.controls;
  }

  ngOnInit(): void {
    this.emptyForm();
  }

  private emptyForm() {
    this.cadastroUsuario = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      telefone: ['', [Validators.required, Validators.minLength(10)]],
      endereco: ['', [Validators.required, Validators.minLength(10)]],
      email: ['', [Validators.required, Validators.minLength(5)]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      senhaConfirma: ['', [Validators.required, Validators.minLength(6)]]
   })
  }

  restart(): void {
    this.cadastroUsuario.reset();
 }

   private createForm(user: any) {
    this.cadastroUsuario = this.fb.group({
      nome: [user.nome, [Validators.required, Validators.minLength(3)]],
      telefone: [user.telefone, [Validators.required, Validators.minLength(3)]],
      endereco: [user.endereco, [Validators.required, Validators.minLength(10)]],
      email: [user.email, [Validators.required, Validators.minLength(5)]],
      senha: [user.senha, [Validators.required, Validators.minLength(6)]],
      senhaConfirma: [user.senhaConfirma, [Validators.required, Validators.minLength(6)]]
    })
  }

  submit(): void {
    this.cadastroUsuario.markAllAsTouched();
    if (this.cadastroUsuario.invalid) {
      return;
    } else {
      
      const user = this.cadastroUsuario.getRawValue() //as User;

      console.log(user);
      
      //this.insert(user);
      }
      
    }


  }

