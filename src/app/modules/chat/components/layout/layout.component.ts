import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ChatSetupFacade } from '../../facedes/chat-setup.facede';
import { ChatHeaderComponent } from '../chat-header/chat-header.component';
import { SideMenuComponent } from './side-menu/side-menu.component';

@Component({
  standalone: true,
  selector: 'chat-layout',
  styleUrl: './layout.component.scss',
  templateUrl: './layout.component.html',
  imports: [RouterOutlet, ChatHeaderComponent, SideMenuComponent],
})
export class LayoutComponent {
  private chatSetupFacade = inject(ChatSetupFacade);

  public isSideMenuOpen: boolean = true;

  public toggleSideMenu(): void {
    this.isSideMenuOpen = !this.isSideMenuOpen;
  }

  ngOnInit() {
    this.chatSetupFacade.init().subscribe({});
  }
}
