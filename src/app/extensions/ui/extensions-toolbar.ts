import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-extensions-toolbar',
  imports: [RouterLink, RouterLinkActive, MatToolbarModule, MatButtonModule],
  template: `
    <mat-toolbar class="extensions__toolbar">
      <span class="heading heading--2xl">Extensions List</span>

      <div class="extensions__filters">
        <a
          matButton="filled"
          routerLink="."
          routerLinkActive="active"
          [routerLinkActiveOptions]="{ exact: true }"
        >
          All
        </a>
        <a
          matButton="filled"
          routerLink="/"
          routerLinkActive="active"
          [queryParams]="{ isActive: true }"
        >
          Active
        </a>
        <a
          matButton="filled"
          routerLink="/"
          routerLinkActive="active"
          [queryParams]="{ isActive: false }"
        >
          Inactive
        </a>
      </div>
    </mat-toolbar>
  `,
  styles: `
    @use '@angular/material' as mat;

    :host {
      .extensions {
        &__toolbar {
          padding: 0;
          justify-content: space-between;

          @include mat.toolbar-overrides((
            container-background-color: transparent,
            standard-height: auto,
            mobile-height: auto,
          ));
        }

        &__filters {
          display: flex;
          align-items: center;
          gap: 1.2rem;
        }
      }
    }
  `,
})
export class ExtensionsToolbar {}
