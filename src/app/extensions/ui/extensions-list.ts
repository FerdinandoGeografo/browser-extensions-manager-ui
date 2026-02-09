import { Component, input, output } from '@angular/core';
import { IExtensions } from '../../shared/data-access/global-store';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-extensions-list',
  imports: [MatButtonModule, MatSlideToggleModule],
  template: `
    <ul class="extensions__list">
      @for (extension of extensions(); track extension.name) {
      <li class="extension">
        <div class="extension__info">
          <img
            class="extension__icon"
            [src]="extension.logo"
            [alt]="extension.name + ' logo image'"
          />

          <div class="extension__details">
            <p class="heading heading--xl">{{ extension.name }}</p>
            <p class="heading heading--sm">{{ extension.description }}</p>
          </div>
        </div>
        <div class="extension__actions">
          <button
            matButton="outlined"
            (click)="extensionRemoved.emit(extension.name)"
          >
            Remove
          </button>

          <mat-slide-toggle
            hideIcon
            [checked]="extension.isActive"
            (change)="extensionToggled.emit(extension.name)"
          />
        </div>
      </li>
      }
    </ul>
  `,
  styles: `
    @use '../../../../public/scss/_media-queries.scss' as mixin;
    @use '@angular/material' as mat;

    :host {
      .extensions {
        &__list {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.2rem;

          @include mixin.respond(tablet) {
            grid-template-columns: repeat(2, 1fr);
          }

          @include mixin.respond(phone) {
            grid-template-columns: 1fr;
          }
        }
      }

      .extension {
        padding: 1.9rem;
        display: flex;
        flex-direction: column;
        gap: 4.6rem;
        background-color: light-dark(var(--neutral-0), var(--neutral-800));
        border-radius: 2rem;
        border: 1px solid light-dark(var(--neutral-200), var(--neutral-600));
        box-shadow: 0 2px 2px light-dark(rgba(194, 206, 225, .2), transparent) , 0px 1px 5px 1px light-dark(rgba(194, 206, 225, .22), transparent);
        transition: all .35s ease-in-out;

        &__info {
          display: flex;
          align-items: start;
          gap: 1.6rem;
          flex: 1;
        }

        &__details {
          display: flex;
          flex-direction: column;
          gap: .8rem;

          .heading--xl {
            transition: color .35s ease-in-out;
            color: light-dark(var(--neutral-900), var(--neutral-0));
          }

          .heading--sm {
            transition: color .35s ease-in-out;
            color: light-dark(var(--neutral-600), var(--neutral-300));
          }
        }

        &__actions {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        @include mixin.respond(tablet) {
          gap: 2.4rem;
        }
      }
    }
  `,
})
export class ExtensionsList {
  extensions = input.required<IExtensions[]>();

  extensionRemoved = output<IExtensions['name']>();
  extensionToggled = output<IExtensions['name']>();
}
