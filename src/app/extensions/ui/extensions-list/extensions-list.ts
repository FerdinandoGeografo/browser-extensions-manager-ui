import { Component, input, output } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { MatCard, MatCardContent } from '@angular/material/card';
import { Extension } from '../../../shared/models/extension.model';

@Component({
  selector: 'app-extensions-list',
  imports: [
    NgOptimizedImage,
    MatButton,
    MatSlideToggle,
    MatCard,
    MatCardContent,
  ],
  templateUrl: './extensions-list.html',
  styleUrl: './extensions-list.scss',
})
export class ExtensionsList {
  extensions = input.required<Extension[]>();

  extensionRemoved = output<Extension['name']>();
  extensionToggled = output<Extension['name']>();
}
