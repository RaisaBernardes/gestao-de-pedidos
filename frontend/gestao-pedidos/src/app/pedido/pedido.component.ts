import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { PedidoService } from '../services/pedido.service';
import { Item, FormaPagamento, PedidoContem, Pedido, Pagamento, Endereco } from '../shared/model.module';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css']
})
export class PedidoComponent implements OnInit {

  itensPedido: PedidoContem[] = new Array;
  vlTotal: number = 0;

  formaPagamento: FormaPagamento[] = new Array;
  enderecos: Endereco[] = new Array;
  pagamentoUsuario: Pagamento = new Pagamento;

  pedidoFormGroup: FormGroup;

  hamburguerImgs = ['cheeseburger_tradicional', 'cheeseburger_duplo', 'cheeseburger_bacon', 'australian_cheese', 'chicken_burger', 'vegan_burger']
  .map((item) => `../../assets/cardapio/hamburgueres/${item}.png`);

  bebidasImgs = ['cerveja', 'refrigerante', 'suco', 'milkshake', 'agua', 'agua_com_gas']
  .map((item) => `../../assets/cardapio/bebidas/${item}.png`);

  acompImgs = ['fritas_simples', 'fritas_cheddar_bacon', 'aneis_de_cebola', 'batata_rustica']
  .map((item) => `../../assets/cardapio/acompanhamentos/${item}.png`);

  sobrImgs = ['brownie', 'pudim']
  .map((item) => `../../assets/cardapio/sobremesas/${item}.png`);

  itensCardapio = {
    "hamburgueres": [],
    "acompanhamentos": [],
    "bebidas": [],
    "sobremesas": []
  }


  carouselOptions: any = {
    items: 1,
    singleItem:true,
    loop:true,
    autoplayTimeout:3000,
    autoplay:true,
    responsiveClass: true
  }

  constructor(private cookieService: CookieService, private router: Router, private formBuilder: FormBuilder, private pedidoService: PedidoService) { }

  ngOnInit(): void {

    if (!this.checkUserLogged()) {
      this.router.navigateByUrl('/');
    }

    this.pedidoService.fetchCardapio(1).subscribe((data) => {
      this.itensCardapio.hamburgueres = this.itensCardapio.hamburgueres.concat(data);
    })

    this.pedidoService.fetchCardapio(2).subscribe((data) => {
      this.itensCardapio.acompanhamentos = this.itensCardapio.acompanhamentos.concat(data);
    })

    this.pedidoService.fetchCardapio(3).subscribe((data) => {
      this.itensCardapio.bebidas = this.itensCardapio.bebidas.concat(data);
    })

    this.pedidoService.fetchCardapio(4).subscribe((data) => {
      this.itensCardapio.sobremesas = this.itensCardapio.sobremesas.concat(data);
    })

    this.pedidoService.fetchPagamento().subscribe((data) => {
      this.formaPagamento = this.formaPagamento.concat(data);
    })

    this.pedidoService.fetchEnderecoUsuario().subscribe((data) => {
      this.enderecos = this.enderecos.concat(data);
    })

    this.pedidoFormGroup = this.formBuilder.group({
      forma: ['', [Validators.required]],
      endereco: ['', [Validators.required]]
    })
  }

  // somente teste - no futuro terá um parametro ID do item para somar no objeto pedido
  addItem(item: Item) {
    var exists = false;

    this.itensPedido.map(element => {
       if (element.itemCdItem == item.cdItem) {
         exists = true;
         element.quantidade++;
       }
    });

    if (!exists) {
    this.itensPedido.push(new PedidoContem(item.cdItem))
    }
    this.vlTotal += item.preco;

    console.log(this.itensPedido);
  }

  removeItem(item: Item) {
    var exists = false;

    this.itensPedido.map(element => {
      if (element.itemCdItem == item.cdItem && element.quantidade > 1) {
        exists = true;
        element.quantidade--; 
      }
   });

   this.itensPedido.forEach(element => {
    if (element.itemCdItem == item.cdItem) {
      this.vlTotal -= item.preco;
    }})

   if (!exists) {
    this.itensPedido = this.itensPedido.filter(element => element.itemCdItem !== item.cdItem);
   }

    console.log(this.itensPedido);
  }

  finalizarPedido() {
    this.pagamentoUsuario = {
      vlTotal: this.vlTotal,
      formaPagamento: this.pedidoFormGroup.getRawValue().forma
    }

    var pedidoUsuario: Pedido = {
      pedidos: this.itensPedido,
      pagamento: this.pagamentoUsuario,
      enderecoEntrega: this.pedidoFormGroup.getRawValue().endereco
    } 

   // console.log(pedidoUsuario);

    this.pedidoService.realizarPedido(pedidoUsuario).subscribe((data) => {
      console.log(data);
    }) 
  }

  checkUserLogged(): boolean {
    return this.cookieService.check('SessionCookie');
  }
  

}
