import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../shared/model.module';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  requestUrl = "localhost:3000";
  userUrl = this.requestUrl + "/user";
  authUrl = this.requestUrl + "/auth";
  // SERVICE RESPONSAVEL PELA PARTE DE CADASTRO, LOGIN E LOGOUT

  constructor(private http: HttpClient) { }

  async cadastrar(user: Usuario): Promise<any> {
    // to-do: chamada de servico rest /user/create
    let request = this.http.post<any>(this.authUrl+"/signup", user);

    request.subscribe((data) => {
      sessionStorage.setItem("nm_completo", data['nm_completo']);
    }, (err) => {
      return err;
    })
  }

  async login(user): Promise<any> {
    // to-do: chamada de servico rest /auth/login
    let request = this.http.get<any>(this.authUrl+"/login", user);

    request.subscribe((data) => {
      sessionStorage.setItem("nm_completo", data['nm_completo']);
    }, (err) => {
      return err;
    })
  }

  async logout(): Promise<any> {
    // to-do: chamada de servico rest /user/logout
    let request = this.http.get<any>(this.userUrl+"/logout");

    request.subscribe(() => {
      sessionStorage.removeItem("nm_completo");
    }, (err) => {
      return err
    })
  }


  }

