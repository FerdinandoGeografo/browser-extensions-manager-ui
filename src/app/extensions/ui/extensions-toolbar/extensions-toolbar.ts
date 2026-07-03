import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatButton } from '@angular/material/button';
import { MatToolbar } from '@angular/material/toolbar';
import { ExtensionFilter } from '../../../shared/models/extension.model';

@Component({
  selector: 'app-extensions-toolbar',
  imports: [RouterLink, RouterLinkActive, MatToolbar, MatButton],
  templateUrl: './extensions-toolbar.html',
  styleUrl: './extensions-toolbar.scss',
})
export class ExtensionsToolbar {
  protected readonly links: ExtensionFilter[] = [
    {
      label: 'All',
      filter: null,
    },
    {
      label: 'Active',
      filter: { isActive: true },
    },
    {
      label: 'Inactive',
      filter: { isActive: false },
    },
  ];
}
