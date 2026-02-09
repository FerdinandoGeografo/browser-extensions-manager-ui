import { Component, inject } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Header } from './shared/ui/header';
import { RouterOutlet } from '@angular/router';
import { GlobalStore } from './shared/data-access/global-store';

@Component({
  selector: 'app-root',
  imports: [Header, RouterOutlet],
  template: `
    <app-header
      [isDarkMode]="gs.isDarkTheme()"
      (themeChanged)="gs.toggleTheme()"
    />
    <main class="main">
      <router-outlet />
    </main>
  `,
  styles: `
    @use '../../public/scss/_media-queries.scss' as mixin;

    :host {
      display: flex;
      flex-direction: column;
      gap: 7rem;
      padding: 4rem 13.5rem 6.4rem;

      @include mixin.respond(tablet) {
        gap: 4rem;
        padding: 2.4rem 3.2rem 6.4rem;
      }

      @include mixin.respond(phone) {
        padding: 2.4rem 1.6rem 6.4rem;
      }
    }
  `,
})
export class App {
  #matIconRegistry = inject(MatIconRegistry);
  #sanitizer = inject(DomSanitizer);
  protected gs = inject(GlobalStore);

  constructor() {
    this.#matIconRegistry.addSvgIconSetInNamespace(
      'custom',
      this.#sanitizer.bypassSecurityTrustResourceUrl('icons/icons.svg')
    );
  }
}
