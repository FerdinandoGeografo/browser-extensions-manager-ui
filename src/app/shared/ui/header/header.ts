import { Component, computed, inject, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Logo } from '../logo/logo';
import { GlobalStore } from '../../data-access/global-store';

@Component({
  selector: 'app-header',
  imports: [MatToolbarModule, MatIconModule, MatButtonModule, Logo],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  isDarkMode = input.required<boolean>();
  themeChanged = output<void>();

  protected gs = inject(GlobalStore);

  protected themeIcon = computed(
    () => `custom:${this.gs.isDarkTheme() ? 'sun' : 'moon'}`,
  );
}
