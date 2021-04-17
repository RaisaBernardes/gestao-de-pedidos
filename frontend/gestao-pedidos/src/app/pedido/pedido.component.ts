import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css']
})
export class PedidoComponent implements OnInit {

  item = 0;
  isLinear = true;
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

  carouselOptions: any = {
    items: 1,
    singleItem:true,
    loop:true,
    autoplayTimeout:3000,
    autoplay:true,
    responsiveClass: true
  }

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.cardapioFormGroup = this.formBuilder.group({
    });
    this.enderecoFormGroup = this.formBuilder.group({
      enderecoCtrl: ['']
    });
  }

  // somente teste - no futuro terá um parametro ID do item para somar no objeto pedido
  addItem() {
    this.item++;
    console.log(this.item);
  }
  

}
