import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PedidoDTO } from '../shared/model.module';

@Injectable({
  providedIn: 'root'
})
export class ComandaService {

  requestOrderUrl = "http://localhost:9090/api/order/"
  config = {withCredentials: true}; // SEMPRE PASSAR
  // SERVICE RESPONSAVEL PELA PARTE DE ORDER (PEDIDO/COMANDA)

  constructor(private http: HttpClient) { }

  fetchByStatus(status: string): Observable<any> {
    // chamada de servico rest /order/findByWhere
    return this.http.post<PedidoDTO>(this.requestOrderUrl+"/findByWhere", 
                               {"status": status}, this.config);
  }

  atualizarStatus(pedidoAtualizado: PedidoDTO): Observable<any> {
    return this.http.post<any>(this.requestOrderUrl+"/update", pedidoAtualizado, this.config)
  }
}
