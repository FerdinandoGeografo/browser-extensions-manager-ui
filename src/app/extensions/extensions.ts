import { Component, inject } from '@angular/core';
import { GlobalStore } from '../shared/data-access/global-store';
import { ExtensionsToolbar } from './ui/extensions-toolbar/extensions-toolbar';
import { ExtensionsList } from './ui/extensions-list/extensions-list';

@Component({
  selector: 'app-extensions',
  imports: [ExtensionsToolbar, ExtensionsList],
  templateUrl: './extensions.html',
  styleUrl: './extensions.scss',
})
export class Extensions {
  protected gs = inject(GlobalStore);
}
