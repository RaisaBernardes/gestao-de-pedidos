import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import Swal from 'sweetalert2';
import { ComandaService } from '../services/comanda.service';
import { PedidoContemDTO, PedidoDTO } from '../shared/model.module';

@Component({
  selector: 'app-comandas',
  templateUrl: './comandas.component.html',
  styleUrls: ['./comandas.component.css']
})
export class ComandasComponent implements OnInit {

  pedidosCriados: PedidoDTO[] = [];
  pedidosPreparando: PedidoDTO[] = [];
  pedidosFinalizados: PedidoDTO[] = [];

  constructor(private cookieService: CookieService, private comandaService: ComandaService, private router: Router) { }

  ngOnInit(): void {
    if (!this.checkAdminLogged()) {
      this.router.navigateByUrl('/');
    }

    this.fetchLists();
  }

  drop(event: CdkDragDrop<any[]>, status: string) {

    const pedidoAtualizado = {
      "cdPedido": event.previousContainer.data[event.previousIndex].cdPedido,
      "status": status
    }

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {

      // movendo para outra lista
      this.comandaService.atualizarStatus(pedidoAtualizado).subscribe(data => {
      }, (err) => {
        // SWEET ALERT
        Swal.fire({ title:'Erro!', html:"<p>Ocorreu algo de errado na conexão com o servidor.</p>"+
        "<p>Tente novamente mais tarde</p>", icon: 'error',  confirmButtonColor: '#000000'})
        return;
      });

      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

  checkAdminLogged(): boolean {
    return this.cookieService.check('SessionCookie') && sessionStorage.getItem('tp_usuario') === 'ADMIN';
  }

  fetchLists() {

    this.comandaService.fetchByStatus("CRIADO").subscribe((data) => {
     this.pedidosCriados = this.pedidosCriados.concat(data);

     this.pedidosCriados = this.filterListByCurrentDate(this.pedidosCriados);

     this.pedidosCriados.forEach(element => {
       element = this.fetchDetalhesPedidos(element);
     })
    })

    this.comandaService.fetchByStatus("PREPARANDO").subscribe((data) => {
      this.pedidosPreparando = this.pedidosPreparando.concat(data);

      this.pedidosPreparando = this.filterListByCurrentDate(this.pedidosPreparando);

      this.pedidosPreparando.forEach(element => {
        element = this.fetchDetalhesPedidos(element);
      })
     })

     this.comandaService.fetchByStatus("FINALIZADO").subscribe((data) => {
      this.pedidosFinalizados = this.pedidosFinalizados.concat(data)

      this.pedidosFinalizados = this.filterListByCurrentDate(this.pedidosFinalizados);

      this.pedidosFinalizados.forEach(element => {
        element = this.fetchDetalhesPedidos(element);
      })
     })
  }

  exibirDetalhesPedido(pedido: PedidoDTO) {

    var itensDescricao: string = '';

    pedido.pedidos.forEach(pedido => {
      itensDescricao += `<p class="font-weight-light"><span class="badge badge-pill badge-dark">${pedido.quantidade}</span> ${pedido.item.descricao}</p>`
    })

    var usuarioDescricao = `<p class="font-weight-light"><strong>Nome do Cliente:</strong> ${pedido.user.nome}</p>` 
                        + `<p class="font-weight-light"><strong>Contato:</strong> ${pedido.user.telefone}</p>` 
                        + `<p class="font-weight-light"><strong>Email:</strong> ${pedido.user.email}</p>` 
                        + `<hr>`
                        + `<p class="font-weight-light"><strong>Endereço de Entrega:</strong> <br> ${pedido.address?.logradouro}, ${pedido.address?.numero} ${pedido.address?.complemento} -`
                        +` ${pedido.address?.bairro}, ${pedido.address?.cidade}, ${pedido.address?.estado}`

    Swal.fire({title: `Detalhes do Pedido Nº ${pedido.cdPedido}`, 
               html: `<hr>` + itensDescricao +
               `<hr>` + usuarioDescricao
               + `<hr> <p class="font-weight-light"><strong>Total:</strong> R$ ${pedido.precoTotal.toFixed(2)}</p>`,
               confirmButtonColor: '#000000' })
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

  filterListByCurrentDate(pedidos: PedidoDTO[]) {
    var currentDate = new Date();
    currentDate.setHours(0,0,0,0);

    return pedidos.filter(pedido => new Date(pedido.createdAt) > currentDate);
  }

  cancelarPedido(pedido: PedidoDTO) {

    Swal.fire({
      title: 'Deseja cancelar este pedido?',
      showDenyButton: true,
      confirmButtonText: `Confirmar`,
      confirmButtonColor: '#000000',
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isDenied) {
        return;
      } else if (result.isConfirmed) {
        
        const pedidoAtualizado = {
          "cdPedido": pedido.cdPedido,
          "status": "CANCELADO"
          }
       // CANCELANDO PEDIDO
       this.comandaService.atualizarStatus(pedidoAtualizado).subscribe(data => {
         window.location.reload();
       }, (err) => {
         // SWEET ALERT
         Swal.fire({ title:'Erro!', html:"<p>Ocorreu algo de errado na conexão com o servidor.</p>"+
         "<p>Tente novamente mais tarde</p>", icon: 'error',  confirmButtonColor: '#000000'})
         return;
       });
      }
    });
  }
}
