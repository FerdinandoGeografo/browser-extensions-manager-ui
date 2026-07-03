import { Component, computed, input, output } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatToolbar } from '@angular/material/toolbar';
import { Logo } from '../logo/logo';

@Component({
  selector: 'app-header',
  imports: [MatToolbar, MatIconButton, MatIcon, Logo],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  isDarkTheme = input.required<boolean>();
  themeChanged = output<void>();

  protected themeIcon = computed(
    () => `custom:${this.isDarkTheme() ? 'sun' : 'moon'}`,
  );
}
