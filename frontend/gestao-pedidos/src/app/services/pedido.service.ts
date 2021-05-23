import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Endereco, FormaPagamento, Item, Pedido } from '../shared/model.module';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  requestUrl = "http://ranch-backend-fbv.herokuapp.com/api";
  pedidoUrl = this.requestUrl + "/order";
  tipoPagamentoUrl = this.requestUrl + "/formOfPayment"
  itemUrl = this.requestUrl + "/item";
  addressUrl = this.requestUrl + "/address";
  config = {withCredentials: true}; // SEMPRE PASSAR
  // SERVICE RESPONSAVEL PELA PARTE DE PEDIDOS

  constructor(private http: HttpClient) {
   }

   // para cliente
   realizarPedido(pedido: Pedido) {
     return this.http.post<any>(this.pedidoUrl+"/create", pedido, this.config);
   }

   fetchCardapio(itemTypeCdTipoItem: any) {
     const body = {"itemTypeCdTipoItem": itemTypeCdTipoItem}

     return this.http.post<Item>(this.itemUrl+"/findByWhere", body, this.config);
   }

   fetchPagamento() {
    return this.http.get<FormaPagamento>(this.tipoPagamentoUrl+"/findAll", this.config);
  }

  fetchEnderecoUsuario() {
    return this.http.get<Endereco>(this.addressUrl+"/findByUser", this.config);
  }
  
}
