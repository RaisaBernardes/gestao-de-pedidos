import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Usuario } from '../shared/model.module';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginUsuario: FormGroup;
  btDisabled: boolean = false; // for button

  constructor(private authService: AuthService, private fb: FormBuilder, private router: Router,  private activRoute: ActivatedRoute) { }

  ngOnInit(): void {
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

      console.log(user);

      this.authService.login(user);
      
      this.btDisabled = false;
    }

  }

}
