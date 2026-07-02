import { Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-extensions-toolbar',
  imports: [RouterLink, RouterLinkActive, MatToolbarModule, MatButtonModule],
  templateUrl: './extensions-toolbar.html',
  styleUrl: './extensions-toolbar.scss',
})
export class ExtensionsToolbar {
  protected readonly links = signal<
    { label: string; filter?: { isActive: boolean } }[]
  >([
    {
      label: 'All',
    },
    {
      label: 'Active',
      filter: { isActive: true },
    },
    {
      label: 'Inactive',
      filter: { isActive: false },
    },
  ]);
}
