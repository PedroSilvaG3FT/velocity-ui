import { Component } from '@angular/core';
import { AppThemeSelectionComponent } from '../../../../@shared/components/app-theme-selection/app-theme-selection.component';

@Component({
  standalone: true,
  selector: 'side-menu',
  imports: [AppThemeSelectionComponent],
  styleUrl: './side-menu.component.scss',
  templateUrl: './side-menu.component.html',
})
export class SideMenuComponent {}
