import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { windowCount } from 'rxjs/operators';

@Component({
  selector: 'app-cardapio',
  templateUrl: './cardapio.component.html',
  styleUrls: ['./cardapio.component.css']
})
export class CardapioComponent {

  item: string;

  constructor(public route: ActivatedRoute) { }

}
