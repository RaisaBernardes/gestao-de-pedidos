import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../shared/model.module';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  requestUrl = "http://ranch-backend-fbv.herokuapp.com/api/";
  userUrl = this.requestUrl + "/user";
  authUrl = this.requestUrl + "/auth";
  config = {withCredentials: true}; // SEMPRE PASSAR
  // SERVICE RESPONSAVEL PELA PARTE DE CADASTRO, LOGIN E LOGOUT

  constructor(private http: HttpClient) { }

  cadastrar(user: Usuario): Observable<any> {
    // chamada de servico rest /user/create
    return this.http.post<any>(this.authUrl+"/signup", user, this.config);
  }

  login(user): Observable<any> {
    // chamada de servico rest /auth/login
    return this.http.post<any>(this.authUrl+"/login", user, this.config);
  }

  logout(): Observable<any> {
    // to-do: chamada de servico rest /user/logout
    return this.http.get<any>(this.userUrl+"/logout", this.config);
  }


  }

