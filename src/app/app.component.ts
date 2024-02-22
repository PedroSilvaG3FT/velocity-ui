import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import Iconify from '@iconify/iconify';
import { environment } from '../environments/environment';
import { ThemeService } from './modules/@shared/services/theme.service';

@Component({
  standalone: true,
  selector: 'app-root',
  styleUrl: './app.component.scss',
  templateUrl: './app.component.html',
  imports: [CommonModule, RouterOutlet, RouterModule],
})
export class AppComponent {
  public title = 'velocity-ui';
  private msalService = inject(MsalService);
  private themeService = inject(ThemeService);

  constructor() {
    Iconify.listIcons();
    this.themeService.init();
    this.msalService.initialize();

    console.warn(`enviroments`, environment);
  }
}
