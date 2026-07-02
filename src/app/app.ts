import { Component, inject } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';
import { GlobalStore } from './shared/data-access/global-store';
import { Header } from './shared/ui/header/header';

@Component({
  selector: 'app-root',
  imports: [Header, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  #matIconRegistry = inject(MatIconRegistry);
  #sanitizer = inject(DomSanitizer);
  protected gs = inject(GlobalStore);

  constructor() {
    this.#matIconRegistry.addSvgIconSetInNamespace(
      'custom',
      this.#sanitizer.bypassSecurityTrustResourceUrl('icons/icons.svg'),
    );
  }
}
