import { computed, inject, Service, signal } from '@angular/core';
import { Extension, Filter } from '../../shared/models/extension.model';
import { HttpClient } from '@angular/common/http';
import { Subject, switchMap, tap } from 'rxjs';

@Service()
export class ExtensionsStore {
  #http = inject(HttpClient);

  #state = signal<ExtensionsState>(initialState);

  loading = computed(() => this.#state().loading);
  extensions = computed(() => this.#state().extensions);
  filter = computed(() => this.#state().filter);

  filteredExtensions = computed(() =>
    this.extensions().filter(
      (e) => !this.filter() || e.isActive === this.filter()?.isActive,
    ),
  );

  #loadExtensions = new Subject<void>();

  constructor() {
    this.#loadExtensions
      .pipe(
        tap(() => this.#state.update((s) => ({ ...s, loading: true }))),
        switchMap(() =>
          this.#http.get<Extension[]>('data/data.json').pipe(
            tap((extensions) =>
              this.#state.update((s) => ({
                ...s,
                loading: false,
                extensions,
              })),
            ),
          ),
        ),
      )
      .subscribe();

    this.#loadExtensions.next();
  }

  removeExtension(name: Extension['name']) {
    this.#state.update((s) => ({
      ...s,
      extensions: s.extensions.filter((e) => e.name !== name),
    }));
  }

  toggleExtension(name: Extension['name']) {
    this.#state.update((s) => ({
      ...s,
      extensions: s.extensions.map((e) =>
        e.name === name ? { ...e, isActive: !e.isActive } : e,
      ),
    }));
  }

  setFilter(filter: Filter) {
    this.#state.update((s) => ({ ...s, filter }));
  }
}

interface ExtensionsState {
  loading: boolean;
  extensions: Extension[];
  filter: Filter;
}

const initialState: ExtensionsState = {
  loading: false,
  extensions: [],
  filter: null,
};
