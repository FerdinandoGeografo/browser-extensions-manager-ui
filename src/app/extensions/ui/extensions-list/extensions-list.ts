import { Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { IExtensions } from '../../../shared/data-access/global-store';

@Component({
  selector: 'app-extensions-list',
  imports: [MatButtonModule, MatSlideToggleModule],
  templateUrl: './extensions-list.html',
  styleUrl: './extensions-list.scss',
})
export class ExtensionsList {
  extensions = input.required<IExtensions[]>();

  extensionRemoved = output<IExtensions['name']>();
  extensionToggled = output<IExtensions['name']>();
}
