import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  booleanAttribute,
} from '@angular/core';
import { IChatSetupModuleItem } from '../../../../interfaces/chat-setup.interface';

@Component({
  imports: [],
  standalone: true,
  selector: 'chat-side-menu-item',
  styleUrl: './side-menu-item.component.scss',
  templateUrl: './side-menu-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideMenuItemComponent {
  @Output() onSelect = new EventEmitter<ISideMenuItemSelectedOutput>();

  @Input() submoduleId: number = 0;
  @Input({ transform: booleanAttribute }) isOpen = false;
  @Input({ required: true }) module: IChatSetupModuleItem =
    {} as IChatSetupModuleItem;

  public maxHeight: string = '';

  ngOnInit() {
    const count = this.module.submodules.reduce((acc) => acc + 48, 0);
    this.maxHeight = `${count}px`;
  }

  ngAfterViewInit() {
    this.checkMaxHeightSubmenu();
  }

  public handleSelectSubmodule(moduleId: number, submoduleId: number) {
    this.onSelect.emit({ moduleId, submoduleId });
  }

  public handleToggleOpen() {
    this.isOpen = !this.isOpen;
  }

  private checkMaxHeightSubmenu() {}
}

export interface ISideMenuItemSelectedOutput {
  moduleId: number;
  submoduleId: number;
}
