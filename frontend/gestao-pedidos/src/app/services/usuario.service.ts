import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Endereco } from '../shared/model.module';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  requestUrl = "http://ranch-backend-fbv.herokuapp.com/api/";
  addressUrl = this.requestUrl + "/address";
  userUrl = this.requestUrl + "/user";
  config = {withCredentials: true}; // SEMPRE PASSAR
   // TODAS AS INFOS DO USUARIO SERÃO RETORNADA POR ESTE SERVICE

  constructor(private http: HttpClient) { }

  getUserLogged() {
    return this.http.get<any>(this.userUrl+"/userLogged", this.config)
  }

  fetchEnderecoUsuario() {
    return this.http.get<Endereco>(this.addressUrl+"/findByUser", this.config);
  }

  addEnderecoUsuario(endereco: Endereco) {
    return this.http.post<any>(this.addressUrl+"/create", endereco, this.config);
  }
  
}
