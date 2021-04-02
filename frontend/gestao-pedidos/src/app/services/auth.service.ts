import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // SERVICE RESPONSAVEL PELA PARTE DE CADASTRO, LOGIN E LOGOUT

  constructor(/*private http: HttpClient*/) { }

  cadastrar(user): any {
    // to-do: chamada de servico rest /user/create
  }

  login(user): any {
    // to-do: chamada de servico rest /auth/login
  }

  logout(user): any {
    // to-do: chamada de servico rest /user/logout
  }

}
