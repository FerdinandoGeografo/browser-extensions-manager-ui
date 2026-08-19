import {
  computed,
  DOCUMENT,
  effect,
  inject,
  Service,
  signal,
} from '@angular/core';

@Service()
export class GlobalStore {
  #document = inject(DOCUMENT);

  #state = signal<GlobalState>({
    ...initialState,
    theme: window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light',
  });

  theme = computed(() => this.#state().theme);
  isDarkTheme = computed(() => this.#state().theme === 'dark');

  constructor() {
    effect(() =>
      this.#document.body.classList.toggle('dark', this.isDarkTheme()),
    );
  }

  toggleTheme() {
    this.#state.update((s) => ({
      ...s,
      theme: s.theme === 'light' ? 'dark' : 'light',
    }));
  }
}

interface GlobalState {
  theme: 'light' | 'dark';
}

const initialState: GlobalState = {
  theme: 'light',
};
