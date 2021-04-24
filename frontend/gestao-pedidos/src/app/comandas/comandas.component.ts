import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import Swal from 'sweetalert2';
import { ComandaService } from '../services/comanda.service';
import { PedidoDTO } from '../shared/model.module';

@Component({
  selector: 'app-comandas',
  templateUrl: './comandas.component.html',
  styleUrls: ['./comandas.component.css']
})
export class ComandasComponent implements OnInit {

  pedidosCriados = [];
  pedidosPreparando = [];
  pedidosFinalizados = [];

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
        console.log(data);
      }, (err) => {
        // SWEET ALERT
        Swal.fire({ title:'Erro!', html:"<p>Ocorreu algo de errado na conexão com o servidor.</p>"+
        "<p>Tente novamente mais tarde</p>", icon: 'error'})
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
    })

    this.comandaService.fetchByStatus("PREPARANDO").subscribe((data) => {
      this.pedidosPreparando = this.pedidosPreparando.concat(data);
     })

     this.comandaService.fetchByStatus("FINALIZADO").subscribe((data) => {
      this.pedidosFinalizados = this.pedidosFinalizados.concat(data);
     })
  }

  exibirDetalhesPedido(pedido: PedidoDTO) {
    console.log(pedido);
    //TO-DO: SWEET ALERT COM AS INFO DETALHADAS DO PEDIDO
  }
}
