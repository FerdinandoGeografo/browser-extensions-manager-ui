import { Component, signal } from '@angular/core';
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
        @for (link of links(); track $index) {
        <a
          matButton="filled"
          routerLink="."
          routerLinkActive="active"
          [routerLinkActiveOptions]="{ exact: true }"
          [queryParams]="link.filter"
        >
          {{ link.label }}
        </a>
        }
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
            container-text-color: light-dark(var(--neutral-900), var(--neutral-0)),
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
