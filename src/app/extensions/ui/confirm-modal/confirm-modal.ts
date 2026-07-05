import { Component, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-modal',
  imports: [
    MatDialogTitle,
    MatDialogClose,
    MatDialogContent,
    MatDialogActions,
    MatButton,
  ],
  templateUrl: './confirm-modal.html',
  styleUrl: './confirm-modal.scss',
})
export class ConfirmModal {
  extensionName = inject<string>(MAT_DIALOG_DATA);
}
