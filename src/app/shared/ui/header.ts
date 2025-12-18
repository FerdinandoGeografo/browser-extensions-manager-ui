import { Component, computed, inject, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Logo } from './logo';
import { GlobalStore } from '../data-access/global-store';

@Component({
  selector: 'app-header',
  imports: [MatToolbarModule, MatIconModule, MatButtonModule, Logo],
  template: `
    <header class="header">
      <mat-toolbar class="header__toolbar">
        <app-logo />

        <button matIconButton (click)="themeChanged.emit()" disableRipple>
          <mat-icon svgIcon="custom:{{ isDarkMode() ? 'sun' : 'moon' }}" />
        </button>
      </mat-toolbar>
    </header>
  `,
  styles: `
    @use '@angular/material' as mat;

    :host {
      .header {
        &__toolbar {
          transition-property: box-shadow, background-color;
          transition-duration: .35s;
          justify-content: space-between;
          border-radius: 2rem;
          border: 1px solid light-dark(var(--neutral-200), transparent);
          box-shadow: 0 2px 3px light-dark(#d9e5f4, transparent);

          @include mat.toolbar-overrides((
            container-background-color: light-dark(var(--neutral-0), var(--neutral-800)),
            standard-height: 7.4rem,
            mobile-height: 6.6rem,
          ));
        }
      }
    }
  `,
})
export class Header {
  isDarkMode = input.required<boolean>();
  themeChanged = output<void>();

  protected gs = inject(GlobalStore);

  protected themeIcon = computed(
    () => `custom:${this.gs.isDarkTheme() ? 'sun' : 'moon'}`
  );
}
