import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../shared/model.module';

import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  requestUrl = "http://localhost:9090/api";
  userUrl = this.requestUrl + "/user";
  authUrl = this.requestUrl + "/auth";
  // SERVICE RESPONSAVEL PELA PARTE DE CADASTRO, LOGIN E LOGOUT

  constructor(private http: HttpClient) { }

  cadastrar(user: Usuario): any {
    // chamada de servico rest /user/create
    let request = this.http.post<any>(this.authUrl+"/signup", user);

    request.subscribe((data) => {
     console.log(data);
      //to-do: ARMAZENAR OS DADOS VINDOS NUM SESSIONSTORAGE
    }, (err) => {
     console.log(err);
    })
  }

  login(user): any {
    // chamada de servico rest /auth/login
    let request = this.http.post<any>(this.authUrl+"/login", user);

    request.subscribe((data) => {
      console.log(data)
      //to-do: ARMAZENAR OS DADOS VINDOS NUM SESSIONSTORAGE
    }, (err) => {
     console.log(err)
    })
  }

  logout() {
    // to-do: chamada de servico rest /user/logout
    let request = this.http.get<any>(this.userUrl+"/logout");

    request.subscribe(() => {
    }, (err) => {
      return err
    })
  }


  }

