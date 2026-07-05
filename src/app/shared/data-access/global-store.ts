import { HttpClient } from '@angular/common/http';
import {
  computed,
  DOCUMENT,
  effect,
  inject,
  Injectable,
  signal,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Subject, switchMap, tap } from 'rxjs';
import { Extension, Filter } from '../models/extension.model';

@Injectable({
  providedIn: 'root',
})
export class GlobalStore {
  #route = inject(ActivatedRoute);
  #http = inject(HttpClient);
  #document = inject(DOCUMENT);

  #state = signal<GlobalState>({
    ...initialState,
    theme: window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light',
  });

  theme = computed(() => this.#state().theme);
  loading = computed(() => this.#state().loading);
  extensions = computed(() => this.#state().extensions);
  filter = computed(() => this.#state().filter);

  isDarkTheme = computed(() => this.#state().theme === 'dark');
  filteredExtensions = computed(() =>
    this.extensions().filter(
      (e) => !this.filter() || e.isActive === this.filter()!.isActive,
    ),
  );

  #loadExtensions = new Subject<void>();

  constructor() {
    effect(() =>
      this.#document.body.classList.toggle('dark', this.isDarkTheme()),
    );

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

    this.#route.queryParams
      .pipe(
        map(({ isActive }) => {
          if (!isActive) return null;
          return { isActive: isActive === 'true' };
        }),
        tap((isActive) => this.setFilter(isActive)),
      )
      .subscribe();
  }

  toggleTheme() {
    this.#state.update((s) => ({
      ...s,
      theme: s.theme === 'light' ? 'dark' : 'light',
    }));
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

  private setFilter(filter: Filter) {
    this.#state.update((s) => ({ ...s, filter }));
  }
}

interface GlobalState {
  theme: 'light' | 'dark';
  loading: boolean;
  extensions: Extension[];
  filter: Filter;
}

const initialState: GlobalState = {
  theme: 'light',
  loading: false,
  extensions: [],
  filter: null,
};
