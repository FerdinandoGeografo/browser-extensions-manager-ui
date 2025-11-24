import { Component, inject } from '@angular/core';
import { GlobalStore } from '../shared/data-access/global-store';
import { ExtensionsToolbar } from './ui/extensions-toolbar';
import { ExtensionsList } from './ui/extensions-list';

@Component({
  selector: 'app-extensions',
  imports: [ExtensionsToolbar, ExtensionsList],
  template: `
    <app-extensions-toolbar />
    <app-extensions-list
      [extensions]="gs.filteredExtensions()"
      (extensionRemoved)="gs.removeExtension($event)"
      (extensionToggled)="gs.toggleExtension($event)"
    />
  `,
  styles: `
    :host {
      display: flex;
      flex-direction:column;
      gap: 3.2rem;
    }
  `,
})
export class Extensions {
  protected gs = inject(GlobalStore);
}
