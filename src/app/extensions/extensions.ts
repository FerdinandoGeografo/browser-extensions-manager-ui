import { Component, inject } from '@angular/core';
import { GlobalStore } from '../shared/data-access/global-store';
import { ExtensionsToolbar } from './ui/extensions-toolbar/extensions-toolbar';
import { ExtensionsList } from './ui/extensions-list/extensions-list';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmModal } from './ui/confirm-modal/confirm-modal';
import { Extension } from '../shared/models/extension.model';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-extensions',
  imports: [ExtensionsToolbar, ExtensionsList],
  templateUrl: './extensions.html',
  styleUrl: './extensions.scss',
})
export class Extensions {
  #dialog = inject(MatDialog);
  protected gs = inject(GlobalStore);

  openConfirmModal(name: Extension['name']) {
    const ref = this.#dialog.open<ConfirmModal, string, boolean>(ConfirmModal, {
      data: name,
    });

    ref
      .afterClosed()
      .pipe(take(1))
      .subscribe((res) => {
        if (res) this.gs.removeExtension(name);
      });
  }
}
