import { Component, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { MatMenuTrigger } from '@angular/material/menu';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent {

  private cartVisible: boolean = false;
  private tp_usuario: String;

  constructor(private cookieService: CookieService, private breakpointObserver: BreakpointObserver, private router: Router) { }

  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;

  ngOnInit() {
  }

  someMethod() {
    this.trigger.openMenu();
  }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

    // ROTA PARA O CARDAPIO
    navigate(param: String) {
        this.router.navigate(['/cardapio/'+param]);
    }

    refresh(): void {
      window.location.reload();
  }

  // FOR ICONS AND PAGES
  checkUserPrivilege(tp: String): boolean {
    return sessionStorage.getItem('tp_usuario') ==  tp ? true : false
  };

  checkUserLogged(): boolean {
    return this.cookieService.check('SessionCookie');
  }

}
