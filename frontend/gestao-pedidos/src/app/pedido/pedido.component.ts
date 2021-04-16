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
