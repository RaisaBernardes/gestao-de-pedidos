import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import Swal from 'sweetalert2';
import { ComandaService } from '../services/comanda.service';
import { PedidoContemDTO, PedidoDTO, UsuarioDTO } from '../shared/model.module';

@Component({
  selector: 'app-historico',
  templateUrl: './historico.component.html',
  styleUrls: ['./historico.component.css']
})
export class HistoricoComponent implements OnInit {

  pedidos: PedidoDTO[] = [];

  constructor(private cookieService: CookieService, private comandaService: ComandaService, private router: Router) { }

  ngOnInit(): void {
    if (!this.checkAdminLogged()) {
      this.router.navigateByUrl('/');
    }

    this.fetchPedidos();

  }

  checkAdminLogged(): boolean {
    return this.cookieService.check('SessionCookie') && sessionStorage.getItem('tp_usuario') === 'ADMIN';
  }

  fetchPedidos() {
    this.comandaService.fetchAll().subscribe(data => {
      this.pedidos = this.pedidos.concat(data);
      this.pedidos.map(pedido => this.fetchDetalhesPedidos(pedido));

      console.log(data);
    })
  }

  fetchDetalhesPedidos(pedido: PedidoDTO) {
    var pedidosDetalhados: PedidoContemDTO[] = [];

    this.comandaService.getItensPedido(pedido.cdPedido).subscribe((itensInOrder) => { // info da tabela ITEM_IN_ORDER

      itensInOrder.forEach(itemInOrder => {
          pedidosDetalhados.push(itemInOrder); // PEDIDOS COM DETALHES
        })
    })

    pedido.pedidos = pedidosDetalhados;

    return pedido;
  }

  exibirModalCliente(user: UsuarioDTO) {

    var usuarioDescricao = `<p class="font-weight-light"><strong>Nome:</strong> ${user.nome}</p>` 
    + `<p class="font-weight-light"><strong>Telefone para Contato:</strong> ${user.telefone}</p>` 
    + `<p class="font-weight-light"><strong>Email:</strong> ${user.email}</p>`

    Swal.fire({title: `Informações do Cliente:`,
               html: `<hr>`+usuarioDescricao+`<hr>`,
               confirmButtonColor: '#000000'})

  }

  exibirModalItens(itens: PedidoContemDTO[]) {
    var itensDescricao: string = '';

    itens.forEach(item => {
      itensDescricao += `<p class="font-weight-light"><span class="badge badge-pill badge-dark">${item.quantidade}</span> ${item.item.descricao}</p>`
    })

    Swal.fire({title: `Descrição dos Itens:`, 
    html: `<hr>` + itensDescricao + `<hr>`,
    confirmButtonColor: '#000000' })
  }

}
