import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cardapio',
  templateUrl: './cardapio.component.html',
  styleUrls: ['./cardapio.component.css']
})
export class CardapioComponent implements OnInit {

  item: string;
  
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {

    // TO-DO: MUDAR A SEÇÃO EM TEMPO REAL (NO MOMENTO SO FUNCIONA SE DER REFRESH)
    this.item = this.route.snapshot.params['item'];

  }

}
