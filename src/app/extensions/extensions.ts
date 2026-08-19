import { Component, effect, inject, input } from '@angular/core';
import { ExtensionsToolbar } from './ui/extensions-toolbar/extensions-toolbar';
import { ExtensionsList } from './ui/extensions-list/extensions-list';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmModal } from './ui/confirm-modal/confirm-modal';
import { Extension } from '../shared/models/extension.model';
import { take } from 'rxjs/operators';
import { ExtensionsStore } from './data-access/extensions-store';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-extensions',
  imports: [ExtensionsToolbar, ExtensionsList],
  templateUrl: './extensions.html',
  styleUrl: './extensions.scss',
})
export class Extensions {
  readonly #route = inject(ActivatedRoute);
  readonly #router = inject(Router);
  readonly #dialog = inject(MatDialog);
  protected readonly extStore = inject(ExtensionsStore);

  readonly isActive = input<string>();

  constructor() {
    effect(() => {
      const isActive = this.isActive();
      if (isActive === undefined) {
        this.extStore.setFilter(null);
        return;
      }

      if (isActive === 'true' || isActive === 'false') {
        this.extStore.setFilter({ isActive: isActive === 'true' });
        return;
      }

      this.#router.navigate([], {
        relativeTo: this.#route,
        replaceUrl: true,
      });
    });
  }

  openConfirmModal(name: Extension['name']) {
    const ref = this.#dialog.open<ConfirmModal, string, boolean>(ConfirmModal, {
      data: name,
    });

    ref
      .afterClosed()
      .pipe(take(1))
      .subscribe((res) => {
        if (res) this.extStore.removeExtension(name);
      });
  }
}
