import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormaPagamento, Item, Pedido, PedidoContem } from '../shared/model.module';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  requestUrl = "http://localhost:9090/api";
  pedidoUrl = this.requestUrl + "/order";
  itemUrl = this.requestUrl + "/item";
  config = {withCredentials: true}; // SEMPRE PASSAR
  // SERVICE RESPONSAVEL PELA PARTE DE PEDIDOS

  // mock
  pedidoMockUrl = "http://localhost:3000/item";
  pagamentoMockUrl = "http://localhost:3000/formOfPayment"

  constructor(private http: HttpClient) {
   }

   // para cliente
   realizarPedido(pedido: Pedido) {
     return this.http.post<any>(this.pedidoUrl+"/realizarPedido", pedido, this.config);
     // O QUE SERIA IDEAL: FRONT-END ENVIA OBJETO PEDIDO COM PEDIDOCONTEM 
     // E A API SERÁ RESPONSAVEL POR RELACIONAR OS DOIS
   }

   fetchMockCardapio(cd_tipo_item: any) {
     return this.http.get<Item>(`${this.pedidoMockUrl}?cd_tipo_item=${cd_tipo_item}`);
   }

   fetchMockPagamento() {
     return this.http.get<FormaPagamento>(this.pagamentoMockUrl);
   }

   // para admin
   mudarStatus(pedidoAtualizado: Pedido) {
     return this.http.put<any>(this.pedidoUrl+"/update", pedidoAtualizado);
   }
}
