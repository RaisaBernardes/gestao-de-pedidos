import { Component, OnInit, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { MatMenuTrigger } from '@angular/material/menu';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent {

  private cartVisible: boolean = false;

  constructor(private breakpointObserver: BreakpointObserver, private router: Router) { }

  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;

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
  checkUserPrivilege = (cd: String) => {sessionStorage.getItem('cd_tipo_usuario') ===  cd ? true : false};

}
