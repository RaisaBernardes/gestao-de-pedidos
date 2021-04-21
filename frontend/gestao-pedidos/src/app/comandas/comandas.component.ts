import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-comandas',
  templateUrl: './comandas.component.html',
  styleUrls: ['./comandas.component.css']
})
export class ComandasComponent implements OnInit {

  constructor(private cookieService: CookieService, private router: Router) { }

  ngOnInit(): void {
    if (!this.checkAdminLogged()) {
      this.router.navigateByUrl('/');
    }
  }

  checkAdminLogged(): boolean {
    return this.cookieService.check('SessionCookie') && sessionStorage.getItem('tp_usuario') === 'ADMIN';
  }

}
