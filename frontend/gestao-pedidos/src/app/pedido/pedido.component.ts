import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PedidoService } from '../services/pedido.service';
import { Item, FormaPagamento, PedidoContem, Pedido, Pagamento } from '../shared/model.module';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css']
})
export class PedidoComponent implements OnInit {

  itensPedido: PedidoContem[] = new Array;
  vlTotal: number = 0;

  formaPagamento: FormaPagamento[] = new Array;
  pagamentoUsuario: Pagamento = new Pagamento;

  cardapioFormGroup: FormGroup;
  enderecoFormGroup: FormGroup;
  pagamentoFormGroup: FormGroup;

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

  constructor(private formBuilder: FormBuilder, private pedidoService: PedidoService) { }

  ngOnInit(): void {

    this.pedidoService.fetchMockCardapio(1).subscribe((data) => {
      this.itensCardapio.hamburgueres = this.itensCardapio.hamburgueres.concat(data);
    })

    this.pedidoService.fetchMockCardapio(2).subscribe((data) => {
      this.itensCardapio.acompanhamentos = this.itensCardapio.acompanhamentos.concat(data);
    })

    this.pedidoService.fetchMockCardapio(3).subscribe((data) => {
      this.itensCardapio.bebidas = this.itensCardapio.bebidas.concat(data);
    })

    this.pedidoService.fetchMockCardapio(4).subscribe((data) => {
      this.itensCardapio.sobremesas = this.itensCardapio.sobremesas.concat(data);
    })

    this.pedidoService.fetchMockPagamento().subscribe((data) => {
      this.formaPagamento = this.formaPagamento.concat(data);
    })

    this.pagamentoFormGroup = this.formBuilder.group({
      forma: ['']
    })
  }

  // somente teste - no futuro terá um parametro ID do item para somar no objeto pedido
  addItem(item: Item) {
    var exists = false;

    this.itensPedido.map(element => {
       if (element.cd_item == item.cd_item) {
         exists = true;
         element.quantidade++;
       }
    });

    if (!exists) {
    this.itensPedido.push(new PedidoContem(item.cd_item))
    }
    this.vlTotal += item.preco;

    console.log(this.itensPedido);
  }

  removeItem(item: Item) {
    var exists = false;

    this.itensPedido.map(element => {
      if (element.cd_item == item.cd_item && element.quantidade > 1) {
        exists = true;
        element.quantidade--; 
      }
   });

   this.itensPedido.forEach(element => {
    if (element.cd_item == item.cd_item) {
      this.vlTotal -= item.preco;
    }})

   if (!exists) {
    this.itensPedido = this.itensPedido.filter(element => element.cd_item !== item.cd_item);
   }

    console.log(this.itensPedido);
  }

  finalizarPedido() {
    this.pagamentoUsuario = {
      vl_total: this.vlTotal,
      forma_pagamento: this.pagamentoFormGroup.getRawValue()
    }

    var pedidoUsuario: Pedido = {
      pedidos: this.itensPedido,
      pagamento: this.pagamentoUsuario
    } 

    console.log(pedidoUsuario);
  }
  

}
